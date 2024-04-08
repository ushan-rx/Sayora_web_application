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

//form schema
const formSchema = z.object({
    experinece: z.number({
        required_error: 'Experience is required.',
        }).int({message: 'Experience must be an integer number.'}),
    description: z.string().max(1000, {message: 'Description can not be more than 1000 characters.'}),
    appointmentPrice: z.string({required_error: 'Appointment price is required.'}),
    profilePic: z.string({invalid_type_error: 'Something wrong with the profile picture. Please re-upload'}),
    availability: z.boolean({required_error: 'Availability is required.',
                            invalid_type_error: 'Something wrong with the input. Please try again.'}),
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

        //default values for the form from the doctor prop
    let defaultValues = {
        experience: `${doctor?.experience || ''}`,
        description: `${doctor?.description || ''}`,
        appointmentPrice: `${doctor?.appointmentPrice || ''}`,
        profilePic: `${doctor?.profilePic || ''}`,
        availability: `${doctor?.availability || ''}`,
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

    const { fields, append, remove } = useFieldArray({
        name: "specialization",
        control: form.control,
      })

    //on form submit
    const onSubmitSecondary = async (data) => {
        setIsSubmitting(true);
        const url = `http://localhost:5000/api/v1/doctor/${docId}`;
        await axios.put(url, {
            experience: data.experience,
            description: data.description,
            appointmentPrice: data.appointmentPrice,
            profilePic: data.profilePic,
            availability: data.availability,
            specialization: data.specialization
        })
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
                            <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Specializations
                            </p>
                            <p className="tracking-wide text-[0.8rem] text-slate-500 dark:text-slate-400 mb-4">
                            Add your specialized areas.
                            </p>

                            {fields.map((field, index) => (
                                <div className='my-1 w-full'>
                                    <FormField
                                        control={form.control}
                                        key={field.id}
                                        name={`specialization.${index}.name`}
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
                        </div>

                        <div class="w-full mt-5 px-3 ">
                            <FormField
                                control={form.control}
                                name="availability"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
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