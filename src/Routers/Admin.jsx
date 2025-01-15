import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useGetAllUsers from "../components/Dashboard/user/AllUsers/useGetAllUsers";
import Loading from "../components/Loading";

const Admin = ({ children }) => {
  const { user, setLoadding, Loadding } = useContext(AuthContext);

  const { users, refetch, isPending } = useGetAllUsers(user);

  if (isPending) {
    return <Loading></Loading>;
  }
  refetch();


  const location = useLocation();
  if (Loadding) {
    return;
  }

  if (
    users &&
    users?.email &&
    (users?.role == "admin" || users?.role == "volunteer")
  ) {
    // console.log("privete")
    return children;
  }

  return <Navigate state={location.pathname} to={`/auth/login`}></Navigate>;
};

export default Admin;
