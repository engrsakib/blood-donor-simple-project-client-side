import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Public = ({ children }) => {
  const { user, setLoadding, Loadding } = useContext(AuthContext);
  const location = useLocation();
  if (Loadding) {
    return;
  }
  if (!user && !user?.mail) {
    return children;
  }

  return <Navigate state={location.pathname} to={`/`}></Navigate>;
};

export default Public;