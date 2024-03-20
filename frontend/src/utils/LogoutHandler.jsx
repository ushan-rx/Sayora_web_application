import React, { useState } from 'react'
import axios from 'axios'
const LogOut = ()=>{
    axios.post('http://localhost:5000/api/v1/auth/logout',{ withCredentials: true })
          .then(()=>{window.localStorage.removeItem("isLogedIn")})
          .catch(err=>console.log(err))
}

export default LogOut;