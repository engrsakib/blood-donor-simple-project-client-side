import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const Admin = ({ children }) => {
  const { user, setLoadding, Loadding } = useContext(AuthContext);
  const location = useLocation();
  if (Loadding) {
    return;
  }

  if (user && user?.email && user?.role == 'admin') {
    // console.log("privete")
    return children;
  }

  return <Navigate state={location.pathname} to={`/auth/login`}></Navigate>;
};

export default Admin;
