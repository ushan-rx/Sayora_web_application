
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from "axios";
import { Link } from 'react-router-dom';


function Cashier() {
    const [patientMobile, setpatientMobile] = useState('');
    const [patientId, setPatientId] = useState('');
    const [patientName, setPatientName] = useState('');
    const [treatmentName, setTreatmentName] = useState('');
    const [docName, setDocName] = useState(''); 
    const [docFee, setDocFee] = useState('');
    const [treatmentFee, setTreatmentFee] = useState('');
    const [discount, setDiscount] = useState('');
    const [total, setTotal] = useState('');
    const [isTotalCalculated, setIsTotalCalculated] = useState(false);

    const handleOnBlur = async() => {
    
    //Get patient appointment details    
    const appointments = await axios.get(`http://localhost:5000/appointments?patientContact=${patientMobile}`)
    console.log(appointments)
    if(appointments.data.length > 0){
        for (let i = 0; i < appointments.data.length; i++) {
        const appontmentDate = appointments.data[i].App_date
        const appDate = new Date(appontmentDate).toISOString().split('T')[0]
        const date = new Date().toISOString().split('T')[0]
        //--console.log(appDate)
        console.log(date)
        //Get relevant appointment details  
        if(appDate == date){
            const selectedAppointmentId = appointments.data[i].App_Id
            const selectedDoctorId = appointments.data[i].doctorID
            const selectedPatientName = appointments.data[i].patientName
            const selectedAppointmentStatus = appointments.data[i].status
            console.log(selectedPatientName)
            console.log(selectedAppointmentStatus)
            console.log(selectedAppointmentId)
            console.log(selectedDoctorId)  

            setPatientName(selectedPatientName)
            
            
            if(selectedAppointmentStatus === "Completed"){
                
                //Get Treatment history details
                const tHistory = await axios.get(`http://localhost:5000/api/v1/treatmentHistory/filter/${selectedAppointmentId}`)
                console.log(tHistory) 
                const selectedTreatmentID = tHistory.data.tHistory[0].treatment
                const selectedTreatmentFee = tHistory.data.tHistory[0].treatment.price
                const selectedTreatmentName = tHistory.data.tHistory[0].treatment.name
                const selectedPatientId = tHistory.data.tHistory[0].patientId
                console.log(selectedTreatmentName)
                console.log(selectedTreatmentFee)  

                setTreatmentFee(selectedTreatmentFee)
                setPatientId(selectedPatientId)
                setTreatmentName(selectedTreatmentName)

                const doctors = await axios.get(`http://localhost:5000/api/v1/doctor?doctorId=${selectedDoctorId}`)
                console.log(doctors)
                const doctorFisrtName= doctors.data.doctors[0].fName
                const doctorLastName = doctors.data.doctors[0].lName
                const docFee = doctors.data.doctors[0].appointmentPrice
                console.log(doctorFisrtName+" "+doctorLastName)
                console.log(docFee)
                setDocFee(docFee)
                setDocName(doctorFisrtName+" "+doctorLastName)
                
            }

        }else{
                console.log("No appointment found Today")
        }     
        }
        

    }else {
        console.log("No appointments found")
    }
}
    

    const calculateTotal = () => {
        const docFeeValue = parseFloat(docFee);
        const treatmentFeeValue = parseFloat(treatmentFee);
        const discountValue = parseFloat(discount) || 0; 
        const totalValue = docFeeValue + treatmentFeeValue - discountValue;
        setTotal(totalValue.toFixed(2)); 
        setIsTotalCalculated(true); 
        toast.success(`Total value: ${totalValue.toFixed(2)}`);
    };

    const insertUsersData = async () => {
        const usersData = {
            patientId: patientId,
            patientName: patientName,
            docName: docName,
            docFee: docFee,
            treatmentName: treatmentName,
            treatmentFee: treatmentFee,
            discount: discount,
            total: total,
        };

        try {
            axios.post("http://localhost:5000/cashier/", usersData)
            .then(res => {
                toast.success('Cashier added');
                console.log('Cashier added');
            
            }).catch(err => {
                toast.error(err.message);
                console.log(err.message);
            })
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    return (
<div>
<form
    className="border-2 border-[#16ACBD] w-full max-w-lg mx-auto rounded-lg text-center p-6 mt-5 mb-20 space-y-6"
    noValidate
    autoComplete="off"
    onSubmit={(e) => {
        e.preventDefault();
        handleOnBlur();
    }}
>
    <div className="flex items-center justify-center">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Sayora Wellness Center</h2>
    </div>
    <div className="mb-4">
        <label htmlFor="patientMobile" className="block mb-1 text-sm font-semibold text-gray-700">Patient Mobile Num</label>
        <input
            id="patientMobile"
            type="text"
            value={patientMobile}
            onChange={(e) => setpatientMobile(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
    <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Submit
    </button>
    <div className="mb-4">
        <label htmlFor="patientName" className="block mb-1 text-sm font-semibold text-gray-700">Patient Name</label>
        <input
            id="patientName"
            type="text"
            value={patientName}
            onChange={(e) => setTreatmentFee(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>


    <div className="mb-4">
        <label htmlFor="docFee" className="block mb-1 text-sm font-semibold text-gray-700">Doctor Fee</label>
        <input
            id="docFee"
            type="text"
            value={docFee}
            onChange={(e) => setDocFee(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>

    <div className="mb-4">
        <label htmlFor="treatmentFee" className="block mb-1 text-sm font-semibold text-gray-700">Treatment Fee</label>
        <input
            id="treatmentFee"
            type="text"
            value={treatmentFee}
            onChange={(e) => setTreatmentFee(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
{/* --- */}         
    
    <div className="hidden mb-4">
        <label htmlFor="patient Mobile" className="block mb-1 text-sm font-semibold text-gray-700">Patient id</label>
        <input
            id="patientId"
            type="text"
            value={patientId}
            onChange={(e) => setpatientMobile(e.target.value)}

            //-- onBlur={handleOnBlur}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>

    <div className="hidden mb-4">
        <label htmlFor="docName" className="block mb-1 text-sm font-semibold text-gray-700">Doctor Name</label>
        <input
            id="docName"
            type="text"
            value={docName}
            onChange={(e) => setpatientMobile(e.target.value)}

            //-- onBlur={handleOnBlur}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>

    <div className="hidden mb-4">
        <label htmlFor="treatmentName" className="block mb-1 text-sm font-semibold text-gray-700">Treatment Name</label>
        <input
            id="treatmentName"
            type="text"
            value={treatmentName}
            onChange={(e) => setpatientMobile(e.target.value)}

            //-- onBlur={handleOnBlur}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
    
{/* --- */}
    <div className="mb-4">
    <label htmlFor="discount" className="block mb-1 text-sm font-semibold text-gray-700">Discount</label>
    <select
        id="discount"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
        <option value="">Select discount...</option>
        <option value="0">0%</option>
        <option value="5">5%</option>
        <option value="10">10%</option>
        <option value="15">15%</option>
        {/* Add more options as needed */}
    </select>  
</div>


    {!isTotalCalculated && ( 
        <button
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700"
            type="button"
            onClick={calculateTotal}
        >
            Calculate Total
        </button>
    )}

    {isTotalCalculated && ( 
        <>
            <div className="mb-4">
                <label htmlFor="total" className="block mb-1 text-sm font-semibold text-gray-700">Total</label>
                <input
                    id="total"
                    type="text"
                    value={total}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            {/* Use Link instead of submit button */}
            <Link to="/viewCash" className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-700" onClick={insertUsersData}>Add</Link>

            <button
                className="w-full px-4 py-2 mt-4 font-semibold text-white bg-red-500 rounded-md hover:bg-red-700"
                type="button"
            >
                Cancel
            </button>
        </>
    )}
/</form>

</div>



    );
}

export default Cashier;
