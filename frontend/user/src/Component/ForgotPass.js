import React, { useState } from "react";
import { loginBox } from "../Redux/Slices/authSlice";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ForgotPass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const forgotPass = (e) => {
    setEmail(e.target.value);
  };

  const forgotSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/user/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await res.json();

    if (res.status === 200) {
      toast.success(data.message);

      navigate("/");
    } else {
      if (res.status === 404) {
        dispatch(loginBox);
      }
      toast.error(data.message);
      // console.log("Invalid Credentioals")
    }
  };

  return (
    <>
      <div className="forgotPass bgPage">
        <div className="max-w-[520px] w-full flex justify-center m-4 bg-black rounded-lg ">
          <div className=" w-full h-auto mt-3 gap-4">
            <div className="flex justify-center">
              <h1 className=" font-extrabold text-4xl m-3 text-white font3">
                Forgot Password
              </h1>
            </div>
            <div className=" m-4 px-4 flex flex-col items-center">
              <label
                for="email"
                className="loginInput flex items-center"
                style={{ color: "#fff" }}
              >
                Email
                <input
                  type="email"
                  style={{ borderBottom: " 3px solid #fff" }}
                  placeholder="Email"
                  value={email}
                  onChange={forgotPass}
                  id="email"
                  name="email"
                />
              </label>
              <button
                type="submit"
                className="mt-4 rounded-md bg-orange-600 text-xl font-semibold leading-10 text-black shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800 w-[370px]
              transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                onClick={forgotSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
