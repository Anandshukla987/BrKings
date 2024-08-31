import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  closeLog,
  signupBox,
  selectAuthUser,
} from "../../Redux/Slices/authSlice";
import Logo from "../../Images/BrownieKing.png";
import Cookie from "../../Images/brauni-ai (1) 1.png";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../common/Loader/Loading";

import CancelIcon from "@mui/icons-material/Cancel";
import "./Login.css";
import TextInput from "../../common/TextInput";

const Login = () => {
  const auth = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const loginInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const logined = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };

  return (
    <>
      <div className="flex justify-center main">
        {auth.isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col justify-center  flex-wrap bgimage">
            <button onClick={() => dispatch(closeLog())}>
              <CancelIcon className="closeBtn" />
            </button>
            <div className="logo">
              <img
                className="mx-auto h-25 w-auto"
                src={Logo}
                alt="Brownie King"
              />
              <h2 className="brownie text-center text-rose-550 ">
                Brownie King
              </h2>
            </div>
            <h2 className="text-center text-2xl font-bold leading-10  text-grey-950">
              Sign in to your account
            </h2>
            <div className="card mt-2 flex-row">
              <div className="mt-3 sm:mx-auto  sm:max-w-sm  cred">
                <form className="loginForm">

                  <TextInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={values.email}
                    onChange={loginInputs}
                  />
                  <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={values.password}
                    onChange={loginInputs}
                  />

                  <button
                    type="submit"
                    id="submit"
                    onClick={logined}
                    class=" mt-4 rounded-md bg-rose-950 max-w-xl w-24 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </button>
                  
                  <a
                    className="mt-4 text-center text-sm cursor-pointer text-gray-900"
                    onClick={() => {
                      navigate("/forgotPass");
                      dispatch(closeLog());
                    }}
                  >
                    Forgot Password?
                  </a>
                </form>
                <p className="mt-8 text-center text-sm text-gray-900">
                  Not a member?{" "}
                  <Link
                    onClick={() => {
                      dispatch(signupBox());
                      dispatch(closeLog());
                    }}
                  >
                    {/* {console.log("signup")} */}
                    <a className="font-semibold leading-6 text-rose-950 hover:text-amber-500">
                      Signup
                    </a>
                  </Link>
                </p>
              </div>

              <div className="cookie hidden md:block">
                <img src={Cookie} alt="Cookie" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
