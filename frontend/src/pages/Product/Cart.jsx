import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems]  = useState(location.state.cartItems || { cartItems: [] });
  console.log(cartItems);
  const [quantity, setQuantity] = useState(1);
  const [customerDetails, setCustomerDetails] = useState({
    CustomerName: '',
    CustomerEmail: '',
    CustomerAddress: '',
  });

  const [customerName , setCustomerName] = useState('');
  const [customerEmail , setCustomerEmail] = useState('');
  const [customerAddress , setCustomerAddress] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.unitPrice * (item.quantity || 1), 0);
  };

  const getEachPrice = (item) => {
    return item.unitPrice * (item.quantity || 1);
  }

  const handleQuantityChange = (itemID, delta) => {
    setCartItems(currentItems =>
      currentItems.map(item => {
        if (item.Product_ID === itemID) {
          // Ensure quantity is a number and add delta. If quantity is undefined or null, default to 0 before adding.
          const updatedQuantity = (item.quantity ? parseInt(item.quantity, 10) : 0) + delta;
          return { ...item, quantity: Math.max(0, updatedQuantity) }; // Prevent negative quantities
        }
        return item;
      })
    );
};


  const handleSubmit = async (event) => {
    event.preventDefault();

    const productOrder = {
      Total_price: getTotalPrice(),
      CustomerName: customerName,
      CustomerEmail: customerEmail,
      CustomerAddress: customerAddress,
      ProductArray: cartItems.map(item => ({
        productId: item.Product_ID,
        productName: item.productName
      }))
    };

    console.log('Submitting Product Order:', productOrder);
    try{
      const response = await axios.post('http://localhost:5000/productorders', productOrder);
      console.log(response.data);
      toast.success("Order placed successfully")
      navigate('/patient/product');
    }catch(error){
      console.error('There was an error!', error);
      toast.error("Order failed")
    }
  };

  const handleCancel = () => {
    navigate('/patient/product'); 
  };

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <Toaster position="bottom-right"/>
      <form onSubmit={handleSubmit} className='flex flex-col p-12 border border-blue-500 rounded shadow-lg max-w-md mx-auto mt-20'>
      <h1 className='text-3xl text-center mb-10'>Reservation Form</h1>
        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={(e) =>  setCustomerName(e.target.value)}
          value={customerName}
          className='border mb-2 p-2 rounded'
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={(e) =>  setCustomerEmail(e.target.value)}
          value={customerEmail}
          className='border mb-2 p-2 rounded'
          required
        />
        <textarea
          name='address'
          placeholder='Address'
          onChange={(e) =>  setCustomerAddress(e.target.value)}
          value={customerAddress}
          className='border mb-2 p-2 rounded'
          required
        />
        
        <div className='mt-4'>
          { cartItems.map((item) => (
            <div key={item.Product_ID} className='flex items-center justify-between border-b p-2'>
              <span>{item.productName}</span>
              <div className='flex items-center'>
                <button type='button' onClick={() => handleQuantityChange(item.Product_ID, -1)}>-</button>
                <span className='mx-2'>{item.quantity || 1}</span>
                <button type='button' onClick={() => handleQuantityChange(item.Product_ID, 1)}>+</button>
                <span className='ml-4'>{item.Unit_Price}</span>
                <span className='ml-4'>Sub Total: {getEachPrice(item)}</span>
              </div>
            </div>
          ))}
          <div className='text-right mt-2'>
            <strong>Total: {getTotalPrice().toFixed(2)}</strong>
          </div>
        </div>

        <div className='flex justify-between mt-6'>
          <button type='button' onClick={handleCancel} className='bg-red-500 text-white px-6 py-2 rounded'>
            Cancel
          </button>
          <button type='submit' className='bg-blue-500 text-white px-6 py-2 rounded'>
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
};

export default Cart;