import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
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

import DoctorProfilePersonalForm from "@/components/doctor/doctorProfilePersonalForm";
import DoctorProfileSecondaryForm from "@/components/doctor/doctorProfileSecondaryForm";

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});


function profileDoctor() {
  const docId = Cookies.get("roleId");  // get the doctor id from the store
  const [isPersonalSubmitted, setIsPersonalSubmitted] = useState(false);  // for personal details form submission
  const [isSecondarySubmitted, setIsSecondarySubmitted] = useState(false);  // for Secondary details form submission
  const [doctorDetails, setDoctorDetails] = useState({});  // to store doctor details

  	// get doctor details from the backend
  async function getDoctor (docId){
	try{
		const response = await axios.get(`http://localhost:5000/api/v1/doctor/${docId}`);
		setDoctorDetails(response.data.doctor);
	}catch(error){
		toast.error("Failed to retrieve personal details. please refresh the page");
		console.log(error);
	}
  }

  useEffect(() => {
	// get doctor details from the backend
	getDoctor(docId);
  }, [isPersonalSubmitted, isSecondarySubmitted]);  // to update doctor details

  // do things according to the form submission
  const changePersonalState = (value) => {         
    if(value){
      toast.success("Personal details updated successfully");
    } else {
      toast.error("Failed to update personal details");
    }
    setIsPersonalSubmitted(!isPersonalSubmitted);     // to update doctor details
  }

  const changeSecondaryState = (value) => {         
    if(value){
      toast.success("Profile details updated successfully");
    } else {
      toast.error("Failed to update Profile details");
    }
    setIsSecondarySubmitted(!isSecondarySubmitted);     // to update doctor details
  }

	return (
		<div className="overflow-hidden">
      {/* toast component */}
      <div><Toaster position="bottom-right"/></div> 
			<div className="flex-grow mx-4 gap-1 my-6">
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
					<div className="py-4 rounded-lg bg-cyan-800 hidden lg:flex flex-col">
						{/* display profile image */}
						<div class="w-24 h-24 mt-2 bg-indigo-100 mx-auto rounded-full shadow-2xl flex items-center justify-center text-indigo-500">
							<img src={doctorDetails.profilePic} alt="" srcset="" />
						</div>

						{/* display profile details section */}
						<div className="mt-4 mx-20 text-center rounded-md font-bold text-lg text-gray-300">Profile</div>
						{/* profile details*/}
						<div className="pl-14 pt-4">

							<div className="mt-4 mx-2 text-cyan-100">Doctor ID : {docId && 
								<span className="capitalize text-white"> {docId}</span>}
							</div>

							<div className="mt-1 mx-2 text-cyan-100">Name : 
								{doctorDetails.fName && 
									<span className="capitalize text-white"> {doctorDetails.fName}</span>
								}
								{doctorDetails.lName && 
									<span className="capitalize text-white"> {doctorDetails.lName}</span>
								}
							</div>

							<div className="mt-1 mx-2 text-cyan-100">Specialization : </div>
							{
								doctorDetails.specialization?.map((specialization) => (
  									<div className="mt-1 ml-8 text-white"> {specialization.name} </div>
								))
							}

							<div className="mt-2 mx-2 text-cyan-100">Experience : 
								{doctorDetails.fName && 
									<span className="capitalize text-white"> {doctorDetails.experience} Yrs</span>
								}
							</div>

							<div className="mt-1 mx-2 text-cyan-100">Availability : 
								{doctorDetails.availability == true ?  
									<span className="capitalize text-white"> Available</span> :
									<span className="capitalize text-white"> Not Available </span>
								}
							</div>

							<div className="mt-1 mx-2 text-cyan-100">Appointment Price : 
								{doctorDetails.appointmentPrice && 
									<span className="capitalize text-white"> Rs. {doctorDetails.appointmentPrice}</span>
								}
							</div>

						</div>
					</div>
					{/* end profile details section */}
					{/* start profile edit forms */}
					<div className="px-6 py-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 bg-teal-50 shadow-inner lg:col-span-2 h-[34rem] overflow-y-auto scrollbar-thin">
						{/* personal details form */}
						<span className="text-2xl font-bold">Personal Details</span>
						{doctorDetails == {} && <><br/><span className="text-2xl font-normal">Loading...</span></>}
						{doctorDetails != undefined && <DoctorProfilePersonalForm  doctor = {doctorDetails} change={changePersonalState}/>}
						<span className="text-2xl mt-6 col-span-2 font-bold">Professional and Profile Details</span>
						{doctorDetails != undefined && <DoctorProfileSecondaryForm  doctor = {doctorDetails} change={changeSecondaryState}/>}

						{/* from end */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default profileDoctor;
