import React, {useState} from 'react'

import Cookies from "js-cookie";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';

import toast from 'react-hot-toast';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';

import { usePatientStore } from "@/store/patient.store";


// notes form schema
const formSchema = z.object({
    subject: z.string({required_error: 'Enter a Subject'}),
    note: z.string().min(2, {message: 'Note must be at least 2 characters long'}),
  });

function doctorNoteForm({change}) {
    const doctorId = Cookies.get('roleId');
    const {patientId} = usePatientStore(state => ({
        patientId: state.patient.patientId,
    }));

    //to hold the form submit state
    const [isSubmitting, setIsSubmitting] = useState(false);
    // notes form
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues:{
        note: ""
      }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        if(patientId !== null){
            const response = await axios.get(`http://localhost:5000/api/v1/doctorNote/patient/${patientId}`) // Fetch all notes
            console.log(response.data);
            const noteList = response.data.notes.filter((note) =>
                {return data.subject === note.subject}
            );
            console.log(noteList);
            if(noteList?.length == 0){ //check if the subject already exists
                try {
                    const response = await axios.post(`http://localhost:5000/api/v1/doctorNote`, 
                    {
                        patientId: patientId,
                        doctorId: doctorId,
                        subject: data.subject,
                        note: data.note
                    });
                    console.log(response);
                    change("Note added successfully!");
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsSubmitting(false);
                    form.reset();
                }
            } else { // if subject already exists
                toast.error('Subject already exists.Try different Name.');
                setIsSubmitting(false);
            }
        } else{  // if patient id is not available
            toast.error('Reresh Page');
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <div className='h-[72vh] overflow-auto scrollbar-thin'>
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 m-4">
                      <FormDescription className="block uppercase mb-2 text-gray-600 text-lg font-semibold">Add Notes</FormDescription>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                              Subject
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={"Channeling for Dengue Fever"}
                                {...field}
                                className="appearance-none h-9 block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs italic" />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-wrap -mx-3 mb-6">
                        {/* text area input */}
                        <div className="w-full px-3">
                            <FormField
                                control={form.control}
                                name="note"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="block uppercase tracking-wide !text-gray-700 text-xs font-bold mb-2">
                                        Note
                                    </FormLabel>
                                    <FormDescription>
                                        Take notes from examination process.
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Patients body temperature is too high.."
                                            {...field}
                                            className="min-h-36"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs italic" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        </div>

                      <Button type="submit" disabled={isSubmitting} className="float-end min-w-20 text-sm bg-teal-500 rounded-lg p-2 mr-1 -mt-3 font-medium text-white border shadow-md">
                      {isSubmitting ? "Adding" : " Add "}
                      </Button>                  
                    </form>
                  </Form>
            </div>
        </div>
    )
}

export default doctorNoteForm