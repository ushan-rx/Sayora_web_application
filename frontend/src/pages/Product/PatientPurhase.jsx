import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PatientPurchase = () => {
    const patientId = Cookies.get('roleId');
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://localhost:5000/getOrdersByPatient/${patientId}`);
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
    'Delivered': 'bg-green-500'
  };

  const getStatusStyle = (status) => {
    return statusStyles[status] || 'bg-gray-500';
  };
  return (
    <div className='h-[80vh] w-full overflow-auto scrollbar-thin -mr-20 rounded-md'>
    <div className="p-4">
      <h2 className="text-4xl  m-4 text-center">My orders</h2>
      <div className="overflow-auto">
        <table className="min-w-full bg-white pr-2">
          <thead className="bg-blue-500 text-white mr-4">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Order ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Ordered Products</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Total</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
             
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
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default PatientPurchase;

