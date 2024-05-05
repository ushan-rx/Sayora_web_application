import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdate = (productId) => {
    navigate(`/staff/product/update-product`, { state: { productId } });
  };

  const handleAdd = () => {
    navigate('/staff/product/add');
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        console.log(productId)
        let response = await axios.delete(`http://localhost:5000/deleteProduct/${productId}`);
        if(response){
          setProducts(products.filter((product) => product._id !== productId));
          toast.success("product deleted succesfully")
        }else{
          //
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };
  
  const filteredProducts = search.length > 0
  ? products.filter((val) =>
    val.productName.toLowerCase().includes(search.toLowerCase())
  )
  : products;

  return (
    <div className='h-[90vh] overflow-auto scrollbar-thin -mr-20 rounded-md'>
    <Toaster position="bottom-right"/>
    <div className='max-w-4xl mx-auto p-8'>
      <h1 className='text-3xl  text-center mb-10'>Product List</h1>
      <div className="flex justify-center mt-5">
        <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full"
            onChange={(event) => setSearch(event.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 16a7 7 0 100-14A7 7 0 009 16zm1.5-7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <button
        onClick={handleAdd}
        className='bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mb-4'>
        Add Product
      </button>
      <table className='min-w-full table-auto'>
        <thead className='bg-blue-500 text-white'>
          <tr>
            <th className='px-4 py-2'>Product</th>
            <th className='px-4 py-2'>Price</th>
            <th className='px-4 py-2'>Stock</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id} className='text-center'>
              <td className='px-4 py-2 flex flex-col items-center'>
                <img
                  src={`http://localhost:5000/${product.url.slice(7)}`}
                  alt="Product"
                  className="w-300 h-20 object-cover mb-2 rounded"
                />
                {product.productName}
              </td>
              <td className='px-4 py-2'>${product.unitPrice}</td>
              <td className='px-4 py-2'>{product.stock}</td>
              <td className='px-4 py-2'>
                <button
                  onClick={() => handleUpdate(product.Product_ID)}
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2'>
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ViewProducts;
