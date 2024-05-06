import React, { useState } from 'react';
import axios from 'axios';

const AddDoctorTime = () => {
  const [doctorID, setDoctorID] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/doctortime/add', {
        doctorID,
        date,
        time,
      });
      console.log(response.data);
      alert('Availability added successfully');
      // Clear the form or redirect as needed
    } catch (error) {
      console.error('Error adding availability:', error);
      alert('Error adding availability');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Handle cancel action here
    // For now, we can just clear the form
    setDoctorID('');
    setDate('');
    setTime('');
  };

  return (
    <div className="w-full max-w-lg m-auto mt-36">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 py-6 mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Manage Doctor Availability</h2>
        {/* Doctor ID */}
        <div className="mb-4">
          <label htmlFor="doctorID" className="block text-gray-700 text-sm font-bold mb-2">Doctor ID:</label>
          <input
            id="doctorID"
            type="text"
            name="doctorID"
            value={doctorID}
            onChange={(e) => setDoctorID(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Doctor ID"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
          <input
            id="date"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Select Date"
            required
          />
        </div>

        {/* Time */}
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
          <input
            id="time"
            type="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Select Time"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
          >
            Add Availability
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 ml-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorTime;