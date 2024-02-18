import React from 'react'
import { Navigate } from 'react-router-dom';

export default function AuthRoute({children}) {
 const token=localStorage.getItem("token_key");
 if(token){
  return <>{children}</>
 }
 else{return <Navigate to={'/login'} replace/>}
}
