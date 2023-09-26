import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import randomstring from "randomstring";

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.email_User,
        pass: process.env.email_Password,
      },
    });

    const mailOptions = {
      from: process.env.email_User,
      to: email,
      subject: "Password Reset.",
      html: `<div> Hi <b>${name}</b>. Please click on the below button to reset your password. </div>
      <a style="text-decoration:none; display:inline-block; text-align:center; padding:5px 10px; height:auto; width:auto; background-color:green; color:white; font-weight:700; margin-top:5px; margin-left:4px; border-radius:3px;" href="http://localhost:8000/api/v1/auth/reset-password?token=${token}"> RESET </a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent successfully.", info.response);
      }
    });
  } catch (error) {
    res.status(400).send({ success: true, message: error.message });
  }
};

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone No. is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(422).send({
        success: false,
        message: "Already Registered! Please Login.",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role,
    }).save();
    res.status(200).send({
      sucess: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(406).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.status(404).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.jwt_secret, {
      expiresIn: "7d",
    });
    user.token = token;
    await user.save();
    res
      .cookie("jwtoken", token, {
        expires: new Date(Date.now() + 86000),
        httpOnly: true,
      })
      .status(200)
      .send({
        success: true,
        message: "Login Successfully",
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const fpController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    console.log(req.body);
    if (user) {
      const randomString = randomstring.generate();
      const updatedData = await userModel.updateOne(
        { email },
        { $set: { token: randomString } }
      );
      sendResetPasswordMail(user.name, user.email, randomString);
      res.status(200).send({
        success: true,
        message:
          "Mail for password reset has been sent to your entered email address!",
      });
    } else {
      res
        .status(404)
        .send({ success: true, message: "This email doesnt't exist" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export const rpController = async (req, res) => {
  try {
    const token = req.query.token;
    const tokenData = await userModel.findOne({ token });
    if (tokenData) {
      res.redirect(`http://localhost:3000/reset-password?token=${token}`);
    } else {
      res
        .status(200)
        .send({ success: true, message: "This link has been expired." });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export const upController = async (req, res) => {
  try {
    const token = req.body.token;
    const tokenData = await userModel.findOne({ token });
    if (tokenData) {
      const password = req.body.password;
      const newPassword = await hashPassword(password);
      const userData = await userModel.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newPassword, token: "" } },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Password has been reset successfully.",
        data: userData,
      });
    } else {
      res
        .status(401)
        .send({ success: true, message: "This token has been expired." });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export const testController = (req, res) => {
  try {
    res.send("Protected routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

export const logoutController = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    user.token = "";
    await user.save();
    res
      .clearCookie("jwtoken", { httpOnly: true })
      .status(200)
      .send({ success: true, message: "Logout successfull" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error during logout",
      error,
    });
  }
};
