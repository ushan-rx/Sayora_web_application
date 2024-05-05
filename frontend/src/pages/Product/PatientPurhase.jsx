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
            try {
                const response = await axios.get(`http://localhost:5000/getOrdersByPatient/${patientId}`);
                console.log(response.data);
                let orderResponse = response.data;
                let orderReversed = orderResponse.reverse();
                setOrders(orderReversed);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };
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

    return (
        <div className='h-[80vh] w-full overflow-auto scrollbar-thin -mr-20 rounded-md'>
            <div className="p-4">
                <h2 className="text-4xl m-4 text-center">My Orders</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orders.map((order) => (
                        <div key={order._id} className="border border-black rounded-md shadow-md p-6">
                            <p className="text-lg font-semibold ">Order ID: {order.ProductOrder_ID}</p>
                            <p className="text-sm text-gray-500">Date: {new Date(order.OrderDate).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">Ordered Products: {order.ProductArray.map(product => product.productName).join(', ')}</p>
                            <p className="text-sm text-gray-500">Total: ${order.Total_price}</p>
                            <span className={`badge ${getStatusStyle(order.status)} text-white px-3 py-1 rounded`}>
                                {order.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PatientPurchase;
