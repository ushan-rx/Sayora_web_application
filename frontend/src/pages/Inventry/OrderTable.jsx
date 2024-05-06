import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import InventrySideBar from './InventerySideBar';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Inventory/orders');
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/items');
        setInventoryItems(response.data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchOrders();
    fetchInventoryItems();
  }, []);

  const handleAddOrder = () => {
    navigate('/staff/inventory/addOrder');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:5000/Inventory/deleteorder/${id}`);
        setOrders(orders.filter(order => order.OrderID !== id));
        alert('Order deleted successfully');
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
      }
    }
  };

  const generateReport = async (order) => {
    try {
      const doc = new jsPDF();

      // Set document title and metadata
      doc.text('Invoice', 14, 16);
      doc.setFontSize(10);
      doc.text(`Order ID: ${order.OrderID}`, 14, 25);
      doc.text(`Order Date: ${new Date(order.OrderDate).toLocaleString()}`, 14, 30);
      doc.text(`Supplier ID: ${order.SupplierID}`, 14, 35);

      // Setting up the table for item details
      doc.autoTable({
        startY: 40,
        head: [['Item ID', 'Description', 'Quantity', 'Unit Price', 'Total']],
        body: order.ItemArray.map(item => [
          item.productId, // Assuming productId holds the Item ID
          inventoryItems.find(it => it.InventoryItemID === item.productId)?.name, // Get the name from inventoryItems based on productId
          item.quantity,
          item.unitPrice.toFixed(2),
          (item.quantity * item.unitPrice).toFixed(2)
        ]),
      });

      // Displaying the order total
      doc.text(`Order Total: ${order.OrderTotal.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
      
      // Saving the generated PDF
      doc.save(`Order_${order.OrderID}.pdf`);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report');
    }
  };


  return (
    <div className='flex flex-row m-4 h-[80vh]'>  
        {/* <InventrySideBar/> */}
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-10 w-full">
        <div className="flex justify-between items-center">
          <h1 className='text-3xl font-bold text-center m-8'>Order Details</h1>
          <button
            onClick={handleAddOrder}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mr-2 px-4 rounded"
          >
            Add Order
          </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" className="py-3 px-6">Order ID</th>
                <th scope="col" className="py-3 px-6">Order Date</th>
                <th scope="col" className="py-3 px-6">Supplier</th>
                <th scope="col" className="py-3 px-6">Order Total</th>
                <th scope="col" className="py-3 px-6">Actions</th>
                <th scope="col" className="py-3 px-6">Status</th>
            </tr>
            </thead>
            <tbody>
            {orders.map(order => (
                <tr className="bg-white border-b" key={order.OrderID}>
                <td className="py-4 px-6">{order.OrderID}</td>
                <td className="py-4 px-6">{new Date(order.OrderDate).toLocaleString()}</td>
                <td className="py-4 px-6">{order.SupplierID}</td>
                <td className="py-4 px-6">{order?.OrderTotal?.toLocaleString('en-IN', { style: 'currency', currency: 'LKR' })}</td>
                <td className="py-4 px-6">
                <button className='p-2 bg-red-600 text-white text-md font-semibold rounded-lg' onClick={()=> {handleDelete(order.OrderID)}}>
                        Delete Order
                   </button>
                <button className='p-2 bg-green-600 text-white text-md font-semibold rounded-lg ml-4' onClick={()=> {generateReport(order)}}>
                        Generate Invoice
                   </button>
                </td>
                <td className="py-4 px-6">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.OrderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {order.OrderStatus}
                    </span>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      {orders.length === 0 && <div className="text-center py-8">No orders to display</div>}
    </div>
    </div>
  );
};

export default OrdersTable;
