import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const token = window.localStorage.getItem("user");
  useEffect(() => {
    if (!token) {
      // Show a toast notification if token is not found
      toast.error("Unauthorized access! Please log in.");
    }
  }, [token]);
  return token ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/" />
    </>
  );
};

export default ProtectedRoute;
