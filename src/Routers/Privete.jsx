import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useGetAllUsers from '../components/Dashboard/user/AllUsers/useGetAllUsers';

const Privete = ({ children }) => {
  const { user, setLoadding, Loadding } = useContext(AuthContext);
  const location = useLocation();
   const { users, refetch, isPending } = useGetAllUsers(user);
    if(isPending){
      return ;
    }
    refetch();


  
  if (Loadding) {
    return;
  }
  // console.log(user)
  if (users && users?.email) {
    // console.log("privete")
    return children;
  }

  return <Navigate state={location.pathname} to={`/auth/login`}></Navigate>;
};

export default Privete;