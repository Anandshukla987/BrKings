import React from "react";
import { useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { loginBox} from "../Redux/Slices/authSlice"; // Replace with your user slice

const ProtectedRoute = () => {
  const token = window.localStorage.getItem("user");
  const dispatch = useDispatch();
  return token ? <Outlet /> : <Navigate to={dispatch(loginBox())} />;
};

export default ProtectedRoute;
