import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductOrdersTable = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:5000/productorders');
                console.log(response.data);
                let orderResponse = response.data;
                let orderReversed = orderResponse.reverse();
                setOrders(orderReversed);
            }catch(errr){
                console.error('There was an error!', errr);

            }
        }
        fetchData();

    }, []);
  
  const statusStyles = {
    'Pending': 'bg-yellow-300',
    'Processing': 'bg-blue-800',
    'Shipped': 'bg-purple-500',
    'Delivered': 'bg-green-500',
    'Canceled': 'bg-red-500',
  };

  const getStatusStyle = (status) => {
    return statusStyles[status] || 'bg-gray-500';
  };

  const redirectToOrderDetails = (orderId) => {
    navigate(`order-details/${orderId}`);
  };

  return (
    <div className='h-[80vh] w-full overflow-auto scrollbar-thin -mr-20 rounded-md'>
    <div className="p-4">
      <h2 className="text-4xl  m-4 text-center">ALL Orders</h2>
      <div className="overflow-auto">
        <table className="min-w-full bg-white pr-2">
          <thead className="bg-blue-500 text-white mr-4">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Order ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Ordered Products</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Total</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="text-left py-3 px-4">{order.ProductOrder_ID}</td>
                <td className="text-left py-3 px-4">{new Date(order.OrderDate).toLocaleDateString()}</td>
                <td className="text-left py-3 px-4">
                  {order.ProductArray.map(product => product.productName).join(', ')}
                </td>
                <td className="text-left py-3 px-4">${order.Total_price}</td>
                <td className="text-left py-3 px-4">
                  <span className={`badge ${getStatusStyle(order.status)} text-white px-2 py-1 rounded`}>
                    {order.status}
                  </span>
                </td>
                <td className="text-left py-3 px-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
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
