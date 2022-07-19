import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';

import jwtDecode from "jwt-decode";

import Cookies from 'js-cookie';

const ProtectedRoute=( {
  redirectPath='/login',
  children,
  role
} ) => {

  // Check user token here
  const navigate=useNavigate();
  const jwt=Cookies.get( 'jwt' );






  if ( !jwt ) {
    return <Navigate to={redirectPath} replace />;
  }

  // if ( role&&!role.includes( jwtDecode( jwt ).role ) ) {
  //   return <Navigate to={'/login'} replace />;
  // }

  return children;
};


export default ProtectedRoute;