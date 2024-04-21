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
            <h1>Update Treatment</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (treatment && Object.keys(treatment).length !== 0 ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <Input type="text" id="name" placeholder={treatment.treatment.name} value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <Input type="text" id="description" placeholder={treatment.treatment.description} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <Input type="text" id="price" placeholder={treatment.treatment.price} value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <Button type="primary" htmlType="submit">Update</Button>
                    <Link to="/viewTreat" className="btn btn-secondary ms-2">Cancel</Link>
                </form>
            ) : (
                <div>Loading...</div>
            ))}
        </div>
    );
}
