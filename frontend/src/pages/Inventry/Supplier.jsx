import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InventrySideBar from './InventerySideBar';

const Supplier = () => {
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/suppliers');
                setSuppliers(response.data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchSuppliers();
    }, []);

    const handleDelete = async (supplierId) => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
            try {
                await axios.delete(`http://localhost:5000/deletesupplier/${supplierId}`);
                setSuppliers(suppliers.filter((supplier) => supplier.SupplierID !== supplierId));
                alert('Supplier deleted successfully!');
            } catch (error) {
                console.error('Error deleting supplier:', error);
            }
        }
    };

    const handleUpdate = (supplierId) => {
        navigate('/staff/inventory/updateSupplier', { state: { supplierId } });
    };

    const handleAddSupplier = () => {
        navigate('/staff/inventory/addSupplier');
    };

    return (
        <>
            <div className='flex flex-row'>
                {/* <InventrySideBar/> */}
                <div className='w-full p-8'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-3xl font-bold'>Suppliers</h1>
                        <button 
                            onClick={handleAddSupplier} 
                            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                        >
                            Add Supplier
                        </button>
                    </div>
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Supplier ID
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Email
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Contact No
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Address
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers.map((supplier) => (
                                    <tr key={supplier.SupplierID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {supplier.SupplierID}
                                        </td>
                                        <td className="py-4 px-6">
                                            {supplier.name}
                                        </td>
                                        <td className="py-4 px-6">
                                            {supplier.email}
                                        </td>
                                        <td className="py-4 px-6">
                                            {supplier.ContactNo}
                                        </td>
                                        <td className="py-4 px-6">
                                            {supplier.Address}
                                        </td>
                                        <td className="py-4 px-6">
                                            <button onClick={() => handleUpdate(supplier.SupplierID)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                Update
                                            </button>
                                            <button onClick={() => handleDelete(supplier.SupplierID)} className="text-red-600 hover:text-red-900">
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
        </>
    );
};

export default Supplier;
