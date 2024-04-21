import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const ManageBookings = () => {
    const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const navigateToVerifyPage = (email) => {
    navigate('/staff/emailSendingView' , {state: {email} });
  };

  const fetchBookings = async () => {
    axios.get('http://localhost:5000/api/v1/Booking_data/')
      .then(response => {
        // Always treat the response data as an array
        const fetchedBookings = Array.isArray(response.data.booking_data) ? response.data.booking_data : [response.data.booking_data];
        setBookings(fetchedBookings);

        console.log('Fetched bookings:', fetchedBookings);
      })
      .catch(error => {
        console.error('Failed to fetch bookings:', error);
      });
  };


  
  return (
    <div className="container mx-auto px-4" >
       <h1 className="text-2xl font-bold text-center text-gray-700 my-4 mt-12">Bookings Data</h1>
       <div style={{ maxHeight: '750px', overflowY:'auto', overflowX: 'visible'}}>
      <table className="min-w-full bg-white text-sm border-collapse border border-gray-300 w-full font-sans mt-12 ">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">Booking ID</th>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">First Name</th>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">Last Name</th>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">NIC</th>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">Email</th>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">Phone Number 01</th>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">Phone Number 02</th>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">Booking Date</th>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">Time</th>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">Organization Name</th>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">Venue</th>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">Participant Count</th>
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
        {bookings.map((booking) => {
            const date = new Date(booking.bookingDate);
            const formattedDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

            return (
              <tr key={booking._id}>
                <td className="border border-gray-300 w-1/6">{booking.bookingId}</td>
                <td className="border border-gray-300 w-1/6">{booking.firstName}</td>
                <td className="border border-gray-300 w-1/6">{booking.lastName}</td>
                <td className="border border-gray-300 w-1/6">{booking.nic}</td>
                <td className="border border-gray-300 w-1/6">{booking.email}</td>
                <td className="border border-gray-300 w-1/6">{booking.phoneNumber01}</td>
                <td className="border border-gray-300 w-1/6">{booking.phoneNumber02}</td>
                <td className="border border-gray-300 w-1/6">{formattedDate}</td>
                <td className="border border-gray-300 w-1/6">{booking.time}</td>
                <td className="border border-gray-300 w-1/6">{booking.organizationName}</td>
                <td className="border border-gray-300 w-1/6">{booking.venue}</td>
                <td className="border border-gray-300 w-1/6">{booking.participantCount}</td>
                <td className="border border-gray-300 w-1/6">
            <div className="flex items-center justify-around h-12">
            <button onClick={() => navigateToVerifyPage(booking.email)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">Verify</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Update</button>
              <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">Confirm</button>
            </div>
          </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ManageBookings;