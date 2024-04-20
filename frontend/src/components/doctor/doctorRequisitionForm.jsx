import React, {useState} from "react";

import Cookies from "js-cookie";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { cn } from "@/lib/utils"
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

import { usePatientStore } from "@/store/patient.store";

const formSchema = z.object({
	testNames: z.array(z.object({
		name: z.string().min(2, {message: 'Test name must be at least 2 characters long'}),
	})),
});


const testNames = [
	{ name: "Blood Test" },
	{ name: "Urine Test" },
	{ name: "X-ray" },
	{ name: "MRI" },
	{ name: "CT Scan" },
	{ name: "ECG" },
	{ name: "EEG" },
	{ name: "EMG" },
	{ name: "Endoscopy" },
	{ name: "Colonoscopy" },
	{ name: "Biopsy" },
	{ name: "Pap Smear" },
	{ name: "Mammogram" },
	{ name: "Ultrasound" },
	{ name: "PET Scan" },
	{ name: "SPECT Scan" },
	{ name: "DEXA Scan" },
	{ name: "Treadmill Test" },
	{ name: "Spirometry" },
]

function doctorRequisitionForm({change}) {
    const docId = Cookies.get('roleId');

	const {patientId} = usePatientStore(state => ({
		patientId: state.patient.patientId,
	}))
    
    //to hold the form submit state
    const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues:{
			testNames: [{name : ''}],
		}
	})

	const { fields, append, remove } = useFieldArray({ 
		control: form.control,
		name: "testNames"
	})

	const onSubmit =  async (data) => {
		setIsSubmitting(true);
		data.testNames.map(test => {
			axios.post('http://localhost:5000/api/v1/requesition', {
				patientId: patientId,
				doctorId: docId,
				testName: test.name,
				reqDate: new Date(),
			})
			.then((response) => {
				console.log(response.data);
				change("Requistions added successfully");
			})
			.catch((error) => {
				console.log(error);
			})
		})
		setIsSubmitting(false);
		form.reset();
	}


  return (
    <div className="h-[50vh] overflow-auto scrollbar-thin">   
		<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 m-6">
		<FormLabel class="block uppercase  text-gray-700 text-lg font-bold">Make Requisitions</FormLabel>
		<FormDescription className= "text-base font-semibold uppercase">Add test names
		<Button type="submit" disabled={isSubmitting} class="float-end text-sm bg-teal-500 rounded-lg p-2 mr-1 my-4 font-medium text-white border shadow-md">
			Submit
		</Button>	
		</FormDescription>

		{fields.map((field, index) => (
				<div className=''>
				<FormField
					control={form.control}
					key={field.id}
					name={`testNames.${index}.name`}
					render={({ field }) => (
						<FormItem className="space-y-0 w-full flex">
						<div className='flex-1 mr-2'>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage className="w-full"/>
						</div>
						<Button
						type="button"
						variant="outline"
						size="sm"
						className={cn(fields.length > 1 ? "bg-red-500 text-white h-9 m-0" : "hidden")}
						onClick={() => {
								remove(index)
						}}
						>
							Remove
						</Button>
						</FormItem>
					)}
				/>
			
			</div>
		))}
		{/* button to add new fields */}
		<Button
			type="button"
			variant="outline"
			size="sm"
			className="mt-2 bg-slate-600 text-white"
			onClick={() => append({ name: "" })}
		>
			Add New
		</Button>                    
      </form>
    </Form>
    </div>
  )
}

export default doctorRequisitionForm