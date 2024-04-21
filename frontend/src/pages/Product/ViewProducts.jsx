import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
        await axios.delete(`http://localhost:5000/deleteProduct/${productId}`);
        setProducts(products.filter((product) => product._id !== productId));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className='h-[90vh] overflow-auto scrollbar-thin -mr-20 rounded-md'>
    <div className='max-w-4xl mx-auto p-8'>
      <h1 className='text-3xl  text-center mb-10'>Product List</h1>
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
          {products.map((product) => (
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
