import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

function profileDoctor() {

  const [isPersonalSubmitted, setIsPersonalSubmitted] = useState(false);  // for personal details form submission
  // do things according to the form submission
  const changePersonalState = (value) => {         
    if(value){
      toast.success("Personal details updated successfully");
    } else {
      toast.error("Failed to update personal details");
    }
    setIsPersonalSubmitted(!isPersonalSubmitted);     // to update doctor details
  }

  const form2 = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	function onSubmitPersonal(values) {
		// Do something with the form values.

		// console.log(values);
	}

	return (
		<div>
      {/* toast component */}
      <div><Toaster position="bottom-right"/></div> 
			<div className="flex-grow mx-4 gap-1 my-6">
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 ">
					<div className="py-4 rounded-lg bg-gray-600">
						<div class="w-24 h-24 mt-2 bg-indigo-100 mx-auto rounded-full shadow-2xl flex items-center justify-center text-indigo-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-18 w-18"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</div>
					<div className="px-6 py-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 bg-teal-50 lg:col-span-2">
						{/* from */}

            <DoctorProfilePersonalForm  change={changePersonalState}/>

            

						{/* from end */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default profileDoctor;
