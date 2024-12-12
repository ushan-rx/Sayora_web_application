
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from "axios";
import { Link } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area"



function Cashier() {
    const [patientMobile, setpatientMobile] = useState('');
    const [patientId, setPatientId] = useState('');
    const [patientName, setPatientName] = useState('');
    const [treatmentName, setTreatmentName] = useState('');
    const [docName, setDocName] = useState(''); 
    const [docFee, setDocFee] = useState('');
    const [treatmentFee, setTreatmentFee] = useState('');
    const [discount, setDiscount] = useState('0');
    const [total, setTotal] = useState('');
    const [isTotalCalculated, setIsTotalCalculated] = useState(false);
    

    const handleOnBlur = async() => {
    
    //Get patient appointment details    
    const appointments = await axios.get(`http://localhost:5000/appointments`)
    console.log(appointments)

    const filteredApp = appointments.data.filter((appointment) => {
        return appointment.patientContact === patientMobile
    })
    console.log(filteredApp)
    if(filteredApp.length > 0){
        for (let i = 0; i < appointments.data.length; i++) {
        const appontmentDate = appointments.data[i].App_date
        const appDate = new Date(appontmentDate).toLocaleDateString()
        const date = new Date().toLocaleDateString()
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
        alert("No appointments found")
        setIsSubmitted(false)
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
            const response = await axios.post("http://localhost:5000/cashier/", usersData);
            if (response.status === 200) {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Cashier added',
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log('Payment added');
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Error adding payment',
                text: error.message,
                showConfirmButton: true,
            });
            console.error(error);
        }
    };
    const [isSubmitted, setIsSubmitted] = useState(false);

    const resetForm = () => {
        // Reset the form fields
        setpatientMobile('');
        setPatientId('');
        setPatientName('');
        setTreatmentName('');
        setDocName('');
        setDocFee('');
        setTreatmentFee('');
        setDiscount('');
        setTotal('');
        setIsTotalCalculated(false);
        // Hide the form fields
        setIsSubmitted(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form 
    className="w-full max-w-sm px-4 py-4 space-y-2 overflow-y-auto transition-all duration-500 ease-in-out bg-white shadow-2xl mb-14 rounded-xl"
    noValidate
    autoComplete="off"
    onSubmit={(e) => {
        e.preventDefault();
        // Validate mobile number
        const mobileNumberPattern = /^[0-9]{10}$/; 
        if (!mobileNumberPattern.test(patientMobile)) {
            alert('Invalid mobile number'); 
            return;
        }
        handleOnBlur();
        setIsSubmitted(true);
    }}
>
                <div className="flex items-center justify-center">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-800">Sayora Wellness Center</h2>
                </div>
                {!isSubmitted && (
                    <>
                        <div className="mb-4">
                            <label htmlFor="patientMobile" className="block mb-1 text-sm font-semibold text-gray-700">Patient Mobile Num</label>
                            <input
                                id="patientMobile"
                                type="text"
                                value={patientMobile}
                                onChange={(e) => setpatientMobile(e.target.value)}
                                required
                                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700">
                            Submit
                        </button>
                    </>
                )}

            <div className="mb-4">
                <label htmlFor="patientName" className="block mb-1 text-sm font-semibold text-gray-700">Patient Name</label>
                <p id="patientName" className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {patientName}
                </p>
            </div>

            <div className="mb-4">
                <label htmlFor="docFee" className="block mb-1 text-sm font-semibold text-gray-700">Doctor Fee</label>
                <p id="docFee" className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {docFee}
                </p>
            </div>

            <div className="mb-4">
                <label htmlFor="treatmentFee" className="block mb-1 text-sm font-semibold text-gray-700">Treatment Fee</label>
                <p id="treatmentFee" className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {treatmentFee}
                </p>
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
 {isSubmitted && isTotalCalculated && ( 
            <>
                <div className="mb-4">
                    <label htmlFor="total" className="block mb-1 text-sm font-semibold text-gray-700">Total</label>
                    <input
                        id="total"
                        type="text"
                        value={total}
                        readOnly
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

               <div className="flex justify-between space-x-4">
    <Link to="/staff/Cashier/viewCash" className="flex-1 px-4 py-2 font-semibold text-white bg-teal-700 rounded-md hover:bg-teal-950" onClick={insertUsersData}>Add Payment</Link>

    <button
        className="flex-1 px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
        type="button"
        onClick={resetForm}
    >
        Cancel
    </button>
</div>
                </>
            )}
        </form>
    </div>
);
}

export default Cashier;
