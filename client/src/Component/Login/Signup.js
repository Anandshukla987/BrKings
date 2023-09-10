import React, { useState } from "react";
import Logo from "../../Images/BrownieKing.png";
import Cookie from "../../Images/brauni-ai (1) 1.png";
import { Link, useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Login.css";

const Signup = ({ setSign, setLogged }) => {
  const navigation =useNavigate();
  const [user, setuser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  let name, value;
  const loginInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    // console.log(name,"-",value);
    setuser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, address } = user;

    const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, email, phone, password, address
        })
    });
    const data = await res.json();

    if (res.status === 422 || !data || res.status === 500) {
      window.alert(data.message);
    } else {
      window.alert(data.message);
      setLogged(true);
      setSign(false);
    }
}


  return (
    <>
      <div className="flex min-h-full justify-center my-7 h-screen main">
        <div className="flex flex-col justify-center  bgimage">
          <button
            onClick={() => {
              setSign(false);
            }}
          >
            <CancelIcon className="closeBtn" />
          </button>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm logo">
            <img
              className="mx-auto h-25 w-auto"
              src={Logo}
              alt="Brownie King"
            />
            <h2 className="brownie text-center text-rose-550 ">Brownie King</h2>
          </div>
          <h2 className="mt-3 text-center text-2xl font-bold leading-9  text-gey-950">
            Create New account
          </h2>
          <div className="card flex-row">
            <div className=" sm:mx-auto  sm:max-w-sm cred">
              <form className="loginForm">
                <label for="name" className="loginInput">
                  Name
                  <input
                    placeholder="Name"
                    type="text"
                    value={user.name}
                    onChange={loginInputs}
                    id="name"
                    name="name"
                  />
                </label>
                <label for="email" className="loginInput">
                  Email
                  <input
                    placeholder="Email"
                    type="email"
                    value={user.email}
                    onChange={loginInputs}
                    id="email"
                    name="email"
                  />
                </label>
                <label for="phone" className="loginInput">
                  Phone
                  <input
                    placeholder="Phone No."
                    type="phone"
                    value={user.phone}
                    onChange={loginInputs}
                    id="phone"
                    name="phone"
                  />
                </label>
                <label for="password" className="loginInput">
                  Password
                  <input
                    placeholder="Password"
                    type="password"
                    value={user.password}
                    onChange={loginInputs}
                    id="password"
                    name="password"
                  />
                </label>
                <label for="address" className="loginInput">
                  Address
                  <input
                    placeholder="Address"
                    type="text"
                    value={user.address}
                    onChange={loginInputs}
                    id="address"
                    name="address"
                  />
                </label>
                <button
                  id="submit"
                  onClick={postData}
                  class=" mt-4 rounded-md bg-rose-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </form>

              <p className="mt-2 text-center text-sm text-gray-900">
                Already a member?{" "}
                <Link
                  onClick={() => {
                    setLogged(true);
                    setSign(false);
                  }}
                >
                  <a className="font-semibold leading-6 text-rose-950 hover:text-amber-500">
                    Signin
                  </a>
                </Link>
              </p>
            </div>
            <div className="cookie hidden md:block">
              <img src={Cookie} alt="Cookie" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
