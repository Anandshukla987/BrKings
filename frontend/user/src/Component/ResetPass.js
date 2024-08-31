import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  const url = new URL(window.location.href);
  const token = Object.fromEntries(url.searchParams.entries()).token;
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const passHandler = (e) => {
    setPassword(e.target.value);
  };

  const updateHandler = async () => {
    const res = await fetch("/api/user/update-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        password,
      }),
    });
    const data = await res.json();

    if (res.status === 200) {
      window.alert(data.message);
      navigate("/");
    } else {
      window.alert(data.message);
      // console.log("Invalid Credentioals")
    }
  };

  return (
    <>
      <div className="forgotPass bgPage">
        <div className=" max-w-[520px] w-full flex justify-center m-4 bg-black rounded-lg ">
          <div className=" w-full h-auto mt-3 gap-4">
            <div className="flex justify-center">
              <h1 className=" font-extrabold text-4xl m-3 text-white font3">
                Reset Password
              </h1>
            </div>
            <div className=" m-4 px-4 flex flex-col items-center">
              <label
                for="email"
                className="loginInput flex items-center"
                style={{ color: "#fff" }}
              >
                New Password
                <input
                  type="password"
                  style={{ borderBottom: " 3px solid #fff" }}
                  placeholder="Enter Password"
                  value={password}
                  onChange={passHandler}
                  id="email"
                  name="email"
                />
              </label>
              <button
                type="submit"
                className="mt-4 rounded-md bg-orange-600 text-xl font-semibold leading-10 text-black shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800 w-[80%]
              transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                onClick={updateHandler}
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

export default ResetPass;
