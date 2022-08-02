import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.user);
  const location = useLocation();
  return userInfo.userLoggedIn === true ? (
    children
  ) : (
    <Navigate replace state={{ from: location }} to="/" />
  );
};

export default PrivateRoute;
