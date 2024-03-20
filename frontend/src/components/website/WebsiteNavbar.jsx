import React from 'react'
import { NavLink } from 'react-router-dom'

function websiteNavbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <div className="flex items-center">
        <a href=""><img src="https://sayora.lk/wp-content/uploads/2023/04/SAYORA-LOGO-NEW.png" alt="Logo" className="h-8 w-8 mr-2" /></a>
        <div className="text-white font-bold">Sayora Wellness Center</div>
      </div>
      <div className="flex items-center">
        <a href="home" className="text-white mr-10 hover:text-blue-400">Home</a>
        <a href="/appointment" className="text-white mr-10 hover:text-blue-400">Appointments</a>
        <a href="#" className="text-white mr-10 hover:text-blue-400">other</a>
        <a href="/service" className="text-white mr-10 hover:text-blue-400">Services</a>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <NavLink to="/login">Login</NavLink>
      </button>
    </nav>
  )
}

export default websiteNavbar
