import { Outlet, Navigate } from "react-router-dom";

import React from 'react'

const ProtectedRoutesUser = () => {
  const isLoggedIn = window.localStorage.getItem("isLogedIn");
  console.log(isLoggedIn)

  return (
    <div>
      {isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
    </div>
  )
}

export default ProtectedRoutesUser
