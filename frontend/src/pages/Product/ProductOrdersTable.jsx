import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ProductOrdersTable = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const redirectToOrderDetails = (orderId) => {
    navigate(`order-details/${orderId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/productorders');
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (err) {
        console.error('There was an error!', err);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = () => {
    let filtered = orders.filter(order =>
      (!filterDate || new Date(order.OrderDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString()) &&
      (!filterStatus || order.status === filterStatus)
    );
    setFilteredOrders(filtered);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Centering the title on the page
    const title = 'Order Report';
    const pageWidth = doc.internal.pageSize.width;
    const txtWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const x = (pageWidth - txtWidth) / 2;
    doc.setFontSize(18); // Set title font size
    doc.text(title, x, 20); // Adjust y coordinate for spacing

    doc.autoTable({
      startY: 40, // Start Y coordinate for the table, adjust for title spacing
      theme: 'grid',
      headStyles: { fillColor: [76, 188, 210], textColor: 255, fontStyle: 'bold' }, // Header style
      bodyStyles: { textColor: 50 }, // Body text color
      alternateRowStyles: { fillColor: 245 }, // Alternate row color
      head: [['Order ID', 'Date', 'Ordered Products', 'Quantity', 'Total', 'Status']], // Added 'Quantity' header
      body: filteredOrders.map(order => [
        order.ProductOrder_ID,
        { content: new Date(order.OrderDate).toLocaleDateString(), fontStyle: 'italic' }, // Date in italic
        { content: order.ProductArray.map(product => product.productName).join(', '), fontStyle: 'bold' }, // Products in bold
        { content: order.ProductArray.map(product => product.productQuantity || 1).join(', ') }, // Displaying quantities
        { content: `$${order.Total_price}`, fontStyle: 'bold' }, // Total in bold
        order.status
      ]),
      styles: { fontSize: 10, cellPadding: 4, overflow: 'linebreak' }, // Common cell styles
      columnStyles: { text: { cellWidth: 'auto' } } // Auto adjust column width
    });

    doc.save('Orders_report.pdf');
  };

  const getStatusStyle = (status) => {
    return statusStyles[status] || 'bg-cyan-500';
  };

  const statusStyles = {
    'Pending': 'bg-yellow-300',
    'Processing': 'bg-blue-800',
    'Shipped': 'bg-purple-500',
    'Delivered': 'bg-green-500',
    'Canceled': 'bg-red-500',
  };

  return (
    <div className='h-[80vh] w-full overflow-auto scrollbar-thin -mr-20 rounded-md'>
      <div className="p-4">
        <h2 className="text-4xl m-4 text-center">ALL Orders</h2>
        <div className="flex justify-between items-center px-4 mb-4">
          <div className="flex items-center">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => { setFilterDate(e.target.value); handleFilterChange(); }}
              className="border rounded py-1 px-2 mr-4"
            />
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); handleFilterChange(); }}
              className="border rounded py-1 px-2"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
            onClick={generatePDF}
          >
            Generate Report
          </button>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full bg-white pr-2 border border-cyan-300">
            <thead className="bg-cyan-500 text-white">
              <tr>
                <th className="text-left py-3 px-4 border border-cyan-300 uppercase font-semibold text-sm">Order ID</th>
                <th className="text-left py-3 px-4 border border-cyan-300 uppercase font-semibold text-sm">Date</th>
                <th className="text-left py-3 px-4 border border-cyan-300 uppercase font-semibold text-sm">Ordered Products</th>
                <th className="text-left py-3 px-4 border border-cyan-300 uppercase font-semibold text-sm">Quantity</th> {/* New column for Quantity */}
                <th className="text-left py-3 px-4 border border-cyan-300 uppercase font-semibold text-sm">Total</th>
                <th className="text-left py-3 px-4 border border-cyan-300 uppercase font-semibold text-sm">Status</th>
                <th className="text-left py-3 px-4 border border-cyan-300 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="text-cyan-700">
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="text-left py-3 px-4 border border-cyan-300">{order.ProductOrder_ID}</td>
                  <td className="text-left py-3 px-4 border border-cyan-300">{new Date(order.OrderDate).toLocaleDateString()}</td>
                  <td className="text-left py-3 px-4 border border-cyan-300">
                    {order.ProductArray.map(product => product.productName).join(', ')}
                  </td>
                  <td className="text-left py-3 px-4 border border-cyan-300">
                    {order.ProductArray.map(product => `${product.productName} (${product.productQuantity || 1})`).join(', ')}
                  </td>
                  <td className="text-left py-3 px-4 border border-cyan-300">${order.Total_price}</td>
                  <td className="text-left py-3 px-4 border border-cyan-300">
                    <span className={`badge ${getStatusStyle(order.status)} text-white px-2 py-1 rounded`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="text-left py-3 px-4 border border-cyan-300">
                    <button
                      className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => redirectToOrderDetails(order._id)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductOrdersTable;
