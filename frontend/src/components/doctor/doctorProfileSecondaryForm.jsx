import React from 'react';
import {useState} from 'react';

import Cookies from 'js-cookie';

import {useFieldArray, useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { cn } from "@/lib/utils"
import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from "@/components/ui/switch";
import { uploadImage } from '@/utils/imageUpload';

//form schema
const formSchema = z.object({
    experience: z.number({
        required_error: 'Experience is required.',
        }).int({message: 'Experience must be an integer number.'}),
    description: z.string().max(1000, {message: 'Description can not be more than 1000 characters.'}),
    appointmentPrice: z.string({required_error: 'Appointment price is required.'}),
    // profilePic: z.string({invalid_type_error: 'Something wrong with the profile picture. Please re-upload'}),
    availability: z.boolean().default(false).optional(),
    specialization: z.array(
        z.object({
            name: z.string({required_error: 'Specialization name is required.'}).min(2, {message: "Specialization must be at least 2 characters"})
        })
    )
});


function doctorProfileSecondaryForm({doctor,change}) {
    const docId = Cookies.get('roleId');
    
    //to hold the form submit state
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [image, setImage] = useState(null);

        //default values for the form from the doctor prop
    let defaultValues = {
        experience: doctor?.experience || 0,
        description: `${doctor?.description || ''}`,
        appointmentPrice: `${doctor?.appointmentPrice || ''}`,
        availability: Boolean(doctor?.availability) || false,
        specialization: doctor?.specialization || []
    }

        // react hook form init with zod resolver
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
        values: defaultValues,
        resetOptions: {
            keepDirtyValues: true,
        }
    });

    const { fields, append, remove } = useFieldArray({  // hook to handle array fields(specialization)
        name: "specialization",
        control: form.control,
      })

    //on form submit
    const onSubmitSecondary = async (data) => {
        setIsSubmitting(true);
        let imageURL = "";     // profule picture url

        let updatedData = {
            experience: data.experience,
            description: data.description,
            appointmentPrice: data.appointmentPrice,
            availability: data.availability,
            specialization: data.specialization
        }

        if(image){     // if there is an image input
            imageURL = await uploadImage(image)      // upload the image to the firebase storage and get the url
            updatedData = {...updatedData, profilePic: imageURL}    // add image url to the updated data
        }

        const url = `http://localhost:5000/api/v1/doctor/${docId}`;  // backend url to update the doctor details
        let res = await axios.put(url, updatedData); // send the updated data to the backend
		if(res.status === 200){
            setIsSubmitting(false);
            change(true);
            return;
        }else{
            setIsSubmitting(false);
            change(false);
            return;
        }	
		
    }

    return(
        <>
            <Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmitSecondary)}
					class="w-full rounded-lg p-4 border-2 h-fit border-gray-200 bg-white shadow-sm col-span-2"
				>
					{/* long input */}
                    <div class="flex flex-wrap -mx-3 mb-6">
						{/* profile photo input*/}
						<div class="w-full px-3">
							<FormField
								control={form.control} 
								name="profilePic"
								render={({ field }) => (
									<FormItem>
										<FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
											Profile Photo
										</FormLabel>
                                        <FormDescription>
                                        Select a photo to set as profile picture.
                                        </FormDescription>
										<FormControl>
											<Input
												{...field}
												type="file"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    setImage(event.target.files[0]);
                                                  }}
												class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
											/>
										</FormControl>
										<FormMessage class="text-red-500 text-xs italic" />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div class="flex flex-wrap -mx-3 mb-6">
						{/* experience*/}
						<div class="w-full px-3">
							<FormField
								control={form.control} 
								name="experience"
								render={({ field }) => (
									<FormItem>
										<FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
											Experience (Yrs)
										</FormLabel>
										<FormControl>
											<Input
												placeholder={doctor.experience || "Yrs"}
												{...field}
												class="appearance-none h-9 block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
											/>
										</FormControl>
										<FormMessage class="text-red-500 text-xs italic" />
									</FormItem>
								)}
							/>
						</div>
					</div>
                    <div class="flex flex-wrap -mx-3 mb-6">
						{/* appointment price*/}
						<div class="w-full px-3">
							<FormField
								control={form.control}
								name="appointmentPrice"
								render={({ field }) => (
									<FormItem>
										<FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
											Appointment Price (Rs.)
										</FormLabel>
                                        <FormDescription>
                                            Price per an appointment.
                                        </FormDescription>
										<FormControl>
											<Input
												placeholder={doctor.appointmentPrice || "Rs."}
												{...field}
												class="appearance-none h-9 block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
											/>
										</FormControl>
										<FormMessage class="text-red-500 text-xs italic" />
									</FormItem>
								)}
							/>
						</div>
					</div>

                    <div class="flex flex-wrap -mx-3 mb-6">
                        {/* text area input */}
                        <div class="w-full px-3">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Description
                                    </FormLabel>
                                    <FormDescription>
                                        This description will be displayed to the Patients.
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe yourself"
                                            {...field}
                                            className="min-h-36"
                                        />
                                    </FormControl>
                                    <FormMessage class="text-red-500 text-xs italic" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div class="w-full mt-6 px-3 ">
                            <p className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                                    Specializations
                            </p>
                            <p className="tracking-wide text-[0.8rem] text-slate-500 dark:text-slate-400 mb-4">
                            Add your specialized areas.
                            </p>

                            {fields.map((field, index) => (
                                <div className='w-full my-1'>
                                    <FormField
                                        control={form.control}
                                        key={field.id}
                                        name={`specialization.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem className="flex w-full space-y-0">
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
                                className="mt-2 text-white bg-slate-600"
                                onClick={() => append({ name: "" })}
                            >
                                Add New
                            </Button>
                        </div>

                        <div class="w-full mt-5 px-3 ">
                            <FormField
                                control={form.control}
                                name="availability"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Availability</FormLabel>
                                            <FormDescription>
                                            Mark wheather you are currently Active or Inactive.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                            className="ml-3 !relative"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage className="w-full"/>
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>

					<Button type="submit" disabled={isSubmitting} class="float-end bg-teal-500 rounded-lg p-2 mt-2 font-medium text-white border shadow-md">Update</Button>
				</form>
			</Form>
        </>
    )
}

export default doctorProfileSecondaryForm;