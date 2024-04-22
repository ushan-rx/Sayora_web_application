import React, { useState } from 'react';
import { z } from 'zod';
import axios from 'axios';
import { FaUserTie } from "react-icons/fa"; // Icon for the form

// Form validation schema using zod, now including phone number
const schema = z.object({
  name: z.string().min(1, 'Please enter a name'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be no more than 15 digits'), // Validating length for simplicity
});

function AddPatient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // Adding phone state
    userType: 'patient', // Static, as all users added here are patients
    userRole: 'patient', // Static, as all users added here are patients
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      setMessage({ text: 'Patient added successfully!', type: 'success' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage({ text: error.errors.map(e => e.message).join("\n"), type: 'error' });
      } else {
        setMessage({ text: 'Failed to add patient. Please try again.', type: 'error' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#eff7f8] flex items-center justify-center">
      <form className="bg-white border-[#089BAB] shadow-lg p-8 rounded w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-xl text-cyan-500 font-bold mb-4">Add Patient</h1>
        <div className="flex justify-center mb-4">
            <FaUserTie style={{ color: 'cyan-500', fontSize: '100px' }}/>
        </div>
        
        
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

        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={handleInputChange}
            value={formData.phone}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter phone number"
          />
        </div>

       
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
        
      
        <div className="flex items-center justify-start">
          <button
            className="bg-teal-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Patient
          </button>
        </div>
        
       
        {message.text && (
          <div className={`text-sm ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}

export default AddPatient;
