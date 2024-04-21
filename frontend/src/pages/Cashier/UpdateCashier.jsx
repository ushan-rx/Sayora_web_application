// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
// import axios from "axios";
// import { Link, useParams } from 'react-router-dom'; 
// function UpdateCashier() {
//     const { id } = useParams(); 
//     const [cashierData, setCashierData] = useState({
//         patientId: '',
//         docFee: '',
//         treatmentFee: '',
//         discount: '',
//         total: '',
//     });
//     const [isTotalCalculated, setIsTotalCalculated] = useState(false); 

//     useEffect(() => {
        
//         fetchData();
//     }, []); 

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:4000/cashier/${id}`); 
//             setCashierData(response.data); 
//             setIsTotalCalculated(true); 
//         } catch (error) {
//             toast.error(error.message);
//             console.error(error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCashierData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const updateCashierData = async () => {
//         try {
//             await axios.put(`http://localhost:4000/cashier/${id}`, cashierData); 
//             toast.success('Cashier updated');
//             console.log('Cashier updated');
//         } catch (error) {
//             toast.error(error.message);
//             console.error(error);
//         }
//     };

//     return (
//         <form
//             className="w-3/4 p-10 mx-auto mt-20 mb-10 text-center border-2 border-gray-400 rounded-lg"
//             noValidate
//             autoComplete="off"
//         >
//             <div className="mb-3">
//                 <label htmlFor="patientId">Patient ID</label>
//                 <input
//                     id="patientId"
//                     type="text"
//                     name="patientId"
//                     value={cashierData.patientId}
//                     onChange={handleChange}
//                     required
//                     className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="patientId">Doctor Fee</label>
//                 <input
//                     id="docFee"
//                     type="text"
//                     name="docFee"
//                     value={cashierData.docFee}
//                     onChange={handleChange}
//                     required
//                     className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="patientId">Treatment Fee</label>
//                 <input
//                     id="treatmentFee"
//                     type="text"
//                     name="treatmentFee"
//                     value={cashierData.treatmentFee}
//                     onChange={handleChange}
//                     required
//                     className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//             </div>

//             <div className="mb-3">
//                 <label htmlFor="patientId">Discount</label>
//                 <input
//                     id="discount"
//                     type="text"
//                     name="discount"
//                     value={cashierData.discount}
//                     onChange={handleChange}
//                     required
//                     className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//             </div>

//             {isTotalCalculated && (
//                 <>
                    
//                     <div className="mb-3">
//                         <label htmlFor="total">Total</label>
//                         <input
//                             id="total"
//                             type="text"
//                             name="total"
//                             value={cashierData.total}
//                             readOnly
//                             className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         />
//                     </div>

                    
//                     <button
//                         className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
//                         type="button"
//                         onClick={() => {
//                             updateCashierData();
//                             window.location.href = '/viewCash'; 
//                         }}
//                     >
//                         Update
//                     </button>

//                     <Link
//                         to="/viewCash"
//                         className="px-4 py-2 ml-4 font-bold text-white bg-red-500 rounded hover:bg-red-700"
//                     >
//                         Cancel
//                     </Link>
//                 </>
//             )}
//         </form>
//     );
// }

// export default UpdateCashier;


import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from "axios";
import { Link, useParams } from 'react-router-dom'; 
import jsPDF from 'jspdf';

function UpdateCashier() {
    const { id } = useParams(); 
    const [cashierData, setCashierData] = useState({
        patientId: '',
        docFee: '',
        treatmentFee: '',
        discount: '',
        total: '',
    });
    const [isTotalCalculated, setIsTotalCalculated] = useState(false); 

    useEffect(() => {
        fetchData();
    }, []); 

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/cashier/${id}`); 
            setCashierData(response.data); 
            setIsTotalCalculated(true); 
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCashierData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const updateCashierData = async () => {
        try {
            await axios.put(`http://localhost:5000/cashier/${id}`, cashierData); 
            toast.success('Cashier updated');
            console.log('Cashier updated');
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    const generateReceipt = () => {
        const doc = new jsPDF();
        doc.text("Receipt", 10, 10); // Example text, you can customize this
    
        // Populate PDF with data from cashierData
        const { patientId, docFee, treatmentFee, discount, total } = cashierData;
        const data = [
            [`Patient ID: ${patientId}`, 10, 20],
            [`Doctor Fee: ${docFee}`, 10, 30],
            [`Treatment Fee: ${treatmentFee}`, 10, 40],
            [`Discount: ${discount}`, 10, 50],
            [`Total: ${total}`, 10, 60]
        ];
    
        data.forEach(([text, x, y]) => {
            doc.text(text, x, y);
        });
    
        // Add more content to the PDF as needed
    
        doc.save("receipt.pdf");
    };
    

    return (
        <form
            className="w-3/4 p-10 mx-auto mt-20 mb-10 text-center border-2 border-gray-400 rounded-lg"
            noValidate
            autoComplete="off"
        >
           <div className="mb-3">
                <label htmlFor="patientId">Patient ID</label>
                <input
                    id="patientId"
                    type="text"
                    name="patientId"
                    value={cashierData.patientId}
                    onChange={handleChange}
                    required
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="patientId">Doctor Fee</label>
                <input
                    id="docFee"
                    type="text"
                    name="docFee"
                    value={cashierData.docFee}
                    onChange={handleChange}
                    required
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="patientId">Treatment Fee</label>
                <input
                    id="treatmentFee"
                    type="text"
                    name="treatmentFee"
                    value={cashierData.treatmentFee}
                    onChange={handleChange}
                    required
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="patientId">Discount</label>
                <input
                    id="discount"
                    type="text"
                    name="discount"
                    value={cashierData.discount}
                    onChange={handleChange}
                    required
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            

            {isTotalCalculated && (
                <>
                    
                    <div className="mb-3">
                        <label htmlFor="total">Total</label>
                        <input
                            id="total"
                            type="text"
                            name="total"
                            value={cashierData.total}
                            onChange={handleChange}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    
                    <button
                        className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                        type="button"
                        onClick={() => {
                            updateCashierData();
                            window.location.href = '/viewCash'; 
                        }}
                    >
                        Update
                    </button>

                    <Link
                        to="/viewCash"
                        className="px-4 py-2 ml-4 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                    >
                        Cancel
                    </Link>

                    <button
                        className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                        onClick={generateReceipt}
                    >
                        Download Receipt
                    </button>
                </>
            )}
        </form>
    );
}

export default UpdateCashier;
