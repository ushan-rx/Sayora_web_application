import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState(0);
    const [itemType, setItemType] = useState('');
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newItem = {
            name,
            description,
            Unit_Price: unitPrice,
            itemType,
            quantity
        };

        try {
            await axios.post('http://localhost:5000/additem', newItem);
            alert('Inventory item added successfully!');
            navigate('/staff/inventory/view'); 
        } catch (error) {
            console.error('Error adding inventory item:', error);
            alert('Failed to add inventory item.');
        }
    };

    return (
        <div className='max-w-2xl h-[85vh] overflow-auto scrollbar-none mx-auto p-4'>
            <h1 className='text-3xl font-bold text-center mb-6'>Add Inventory Item</h1>
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                        Name
                    </label>
                    <input
                        id='name'
                        type='text'
                        placeholder='Item Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
                        Description
                    </label>
                    <textarea
                        id='description'
                        placeholder='Item Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='unitPrice'>
                        Unit Price
                    </label>
                    <input
                        id='unitPrice'
                        type='number'
                        placeholder='Unit Price'
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='itemType'>
                        Item Type
                    </label>
                    <input
                        id='itemType'
                        type='text'
                        placeholder='Item Type'
                        value={itemType}
                        onChange={(e) => setItemType(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='quantity'>
                        Quantity
                    </label>
                    <input
                        id='quantity'
                        type='number'
                        placeholder='Quantity'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        required
                    />
                </div>

                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Add Item
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;
