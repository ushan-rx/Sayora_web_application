import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
  const { tempId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: ''
    },
    gender: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, password, confirmPassword, phone, address, gender } = formData;
    let errors = {};

    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!gender.trim()) {
      errors.gender = 'Gender is required';
    }

    if (Object.keys(errors).length === 0) {
      axios.post(`http://localhost:5000/api/v1/auth/register/${tempId}`, { 
        tempId, firstName, lastName, password, phone, address, gender 
      })
      .then(response => {
        setMessage('Registration successful. Redirecting to login...');
        setTimeout(() => navigate('../login'), 2000); // Redirect after 2 seconds
      })
      .catch(error => {
        setMessage('Registration error: ' + error.response.data.message);
      });
    } else {
      setErrors(errors);
    }
  };

  return (
   
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg overflow-auto" style={{ height: '680px' }}>
      <img src="https://sayora.lk/wp-content/uploads/2023/04/SAYORA-LOGO-NEW.png" alt="Sayora Logo" className="mx-auto mb-4 w-32 h-32" />
      <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
        </div>
        <div>
          <label htmlFor="lastName" className="block">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
        </div>
        <div>
          <label htmlFor="password" className="block">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
        </div>
        <div>
          <label htmlFor="phone" className="block">Phone:</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          {errors.phone && <span className="text-red-500">{errors.phone}</span>}
        </div>
        {/* Address fields */}
        <div>
          <label htmlFor="street" className="block">Street:</label>
          <input type="text" id="street" name="street" value={formData.address.street} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="city" className="block">City:</label>
          <input type="text" id="city" name="city" value={formData.address.city} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="state" className="block">State:</label>
          <input type="text" id="state" name="state" value={formData.address.state} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        {/* Gender field */}
        <div>
          <label htmlFor="gender" className="block">Gender:</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <span className="text-red-500">{errors.gender}</span>}
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
          Register
        </button>
      </form>
      {message && <div className="text-center my-2">{message}</div>}
    </div>
  );
};

export default RegistrationForm;
