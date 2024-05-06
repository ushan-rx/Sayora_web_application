import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InventrySideBar from './InventerySideBar';


function ViewInventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setInventoryItems(response.data);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  const deleteItem = async (id) => {
    console.log("Delete item:", id);
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      fetchInventoryItems();  // Refresh the list after deletion
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  const filteredItems = searchTerm
    ? inventoryItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : inventoryItems;

  const lowStockCount = inventoryItems.filter(item => item.quantity < 5).length;

  return (
    <div className='flex flex-row mx-6 h-[85vh] overflow-auto scrollbar-thin'>
      {/* <InventrySideBar /> */}
      <div className="m-5 w-full">
        <h1 className="text-3xl font-bold text-center m-6">Inventory Items Section</h1>
        <div className="flex justify-between items-center mb-4 rounded-xl">
          <div className='w-44 h-20 bg-blue-500'>
            <h1 className="text-xl text-white font-semibold p-4">Inventory Items ({filteredItems.length})</h1>
          </div>
        <div className='w-44 h-20 bg-red-500'>
        <h1 className="text-xl text-white font-semibold p-5"> Low Stock: {lowStockCount}</h1>
        </div>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate('/staff/inventory/addItem')}
          >
            Add New Item
          </button>
        </div>
        <input 
          className="shadow appearance-none border rounded py-2 px-3 text-grey-darker mb-3 w-full"
          type="text" 
          placeholder="Search inventory..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.InventoryItemID} className={item.quantity < 5 ? "bg-red-200" : ""}>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.name}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.description}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      Rs.{item.Unit_Price.toLocaleString()}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      {item.quantity < 5 ? <span className="text-red-600 font-semibold">{item.quantity}</span> :  item.quantity}
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                      <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => deleteItem(item.InventoryItemID)}>
                        Delete
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
}

export default ViewInventory;
