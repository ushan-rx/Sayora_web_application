import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from '../ui/separator';
import { Calendar } from "@/components/ui/calendar"
import { BiX } from "react-icons/bi";
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { usePatientStore } from "@/store/patient.store";

// scheduled treatments
const formSchemaIncomplete = z.object({
	treatmentIn: z.string().min(2, {message: 'Select a Treatment'}),
  date: z.date(),
});

const formSchema = z.object({
	treatments: z.array(z.object({
		id: z.string({required_error: 'Select a Treatment'}),
	})),
});

function treatmentHistoryForm({change}) {

  const doctorId = Cookies.get('roleId');
  const appointmentId = useParams().id;

  const {patientId} = usePatientStore(state => ({
		patientId: state.patient.patientId,
	}));
  //to hold the time
  const [date, setDate] = React.useState(new Date())
  //to hold the form submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // to get treatments from backend
  const [treatmentDetails, setTreatmentDetails] = useState([]);
  const fetchTreatmentDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/treatment');
      const treatments = await response.data;
      console.log(treatments);
      setTreatmentDetails(treatments);
      // Process the fetched treatment details here
    } catch (error) {
      console.error('Error fetching treatment details:', error);
    }
  };

  useEffect(() => {
    fetchTreatmentDetails();
  }, []);

  const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues:{
			treatments: [{}],
		}
	})

  // scheduled treatments
  const formIncomplete = useForm({
		resolver: zodResolver(formSchemaIncomplete),
		defaultValues:{
			treatmentIn: '',
		}
	})

  const { fields, append, remove } = useFieldArray({ 
		control: form.control,
		name: "treatments"
	})


  const onSubmitComplete = async (data) => {
    setIsSubmitting(true);
		data.treatments.map(treatment => {
      console.log(treatment.id)
      console.log(patientId)
			axios.post('http://localhost:5000/api/v1/treatmentHistory', {
				patientId: patientId,
				doctorId: doctorId,
        appointmentId: appointmentId,
				treatment: treatment.id,
				date: new Date(),
        isComplete: true,
			})
			.then((response) => {
				console.log(response.data);
				change("Treatment added successfully");
			})
			.catch((error) => {
				console.log(error);
			})

    })
    setIsSubmitting(false);
    form.reset();
  }

  const onSubmitInComplete = async (data) => {
    setIsSubmitting(true);
			axios.post('http://localhost:5000/api/v1/treatmentHistory', {
				patientId: patientId,
				doctorId: doctorId,
        appointmentId: appointmentId,
				treatment: data.treatmentIn,
				date: new Date(data.date),
			})
			.then((response) => {
				console.log(response.data);
				change("Treatment Scheduled successfully");
			})
			.catch((error) => {
				console.log(error);
			})

    setIsSubmitting(false);
    formIncomplete.reset();
  }
  
  return (
        <div className='h-[60vh] overflow-auto scrollbar-thin'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitComplete)} className=" space-y-6 m-4">
              <FormDescription className="block uppercase mb-2 text-gray-600 text-lg font-semibold">Treatments</FormDescription>
              <FormLabel className="text-md">Completed Treatments
                <Button type="submit" disabled={isSubmitting} class="float-end text-sm bg-teal-500 rounded-lg p-2 mr-1 -mt-3 font-medium text-white border shadow-md">
                Submit
                </Button>
              </FormLabel>
    
              {fields.map((field, index) => (
                  <div>
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`treatments.${index}.id`}
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 space-y-0 justify-center">
                          <Select onValueChange={field.onChange} defaultValue={field.value} > 
                            <FormControl>
                              <SelectTrigger className="col-span-2">
                                <SelectValue placeholder="Select Treatment" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                treatmentDetails.map((treatment) => (
                                  <SelectItem key={treatment.treatmentId} value={treatment._id}>{treatment.name}</SelectItem>
                                ) )
                              }
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className={cn(fields.length > 1 ? "bg-red-500 text-white h-8 mx-12" : "hidden")}
                            onClick={() => {
                                remove(index)
                            }}
                          >
                            <BiX className='text-2xl'/>
                          </Button>
                          <FormMessage className="col-span-3"/>
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
          <Separator className="w-11/12 mx-5 h-1"/>

          {/* form schedule treatments */}
          <Form {...formIncomplete}>
            <form onSubmit={formIncomplete.handleSubmit(onSubmitInComplete)} className=" space-y-6 m-4 mt-8">
              
              <FormLabel className="text-md">Schedule a Treatment
                <Button type="submit" disabled={isSubmitting} class="float-end text-sm bg-teal-500 rounded-lg p-2 mr-1 -mt-3 font-medium text-white border shadow-md">
                Submit
                </Button>
              </FormLabel>
              <div>
              <FormField
                control={formIncomplete.control}
                name={`treatmentIn`}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-3 space-y-0 justify-center">
                    <Select onValueChange={field.onChange} defaultValue={field.value} > 
                      <FormControl>
                        <SelectTrigger className="col-span-2">
                          <SelectValue placeholder="Select Treatment" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          treatmentDetails.map((treatment) => (
                            <SelectItem key={treatment.treatmentId} value={treatment._id}>{treatment.name}</SelectItem>
                          ) )
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage className="col-span-3"/>
                  </FormItem>
                )}
              />

              <FormField
                control={formIncomplete.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-4">
                    <FormLabel className = "!text-gray-700">Schedule Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocusedDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div> 
            </form>
          </Form>

        </div>
    )
  
}

export default treatmentHistoryForm