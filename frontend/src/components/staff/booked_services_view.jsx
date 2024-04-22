import { useState, useEffect } from 'react';
import axios from 'axios';


const UpdateForm = ({ booking, onUpdate }) => {
  const [updatedBooking, setUpdatedBooking] = useState(booking);

  const handleInputChange = (event) => {
    setUpdatedBooking({
      ...updatedBooking,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const response = await axios.put(`http://localhost:5000/api/v1/Booking_data/${booking._id}`, updatedBooking);
    onUpdate(response.data);
  };

  return (
    <div>
   {/* <input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3" name="bookingId" value={updatedBooking.bookingId} onChange={handleInputChange} placeholder="Booking ID" /> */}
<input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 text-sm" name="firstName" value={updatedBooking.firstName} onChange={handleInputChange} placeholder="First Name" />
<input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 text-sm" name="lastName" value={updatedBooking.lastName} onChange={handleInputChange} placeholder="Last Name" />
<input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 text-sm" name="nic" value={updatedBooking.nic} onChange={handleInputChange} placeholder="NIC" />
<input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 text-sm" name="email" value={updatedBooking.email} onChange={handleInputChange} placeholder="Email" />
<input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 text-sm" name="phoneNumber01" value={updatedBooking.phoneNumber01} onChange={handleInputChange} placeholder="Phone Number 01" />
<input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 text-sm" name="phoneNumber02" value={updatedBooking.phoneNumber02} onChange={handleInputChange} placeholder="Phone Number 02" />
<input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 text-sm" name="bookingDate" value={updatedBooking.bookingDate} onChange={handleInputChange} placeholder="Booking Date" />
<input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 text-sm" name="time" value={updatedBooking.time} onChange={handleInputChange} placeholder="Time" />
<input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 text-sm" name="organizationName" value={updatedBooking.organizationName} onChange={handleInputChange} placeholder="Organization Name" />
<input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 text-sm" name="venue" value={updatedBooking.venue} onChange={handleInputChange} placeholder="Venue" />
<input className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 text-sm" name="participantCount" value={updatedBooking.participantCount} onChange={handleInputChange} placeholder="Participant Count" />
 <button onClick={handleSubmit}className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">Confirm Update</button>
  </div>
  );
};



const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    axios.get('http://localhost:5000/api/v1/Booking_data/')
      .then(response => {
        const fetchedBookings = Array.isArray(response.data.booking_data) ? response.data.booking_data : [response.data.booking_data];
        setBookings(fetchedBookings);
      })
      .catch(error => {
        console.error('Failed to fetch bookings:', error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUpdate = (updatedBooking) => {
    setBookings(bookings.map(booking => booking._id === updatedBooking._id ? updatedBooking : booking));
    setIsUpdating(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/Booking_data/${id}`);
      // After deleting, fetch the updated list of bookings
      fetchBookings();
      alert('Booking deleted successfully!');
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const date = new Date(booking.bookingDate);
    const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
    return (
      formattedDate.includes(searchTerm) ||
      booking.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto px-4" >
      <h1 className="text-2xl font-bold text-center text-gray-700 my-4 mt-12">Bookings Data</h1>
      <label htmlFor="search" className="block text-sm font-medium text-gray-700">
  Search by,
</label>
      <input
      title='Search by date or first name'
        type="text"
        placeholder="Search by date or first name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border-2 border-gray-300 bg-white h-10  px-5 pr-16 rounded-lg text-sm focus:outline-none  w-full md:w-1/2"
      />
      <div style={{ maxHeight: '750px', maxWidth:'3000px', overflowY:'auto', overflowX: 'auto'}}>
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
            <th className="py-2 px-4 bg-cyan-500 text-white  border border-gray-300 w-1/2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredBookings.map((booking) => {
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
            <button onClick={() => { setIsUpdating(true); setCurrentBooking(booking); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Update</button>
            {/* <button onClick={() => navigateToVerifyPage(booking.email)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">Verify</button> */}
            <button onClick={() => handleDelete(booking._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">Delete</button>
              {/* <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2">Confirm</button> */}
            </div>
            {isUpdating && currentBooking._id === booking._id && <UpdateForm booking={booking} onUpdate={handleUpdate} />}
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