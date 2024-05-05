import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
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
    
    axios.post('http://localhost:5000/api/v1/auth/login', { email, password })
    .then(res => {
      if (res.data.Status === "Success") {
        window.localStorage.setItem("isLogedIn", true);
        setMessage("Login successful!");
        setTimeout(() => {
          if (res.data.role === "patient") {
            navigate('/patient');
          } else if (res.data.role === "doctor") {
            navigate('/doctor');
          }
        }, 1000);
      } else {
        setMessage("The Password is incorrect");
      }
    }).catch(err => {
      console.log(err);
      setMessage("An error occurred. Please try again later.");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://img.freepik.com/free-vector/medical-healthcare-blue-color_1017-26807.jpg?w=1380&t=st=1713738413~exp=1713739013~hmac=d7a059810ed36f1f205c7cd0346bac400bea9fb5d8d8731b11a565bac594556c')] bg-cover py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
      <img src="https://sayora.lk/wp-content/uploads/2023/04/SAYORA-LOGO-NEW.png" alt="Sayora Logo" className="mx-auto mb-4 w-32 h-32" />
        <h2 className="text-center text-3xl font-extrabold text-cyan-800">Log in</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-cyan-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>


            
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-cyan-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          {message && (
            <div className="text-center py-2 text-sm text-red-600">
              {message}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
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
