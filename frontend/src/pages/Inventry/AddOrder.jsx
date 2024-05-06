import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddOrder = () => {
  const [orderData, setOrderData] = useState({
    SupplierID: "",
    OrderTotal: 0,
    ItemArray: [], // Changed from OrderItems to ItemArray
  });
  const [suppliers, setSuppliers] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await axios.get("http://localhost:5000/suppliers");
      setSuppliers(
        response.data.map((s) => ({ value: s.SupplierID, label: s.name }))
      );
    };

    const fetchInventoryItems = async () => {
      const response = await axios.get("http://localhost:5000/items");
      setInventoryItems(response.data);
    };

    fetchSuppliers();
    fetchInventoryItems();
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const items = [...orderData.ItemArray]; // Changed from OrderItems to ItemArray
    if (name.startsWith("item-quantity")) {
      items[index].quantity = Number(value);
      setOrderData({ ...orderData, ItemArray: items }); // Changed from OrderItems to ItemArray
    }
    calculateTotal(items); // Calculate total whenever items change
  };

  const handleSupplierChange = (selectedOption) => {
    setSelectedSupplier(selectedOption);
    setOrderData({ ...orderData, SupplierID: selectedOption.value });
  };

  const handleAddItem = (item) => {
    const itemToAdd = {
      productId: item.InventoryItemID,
      quantity: 1,
      unitPrice: item.Unit_Price,
    };
    const newItems = [...orderData.ItemArray, itemToAdd]; // Changed from OrderItems to ItemArray
    setOrderData({
      ...orderData,
      ItemArray: newItems, // Changed from OrderItems to ItemArray
    });
    calculateTotal(newItems); // Recalculate total whenever a new item is added
  };

  const handleRemoveItem = (index) => {
    const items = [...orderData.ItemArray]; // Changed from OrderItems to ItemArray
    items.splice(index, 1);
    setOrderData({ ...orderData, ItemArray: items }); // Changed from OrderItems to ItemArray
    calculateTotal(items); // Recalculate total whenever an item is removed
  };

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, curr) => acc + curr.quantity * curr.unitPrice,
      0
    );
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      OrderTotal: total,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(orderData); // Debugging the final order data before submission
    try {
      await axios.post("http://localhost:5000/Inventory/addorder", orderData);
      alert("Order added successfully!");
      navigate("/staff/inventory/orders");
    } catch (error) {
      console.error("Error adding order:", error);
      alert("Failed to add order.");
    }
  };

  const filteredInventoryItems = searchTerm
    ? inventoryItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : inventoryItems;

  return (
    <div className="max-w-4xl h-[80vh] overflow-auto scrollbar-none mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Order</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Supplier
          </label>
          <Select
            options={suppliers}
            onChange={handleSupplierChange}
            value={selectedSupplier}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Item Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="mt-4 mb-6">
            {filteredInventoryItems.map((item) => (
              <div
                key={item.InventoryItemID}
                className="flex justify-between items-center p-2 bg-gray-100 rounded my-1"
              >
                <span>{item.name} - {item.Unit_Price.toFixed(2)}</span>
                <button
                  type="button"
                  onClick={() => handleAddItem(item)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Add to Order
                </button>
              </div>
            ))}
          </div>
        </div>

        {orderData.ItemArray.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Order Items</h3>
            <div className="bg-white shadow-md rounded px-4 pt-4 pb-2">
              {orderData.ItemArray.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center mb-2">
                  <span className="col-span-3">{inventoryItems.find(it => it.InventoryItemID === item.productId)?.name}</span>
                  <input
                    type="number"
                    name={`item-quantity-${index}`}
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, index)}
                    className="col-span-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    min="1"
                    required
                  />
                  <span className="col-span-3">{item.unitPrice.toFixed(2)}</span>
                  <span className="col-span-3">{(item.quantity * item.unitPrice).toFixed(2)}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="col-span-1 bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-2 w-8 rounded"
                  >
                    X
                  </button
                ></div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
