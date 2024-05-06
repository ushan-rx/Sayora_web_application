import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AddAppointment = () => {
  const location = useLocation();
  const { App_date, App_time, doctorID } = location.state || {} ;

  const formik = useFormik({
    initialValues: {
      App_date: App_date,
      App_time: App_time,
      doctorID: doctorID,
      App_reason: '',
      patientName: '',
      patientAddress: '',
      patientContact: '',
      patientGender: '',
      patientemail: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/addappointments', values);
        alert('Appointment created successfully!');
        console.log('Appointment created:', response.data);
      } catch (error) {
        alert('Error creating appointment.');
        console.error('Error creating appointment:', error);
      }
    },
  });

  return (
    <div className='w-full max-w-md mx-auto mt-28 mb-8'>
      <form onSubmit={formik.handleSubmit} className='bg-white shadow-md rounded-lg p-8'>
        <h2 className='text-2xl font-semibold mb-6 text-center text-blue-600'>We care Your health!</h2>
        {/* App_reason */}
        <div className='mb-4'>
          <label htmlFor='App_reason' className='block text-gray-700 text-sm font-bold mb-2'>Reason for Appointment:</label>
          <input
            id='App_reason'
            type='text'
            name='App_reason'
            onChange={formik.handleChange}
            value={formik.values.App_reason}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>

        {/* patientName */}
        <div className='mb-4'>
          <label htmlFor='patientName' className='block text-gray-700 text-sm font-bold mb-2'>Patient Name:</label>
          <input
            id='patientName'
            type='text'
            name='patientName'
            onChange={formik.handleChange}
            value={formik.values.patientName}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>

        {/* patientAddress */}
        <div className='mb-4'>
          <label htmlFor='patientAddress' className='block text-gray-700 text-sm font-bold mb-2'>Patient Address:</label>
          <input
            id='patientAddress'
            type='text'
            name='patientAddress'
            onChange={formik.handleChange}
            value={formik.values.patientAddress}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>

        {/* patientContact */}
        <div className='mb-4'>
          <label htmlFor='patientContact' className='block text-gray-700 text-sm font-bold mb-2'>Patient Contact:</label>
          <input
            id='patientContact'
            type='text'
            name='patientContact'
            onChange={formik.handleChange}
            value={formik.values.patientContact}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.errors.patientContact ? 'border-red-500' : ''}`}
            required
            pattern="[0-9]{10}" 
            title="Please enter a valid 10-digit phone number"
          />
          {formik.errors.patientContact && <p className="text-red-500 text-xs italic">{formik.errors.patientContact}</p>}
        </div>

        {/* patientGender */}
        <div className='mb-4'>
          <label htmlFor='patientGender' className='block text-gray-700 text-sm font-bold mb-2'>Patient Gender:</label>
          <select
            id='patientGender'
            name='patientGender'
            onChange={formik.handleChange}
            value={formik.values.patientGender}
            className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          >
            <option value='' disabled>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>

        {/* patientemail */}
        <div className='mb-4'>
          <label htmlFor='patientemail' className='block text-gray-700 text-sm font-bold mb-2'>Patient Email:</label>
          <input
            id='patientemail'
            type='email'
            name='patientemail'
            onChange={formik.handleChange}
            value={formik.values.patientemail}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>

        {/* Submit button */}
        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none flex-grow focus:shadow-outline'
          >
            Submit
          </button>
          <button
            type='button'
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-grow focus:outline-none focus:shadow-outline'
            onClick={() => formik.resetForm()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAppointment;
