const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// const authMiddleware = asyncHandler(async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     token = req.headers.authorization.split(" ")[1];
//     try {
//       if (token) {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded?.id);
//         req.user = user;
//         next();
//       }
//     } catch (error) {
//       throw new Error("Not Authorized token expired, Please Login again");
//     }
//   } else {
//     throw new Error(" There is no token attached to header");
//   }
// });
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "fail",
      message: "There is no token attached to header",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract token from header

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded?.id);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }
};

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});
module.exports = { authMiddleware, isAdmin };
