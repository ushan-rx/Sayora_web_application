import React, { useState } from 'react';
import { z } from 'zod';
import axios from 'axios';
import { FaAddressCard } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";

//  form validation using zod
const schema = z.object({
  name: z.string().min(1, 'Please enter a name'),
  email: z.string().email('Invalid email address'),
  userRole: z.enum(['doctor','systemadmin','medicalsecretary','staffmanager','appointmentmanager','servicehandler','productmanager','inventorymanager']),
  userType: z.enum(['doctor', 'staff']),
});

function AddStaff() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userRole: 'doctor',
    userType: 'doctor', // set initial state
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Adjust formData based on input changes
    setFormData(prev => ({
      ...prev,
      [name]: value,
      userType: name === 'userRole' ? (value === 'doctor' ? 'doctor' : 'staff') : prev.userType
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsConfirmed(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfirmed) {
      setMessage({ text: 'Please confirm the details are correct before submitting.', type: 'error' });
      return;
    }
    setMessage({ text: '', type: '' });

    try {
      const parsedData = schema.parse(formData);
      await axios.post('http://localhost:5000/api/v1/add-user/add', parsedData);
      setMessage({ text: 'User added successfully!', type: 'success' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage({ text: error.errors.map(e => e.message).join("\n"), type: 'error' });
      } else {
        setMessage({ text: 'Failed to add user. Please try again.', type: 'error' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#eff7f8] flex items-center justify-center">

      <form className="bg-white border-[#089BAB] shadow-lg p-8 rounded w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-xl text-cyan-500 font-bold mb-4">Add Staff</h1>
        <div className="flex justify-center mb-4">
            <FaUserTie style={{ color: 'cyan-500', fontSize: '100px' }}/>
        </div>
        
        {/* User Role Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userRole">
            Staff Role
          </label>
          <select id="userRole" name="userRole" onChange={handleInputChange} value={formData.userRole} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option value="doctor">Doctor</option>
            <option value="systemadmin">System Admin</option>
            <option value="medicalsecretary">Medical Secretary</option>
            <option value="staffmanager">Staff Manager</option>
            <option value="appointmentmanager">Appointment Manager</option>
            <option value="inventorymanager">Inventory Manager</option>
            <option value="productmanager">Product Manager</option> 
            <option value="servicehandler">Service Handler</option>  
          </select>
        </div>
        
        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter name"
          />
        </div>
        
        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter email"
          />
        </div>

        {/* Confirmation Checkbox */}
        <div className="mb-4">
          <label htmlFor="confirmCheck" className="flex items-center">
            <input
              type="checkbox"
              id="confirmCheck"
              checked={isConfirmed}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            I confirm that the details are correct
          </label>
        </div>
        
        {/* Form Submission Button */}
        <div className="flex items-center justify-start">
          <button
            className="bg-teal-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add User
          </button>
        </div>
        
        {/* Display Success or Error Messages */}
        {message.text && (
          <div className={`text-sm ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}

export default AddStaff;
