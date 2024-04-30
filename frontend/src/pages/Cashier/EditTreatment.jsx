import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Input, Button } from 'antd';

export default function EditTreatment(){
    const [treatment, setTreatment] = useState({});
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/treatment/treat/${userId}`)
                setTreatment(res.data);
                console.log(res.data);
                setName(res.data.name);
                setDescription(res.data.description);
                setPrice(res.data.price);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                alert(err.message);
            }
        }
        Getid();
    }, [userId])

    function handleSubmit(e) {
        e.preventDefault();
        const updatedTreatment = {
            name,
            description,
            price
        }
        axios.put(`http://localhost:5000/treatment/update/${userId}`, updatedTreatment)
            .then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Treatment Updated',
                    showConfirmButton: true,
                    timer: 1500
                });
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Update Treatment</h1>
        {loading ? (
            <div className="text-lg text-gray-500">Loading...</div>
        ) : (treatment && Object.keys(treatment).length !== 0 ? (
            <form onSubmit={handleSubmit} className="space-y-4 border border-gray-300 p-4 rounded max-w-lg mx-auto">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <Input type="text" id="name" placeholder={treatment.treatment.name} value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <Input type="text" id="description" placeholder={treatment.treatment.description} value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <Input type="text" id="price" placeholder={treatment.treatment.price} value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div className="flex justify-end space-x-4">
    <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded">Update</Button>
    <Link to="/viewTreat" className="btn bg-red-600 text-white text-center py-2 px-4 hover:text-blue-800 rounded">Cancel</Link>
</div>
            </form>
        ) : (
            <div className="text-lg text-gray-500">Loading...</div>
        ))}
    </div>
    );
}
