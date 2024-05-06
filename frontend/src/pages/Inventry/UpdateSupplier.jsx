import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate , useLocation} from 'react-router-dom';

const UpdateSupplier = () => {
    // const { supplierId } = useParams(); // Grabbing the ID from URL parameters
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location?.state);
    const [supplierId, setSupplierId] = useState(location?.state?.supplierId || "null");
    // const { supplierId } = location?.state?.supplierId || "null";
     console.log(supplierId);
    const [supplier, setSupplier] = useState({
        name: '',
        email: '',
        ContactNo: '',
        Address: '',
    });


    // Fetch existing supplier data
    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/supplier/${supplierId}`);
                setSupplier({
                    name: response.data.name,
                    email: response.data.email,
                    ContactNo: response.data.ContactNo,
                    Address: response.data.Address,
                });
                
            } catch (error) {
                console.error('Error fetching supplier:', error);
                alert('Failed to fetch supplier details.');
            }
        };
        
        fetchSupplier();
    }, [supplierId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(supplier)
            await axios.put(`http://localhost:5000/updatesupplier/${supplierId}`, supplier);
            alert('Supplier updated successfully!');
            navigate('/staff/inventory/suppliers'); // Redirecting to the supplier list
        } catch (error) {
            console.error('Error updating supplier:', error);
            alert('Failed to update supplier.');
        }
    };

    return (
        <div className='max-w-2xl mx-auto mt-6 p-4'>
            <h1 className='text-3xl font-bold text-center mb-6'>Update Supplier</h1>
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                        Name
                    </label>
                    <input
                        type='text'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='name'
                        name='name'
                        value={supplier.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                        Email
                    </label>
                    <input
                        type='email'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='email'
                        name='email'
                        value={supplier.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='contactNo'>
                        Contact Number
                    </label>
                    <input
                        type='text'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='contactNo'
                        name='contactNo'
                        value={supplier.ContactNo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>
                        Address
                    </label>
                    <input
                        type='text'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='address'
                        name='address'
                        value={supplier.Address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        Update Supplier
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateSupplier;
