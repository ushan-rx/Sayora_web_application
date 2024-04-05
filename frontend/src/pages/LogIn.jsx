import React, { useState } from 'react'
import axios from 'axios'
import {Link,useNavigate} from "react-router-dom";

import { useUserStore } from "../store/user.store";


function LogIn(){
        const [email, setEmail] = useState();
        const [password, setPassword] = useState();
        const navigate = useNavigate();

       const handleEmailChange = (e) => {
          setEmail(e.target.value);
        };
      
        const handlePasswordChange = (e) => {
          setPassword(e.target.value);
        };
      
        axios.defaults.withCredentials = true;
        const handleSubmit = (e) => {
          e.preventDefault();
          
          axios.post('http://localhost:5000/api/v1/auth/login',{email,password})
          .then(res=>{
            if(res.data.Status === "Success"){
              // set user login status to local storage
              window.localStorage.setItem("isLogedIn", true);
              // redirect to user dashboard
            if (res.data.role === "patient") {
              navigate('/patient');
            } else if (res.data.role === "doctor") {
              navigate('/doctor');
            } else {
              console.error("Unknown role:", res.data.role);
            }
          } else{
            alert("The Password is incorrect")  /// incorrect login handle
          }
          }).catch(err=>console.log(err))
      
        };
      
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in</h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
      
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      };
export default LogIn;