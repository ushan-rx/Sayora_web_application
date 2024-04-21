// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Swal from 'sweetalert2';
// import { Button, Table } from 'antd';

// const { Column } = Table;

// const FetchTreatment = () => {

//     const [treatments, setTreatments] = useState(null);

//     useEffect(()=>{
//         const showTre = async ()=>{
//             try {
//                 const response = await axios.get('http://localhost:5000/treatment/');
//                 if (response.status === 200) {
//                     setTreatments(response.data);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         showTre();
//     }, []);

//     const deleteTreatment = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/treatment/delete/${id}`);
//             setTreatments(treatments.filter(item => item._id !== id));
//             Swal.fire({
//                 position: 'top-center',
//                 icon: 'success',
//                 title: 'Treatment Removed',
//                 showConfirmButton: true,
//                 timer: 1500
//             });
//             // You may want to handle the deletion without refreshing the page
//             // window.location.reload();
//         } catch (error) {
//             alert('Error deleting data', error);
//             console.error(error);
//         }
//     };

//     return (
//         <div className="container mx-auto">
//             <h1 className="mt-8 mb-4 text-3xl">All Treatments</h1>
//             <Link to={`/addTreat`} className="mb-4 ant-btn ant-btn-primary">Add New</Link>
//             <Table dataSource={treatments} bordered style={{ width: '80%', margin: 'auto' }}>
//                 <Column title="Treatment ID" dataIndex="treatmentId" key="treatmentId" />
//                 <Column title="Name" dataIndex="name" key="name" />
//                 <Column title="Description" dataIndex="description" key="description" />
//                 <Column title="Price" dataIndex="price" key="price" />
//                 <Column
//                     title="Actions"
//                     key="actions"
//                     render={(record) => (
//                         <span>
//                             <Link to={`/update/${record.treatmentId}`} className="mr-2 ant-btn ant-btn-warning">Edit</Link>
//                             <Button type="danger" onClick={() => deleteTreatment(record._id)}>Delete</Button>
//                         </span>
//                     )}
//                 />
//             </Table>
//         </div>
//     );
// }

// export default FetchTreatment;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { Button, Table } from 'antd';

const { Column } = Table;

const FetchTreatment = () => {

    const [treatments, setTreatments] = useState(null);

    useEffect(()=>{
        const showTre = async ()=>{
            try {
                const response = await axios.get('http://localhost:5000/treatment/');
                if (response.status === 200) {
                    setTreatments(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        showTre();
    }, []);

    const deleteTreatment = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/treatment/delete/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            setTreatments(treatments.filter(item => item._id !== id));
            alert('Treatment Removed');
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    return (
        <div className="container mx-auto">
    <h1 className="mt-8 mb-4 text-3xl px-28">All Treatments</h1>
    {/* <Link to={`/addTreat`} className="inline-block px-4 py-2 mb-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Add New</Link> */}
    <div className="mt-8 overflow-y-auto h-96">
    <div className="w-4/5 mx-auto">
    
    
            <table className="w-full border-collapse">
                <thead className="sticky top-0">
                    <tr>
                        <th className="px-4 py-2 bg-blue-100 border">Treatment ID</th>
                        <th className="px-4 py-2 bg-blue-100 border">Name</th>
                        <th className="px-4 py-2 bg-blue-100 border">Description</th>
                        <th className="px-4 py-2 bg-blue-100 border">Price</th>
                        <th className="px-4 py-2 bg-blue-100 border">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {treatments && treatments.map((record) => (
                        <tr key={record.treatmentId}>
                            <td className="px-4 py-2 border">{record.treatmentId}</td>
                            <td className="px-4 py-2 border">{record.name}</td>
                            <td className="px-4 py-2 border">{record.description}</td>
                            <td className="px-4 py-2 border">{record.price}</td>
                            <td className="px-4 py-2 border">
                                <Link to={`/updatex/${record.treatmentId}`} className="inline-block px-2 py-1 mb-2 mr-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700">Edit</Link>
                                <button onClick={() => deleteTreatment(record._id)} className="inline-block px-2 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700">Delete</button>
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

export default FetchTreatment;
