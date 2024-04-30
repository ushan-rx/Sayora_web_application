import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const POrderDetails = () => {
  // Get the order ID from the URL parameters
  const { id } = useParams();
  // Access the navigation function from react-router-dom
  const navigate = useNavigate();
  // State variables to store order details, approval status, updating status, and new status
  const [order, setOrder] = useState(null);
  const [isApproving, setIsApproving] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // Fetch order details from the server when the component mounts
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/productorders/${id}`);
        setOrder(response.data);
        setNewStatus(response.data.status);
        setIsApproving(response.data.Approve);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Function to handle toggling the approval status of the order
  const handleApproveToggle = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/productorders/approve/${id}`, { Approve: !isApproving });
      setIsApproving(response.data.Approve);
      alert('Approval status updated successfully');
    } catch (error) {
      console.error('Error updating approval:', error);
      alert('Failed to update approval status');
    }
  };

  // Function to handle changing the status of the order
  const handleStatusChange = async (event) => {
    const updatedStatus = event.target.value;
    try {
      const response = await axios.put(`http://localhost:5000/productorders/status/${id}`, { status: updatedStatus });
      setNewStatus(response.data.status);
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  // Function to navigate back to the orders page
  const handleBack = () => {
    navigate('/staff/product/adminOrder');
  };

  // Render the component
  return (
    <div className='h-[80vh] overflow-auto scrollbar-thin -mr-20 rounded-md'>
    <div className='max-w-2xl mx-auto p-10'>
      <h1 className='text-4xl text-center mb-10'>Order Details</h1>
      {order && (
        <table className='table-auto w-full '>
          <tbody>
            {/* Render each order detail in a table row */}
            <tr>
              <th className='border px-4 py-10'>Order ID</th>
              <td className='border px-4 py-2'>{order.ProductOrder_ID}</td>
            </tr>
            <tr>
              <th className='border px-4 py-10'>Customer Name</th>
              <td className='border px-4 py-2'>{order.CustomerName}</td>
            </tr>
            <tr>
              <th className='border px-4 py-10'>Email</th>
              <td className='border px-4 py-2'>{order.CustomerEmail}</td>
            </tr>
            <tr>
              <th className='border px-4 py-10'>Address</th>
              <td className='border px-4 py-2'>{order.CustomerAddress}</td>
            </tr>
            <tr>
              <th className='border px-4 py-10'>Order Status</th>
              <td className='border px-4 py-2'>
                {/* Dropdown to select order status */}
                <select value={newStatus} onChange={handleStatusChange} disabled={updatingStatus}>
                  <option value='Pending'>Pending</option>
                  <option value='Processing'>Processing</option>
                  <option value='Shipped'>Shipped</option>
                  <option value='Delivered'>Delivered</option>
                </select>
              </td>
            </tr>
            <tr>
              <th className='border px-4 py-10'>Approve Order</th>
              <td className='border px-4 py-10'>
                {/* Button to toggle approval status */}
                <button onClick={handleApproveToggle} className={`${isApproving ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded`}>
                  {isApproving ? 'Approved' : 'Not Approved'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <div className='mt-4'>
        {/* Button to navigate back to the orders page */}
        <button onClick={handleBack} className='bg-gray-500 text-white px-4 py-2 rounded'>
          Back to Orders
        </button>
      </div>
    </div>
    </div>
  );
};

export default POrderDetails;
