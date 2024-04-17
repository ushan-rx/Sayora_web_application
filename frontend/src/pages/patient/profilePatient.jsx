import React, {useEffect, useState} from 'react'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import axios from "axios";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {toast, Toaster} from "react-hot-toast";

import PatientProfilePersonalForm from "@/components/patient/PatientProfilePersonalForm";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

function profilrPatient() {
    const patId = Cookies.get("roleId");  // get the patient id from the store
    const [isPersonalSubmitted, setIsPersonalSubmitted] = useState(false);  // for personal details form submission
    const [patientDetails, setPatientDetails] = useState({});  // to store patient details

    // get patient details from the backend
    async function getPatient (patId){
        try{
            const response = await axios.get(`http://localhost:5000/api/v1/patient/${patId}`);
            setPatientDetails(response.data.patient);
        }catch(error){
            toast.error("Failed to retrieve personal details. please refresh the page");
            console.log(error);
        }
    }

    useEffect(() => {
        // get patient details from the backend
        getPatient(patId);
    }, [isPersonalSubmitted]);  // to update patient details

    // do things according to the form submission
    const changePersonalState = (value) => {
        if(value){
            toast.success("Personal details updated successfully");
        } else {
            toast.error("Failed to update personal details");
        }
        setIsPersonalSubmitted(!isPersonalSubmitted);     // to update patient details
    }

    const form2 = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    function onSubmitPersonal(values) {
        // Do something with the form values.
        console.log(values);
    }

    return (
        <div className="overflow-hidden">
      {/* toast component */}
      <div><Toaster position="bottom-right"/></div> 
			<div className="flex-grow gap-1 mx-4 my-6">
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
					<div className="flex-col hidden py-4 rounded-lg bg-cyan-800 lg:flex">
			
						<div class="w-24 h-24 mt-2 bg-indigo-100 mx-auto rounded-full shadow-2xl flex items-center justify-center text-indigo-500">
                            <img src={patientDetails.profilePic} alt="" srcset="" />
						</div>
						{/* display profile details section */}
						<div className="mx-20 mt-4 text-lg font-bold text-center text-gray-300 rounded-md">Profile</div>
						{/* profile details*/}
						<div className="pt-4 pl-14">

							<div className="mx-2 mt-4 text-cyan-100">Patient ID : {patId && 
								<span className="text-white capitalize"> {patId}</span>}
							</div>

							<div className="mx-2 mt-1 text-cyan-100">Name : 
								{patientDetails.fName && 
									<span className="text-white capitalize"> {patientDetails.fName}</span>
								}
								{patientDetails.lName && 
									<span className="text-white capitalize"> {patientDetails.lName}</span>
								}
							</div>

                            

						</div>
					</div>
					{/* end profile details section */}
					{/* start profile edit forms */}
					<div className="px-6 py-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 bg-teal-50 shadow-inner lg:col-span-2 h-[34rem] overflow-y-auto scrollbar-thin">
						{/* personal details form */}
						<span className="text-2xl font-bold">Personal Details</span>
						{patientDetails == {} && <><br/><span className="text-2xl font-normal">Loading...</span></>}
						{patientDetails != undefined && <PatientProfilePersonalForm  doctor = {patientDetails} change={changePersonalState}/>}
            

						{/* from end */}
					</div>
				</div>
			</div>
		</div>
        
    );
}

export default profilrPatient;

