
import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddTreatment = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};

        if (!name.trim()) {                                         // Name validate
            errors.name = 'Treatment Name is required';
         }         
        if (!price.trim()) {                                        // Price Validate
            errors.price = 'Price is required';
        } else if (!/^\d+(\.\d{1,2})?$/.test(price.trim())) {
            errors.price = 'Price must be a valid number';
        }else if (parseFloat(price) <= 0) {
            errors.price = 'Price must be a positive number';
        } 

        if (!description.trim()) {                                   // Description Validate
            errors.description = 'Description is required';
        } else if (description.length < 20 || description.length > 500) {
            errors.description = 'Description must be between 20 and 500 characters';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const clearFields = () => {
        setName('');
        setPrice('');
        setDescription('');
        setErrors({});
    };

    const sendData = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const newTreatment = {
                name,
                description,
                price : parseFloat(price).toFixed(2) //convert to two decimal 
            };

            axios.post("http://localhost:5000/treatment/add", newTreatment)
                .then(() => {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Treatment Added',
                        showConfirmButton: true,
                        timer: 1500
                    });
                    clearFields();
                })
                .catch((err) => {
                    alert(err);
                });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-slate-100">
            <div className="w-full max-w-md p-6 mt-1 mb-8 bg-white border shadow-xl rounded-xl">
                <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">Add New Treatment</h1>
                <form onSubmit={sendData} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>
                    
                    <div className="flex">
                        <button type="submit" className="px-4 py-2 mr-1 font-bold text-white bg-[#0B66C1] rounded-lg hover:bg-blue-700">
                            Submit
                        </button>
                        <button type="button" className="px-4 py-2 ml-1 font-bold text-white bg-[#D7263D] rounded-lg hover:bg-red-700" onClick={clearFields}>
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddTreatment;


