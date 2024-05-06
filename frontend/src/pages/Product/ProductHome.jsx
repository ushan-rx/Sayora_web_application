import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast, Toaster } from 'react-hot-toast';

const ProductCard = ({ product, handleAddToCart }) => {
    return (
      <div className="flex flex-row items-center border border-cyan-500 rounded-md shadow-md p-4 mb-4">
        <img src={`http://localhost:5000/${product.url.slice(7)}`} alt="Product" className="w-200 h-60 mr-10" />
        <div className="flex flex-col flex-grow">
          <h1 className="text-lg font-bold mb-2">{product.productName}</h1>
          <p className="text-md mb-4">{product.description}</p>
          <p className="text-md mb-2">${product.unitPrice}</p> {/* Unit price */}
          <div className="flex justify-end">
            <button
              className="bg-cyan-500 text-white px-3 py-1 rounded"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };
  
const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = search.length > 0
    ? products.filter((val) =>
      val.productName.toLowerCase().includes(search.toLowerCase())
    )
    : products;

  const handleAddToCart = (product) => {
    const isProductInCart = cartItems.some(item => item.Product_ID === product.Product_ID);
    if (!isProductInCart) {
      setCartItems([...cartItems, product]);
      toast.success("Product added to cart")
    } else {
      toast.error('Product is already in the cart');
    }
  };

  const handleGoToCart = () => {
    navigate('/patient/product/cart', { state: { cartItems } });
  };

  return (
    <div className='h-[80vh] overflow-auto scrollbar-thin -mr-20 rounded-md'>
    <div className="max-w-4xl mx-auto p-6">
    <Toaster position="bottom-right"/>
        <h1 className="text-3xl mb-10 text-center">Ayurvedic Products</h1>
        <div className="flex justify-between items-center">
        <button
          className="bg-cyan-500 text-white py-2 px-5 rounded mb-5 ml-auto"
          onClick={handleGoToCart}
        >
          Cart
        </button>
      </div>
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
      <div className="flex flex-col justify-center mt-5">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.Product_ID}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductHome;
