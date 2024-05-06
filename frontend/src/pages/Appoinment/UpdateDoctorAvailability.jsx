import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateDoctorAvailability = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state;
    const [originalData, setOriginalData] = useState(null); // Store original data
    const [doctorID, setDoctorID] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const fetchAvailabilityDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/doctortime/get/${id}`);
                const { doctorID, date, time } = response.data;
                setDoctorID(doctorID);
                setDate(new Date(date).toISOString().slice(0, 10)); // Format date for input[type="date"]
                setTime(time);
                setOriginalData(response.data); // Save original data
            } catch (error) {
                console.error('Error fetching availability details:', error);
            }
        };

        fetchAvailabilityDetails();
    }, [id]);

    const resetForm = () => {
        if (originalData) {
            const { doctorID, date, time } = originalData;
            setDoctorID(doctorID);
            setDate(new Date(date).toISOString().slice(0, 10));
            setTime(time);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedDetails = { doctorID, date, time };
        try {
            await axios.put(`http://localhost:5000/doctortime/update/${id}`, updatedDetails);
            alert('Availability updated successfully!');
            navigate('/staff/appointment/time');
        } catch (error) {
            console.error('Error updating availability:', error);
            alert('Failed to update availability.');
        }
    };

    return (
        <div className='flex justify-center items-center mt-16 bg-gray-00'>
            <div className='max-w-xl w-full p-6 bg-white rounded-lg shadow-xl'>
                <h1 className='text-2xl font-bold text-blue-600 mb-6'>Update Doctor Availability</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="doctorID" className="block mb-2 text-sm font-medium text-gray-900">
                        Doctor ID
                    </label>
                    <input
                        id="doctorID"
                        type="text"
                        name="doctorID"
                        value={doctorID}
                        onChange={(e) => setDoctorID(e.target.value)}
                        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 mb-4"
                        required
                    />

                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">
                        Date
                    </label>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 mb-4"
                        required
                    />

                    <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900">
                        Time
                    </label>
                    <input
                        id="time"
                        type="time"
                        name="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 mb-4"
                        required
                    />

                    <div className="flex justify-between">
                        <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-3 w-1/2 mr-2">
                            Update Availability
                        </button>
                        <button type="button" onClick={resetForm} className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-3 w-1/2 ml-2">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateDoctorAvailability;