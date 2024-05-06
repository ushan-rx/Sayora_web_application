import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import InventrySideBar from "./InventerySideBar";

Chart.register(ArcElement, Tooltip, Legend);

const InventoryHome = () => {
  const [orderData, setOrderData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [supplierCount, setSupplierCount] = useState(0);
  const [lowInventoryItems, setLowInventoryItems] = useState([]);
  const [orderCounts, setOrderCounts] = useState({
    total: 0,
    pending: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await axios.get(
          "http://localhost:5000/Inventory/orders"
        );
        const filteredOrders = ordersRes.data;
        setOrderData(filteredOrders);
        setOrderCounts({
          total: filteredOrders.length,
          pending: filteredOrders.filter(
            (order) => order.OrderStatus === "Pending"
          ).length,
          completed: filteredOrders.filter(
            (order) => order.OrderStatus === "Completed"
          ).length,
        });

        const itemsRes = await axios.get("http://localhost:5000/items");
        setInventoryData(itemsRes.data);
        setLowInventoryItems(itemsRes.data.filter((item) => item.quantity < 5));

        const suppliersRes = await axios.get("http://localhost:5000/suppliers");
        setSupplierCount(suppliersRes.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const doughnutChartData = {
    labels: inventoryData.map((item) => item.name),
    datasets: [
      {
        data: inventoryData.map((item) => item.quantity),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#F77825",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="m-4 rounded-lg h-[85vh] overflow-auto scrollbar-thin">
    <div className="flex flex-row bg-gray-100">
      <div className="flex-grow flex flex-col p-8 overflow-hidden"> {/* Make the main area a flex column container */}
        <h1 className="text-3xl font-bold text-gray-700 m-4 text-center">
          Inventory Management Dashboard
        </h1>
        
        <div className="flex-grow flex flex-wrap justify-around overflow-y-auto"> {/* Flex container for content */}
          <div className="w-full lg:w-1/3 bg-white p-4 shadow rounded-lg m-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Inventory Distribution
            </h2>
            <Doughnut data={doughnutChartData} />
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg m-6 flex flex-col">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Recent Orders
            </h2>
            <div className="flex-grow overflow-y-auto">
              {orderData.slice(0, 10).map((order, index) => (
                <p key={index} className="mb-2">
                  <span className="font-bold">
                    {new Date(order.OrderDate).toLocaleDateString()}:
                  </span>
                  <span className="text-green-500 font-semibold">
                    -  Rs.{order.OrderTotal}
                  </span>
                  <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {order.OrderStatus}
                  </span>
                </p>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Low Inventory Items
          </h2>
          <div className="space-y-2">
            {lowInventoryItems.map((item, index) => (
              <div key={index} className="p-3 hover:bg-gray-50 rounded shadow">
                <p className="text-gray-700 font-medium">
                  {item.name} - <span className="text-red-500">Quantity: {item.quantity}</span>
                </p>
              </div>
            ))}
            {lowInventoryItems.length === 0 && (
              <p className="text-gray-500 italic">No low inventory items.</p>
            )}
          </div>
        </div>
          <div className="bg-white p-6 shadow-lg rounded-lg mb-6 m-10 h-max">
          <h2 className="text-xl font-semibold text-gray-800">
            Total Suppliers: <span className="text-blue-500">{supplierCount}</span>
          </h2>
        </div>
          <div className="bg-white p-6 shadow-lg rounded-lg m-6 flex flex-col">
            <h2 className="text-lg font-medium text-gray-700">
              Order Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* Statistics grid */}
              <div className="text-center p-4 bg-green-100 rounded-lg shadow">
                <p className="font-medium">Total Orders</p>
                <p className="text-lg font-semibold text-green-700">
                  {orderCounts.total}
                </p>
              </div>
              <div className="text-center p-4 bg-yellow-100 rounded-lg shadow">
                <p className="font-medium">Pending Orders</p>
                <p className="text-lg font-semibold text-yellow-700">
                  {orderCounts.pending}
                </p>
              </div>
              <div className="text-center p-4 bg-blue-100 rounded-lg shadow">
                <p className="font-medium">Completed Orders</p>
                <p className="text-lg font-semibold text-blue-700">
                  {orderCounts.completed}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
        
   
        </div>
        
      </div>
    </div>
    </div>
  );
  
};

export default InventoryHome;
