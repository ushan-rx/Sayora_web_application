import React, {useRef, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';

import { useReactToPrint } from "react-to-print";

import { cn } from "@/lib/utils"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';
import { Separator } from '../../components/ui/separator';
import { BiX } from "react-icons/bi";

import usePrescriptionStore from '@/store/prescription.store'
import { usePatientStore } from "@/store/patient.store";

import TreatmentHistoryForm from '@/components/doctor/treatmentHistoryForm'

// prescription form schema
const formSchema = z.object({
  sickness: z.string({required_error: 'Enter a Diagnosis'}),
	medications: z.array(z.object({
		medication: z.string({required_error: 'Insert a medication'}),
    dosage: z.string({required_error: 'Insert a dosage'}),
    frequency: z.string({required_error: 'Insert a frequency'}),
	})),
  instructions: z.string({required_error: 'Insert instructions'}),
});

function prescribeContainer({change}) {
  const navigate = useNavigate() // navigation hook

    const appointmentId = useParams().id
    const doctorId = Cookies.get('roleId');
    const {patientId} = usePatientStore(state => ({
      patientId: state.patient.patientId,
    }));

    // state to handle prescription details
    const {
        prescription,
        setPatientId,
        setPatientName,
        setDoctorId,
        setDoctorName,
        setSickness,
        setMedications,
        setInstructions,
        setDate,
      } = usePrescriptionStore();

    //to hold the form submit state
    const [isSubmitting, setIsSubmitting] = useState(false);
    // prescription form
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues:{
        medications: [{}],
      }
    })

    const { fields, append, remove } = useFieldArray({ 
      control: form.control,
      name: "medications"
    })
    //prescription form submit
    const onSubmitPresc = async (data) => {
      setIsSubmitting(true);
      try {
        // Get data from backend using doctorId
        const responseDoc = await axios.get(`http://localhost:5000/api/v1/doctor/${doctorId}`);
        const doctorData = responseDoc.data.doctor;
        const doctorName = `${doctorData.fName} ${doctorData.lName}`;

        const responsePat= await axios.get(`http://localhost:5000/api/v1/patient/${patientId}`);
        const patientData = responsePat.data.patient;
        const patientName = `${patientData.fName} ${patientData.lName}`;

        const response = await axios.post('http://localhost:5000/api/v1/prescription', {
          patientId: patientId,
          doctorId: doctorId,
          doctorName: Cookies.get('userName'),
          sickness: data.sickness,
          medications: data.medications,
          instructions: data.instructions,
          date: new Date(),
        })
        console.log(response)

        // set the prescription details
        await setPatientId(patientId);
        await setPatientName(patientName);
        await setDoctorId(doctorId);
        await setDoctorName(doctorName);
        await setSickness(data.sickness);
        await setMedications(data.medications);
        await setInstructions(data.instructions);
        await setDate(new Date().toLocaleDateString());
        await change("Prescribed Successfully");

        console.log(prescription.sickness)
      } catch (error) {
        console.error('Error prescribing:', error);
      }
      setIsSubmitting(false);
    };

    // for printing (react-to-print)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Sayora Wellness Center",
    });

    //finish examination handle
    const handleFinish = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/updateappointments/${appointmentId}`, {
              status: 'Completed'
            })
            console.log(response)
            change("Examination Completed")
            setTimeout(() => {
                navigate(`/doctor/examination`)
            }, 1500);
          } catch (error) {
            console.error('Error completing appointment:', error)
          }
    }

    return (
        <div className='h-[80vh] overflow-auto scrollbar-thin -mr-20 rounded-md'>
          <div className='grid grid-cols-2'>
            <div className='grid grid-rows-2 '>
              <div className='m-4 bg-slate-50 rounded-lg row-span-2 h-[75vh]'>

                {/* print prescription component */}
                <div className='hidden'>
                    <div ref={componentRef} className="bg-white rounded-lg  p-6">
                        <style>{`@page { margin: 3rem 2rem 2rem 2rem !important; }`}</style>
                        <div className='flex justify-center'>
                        <img className='h-16 mb-4 ' src="https://sayora.lk/wp-content/uploads/2023/04/SAYORA-LOGO-NEW.png" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-6 text-center underline underline-offset-8">Prescription</h2>
                        {/* value fields */}
                        <div className="mb-4">
                            <p className="font-semibold">Doctor Name:</p>
                            <p>{prescription?.doctorName}</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Patient Name:</p>
                            <p>{prescription?.patientName}</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Diagnosis:</p>
                            <p>{prescription?.sickness}</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Issued Date:</p>
                            <p>{prescription?.date}</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Medications:</p>
                            <br/>
                            {/* medications table  */}
                            <table className=" ml-6 w-full">
                            <thead className='border-y-2'>
                                <tr>
                                <th className="text-center  border-x-2">Medication</th>
                                <th className="text-center  border-x-2">Dosage</th>
                                <th className="text-center  border-x-2">Frequency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescription?.medications.map((med, index) => (
                                <tr key={index}>
                                    <td className="text-left">{med.medication}</td>
                                    <td className="text-left">{med.dosage}</td>
                                    <td className="text-left">{med.frequency}</td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        <div className='mt-6'>
                            <br/>
                            <p className="font-semibold">Instructions:</p>
                            <br/>
                            <p className='px-20'><pre>{prescription?.instructions}</pre></p>
                        </div>
                    </div>
                </div>
                {/* print prescription end */}

                {/* prescription form */}
                <div className='h-[72vh] overflow-auto scrollbar-thin'>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitPresc)} className=" space-y-6 m-4">
                      <FormDescription className="block uppercase mb-2 text-gray-600 text-lg font-semibold">Prescribe</FormDescription>
                      
                      <FormField
                        control={form.control}
                        name="sickness"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                              Diagnosis
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={""}
                                {...field}
                                className="appearance-none h-9 block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs italic" />
                          </FormItem>
                        )}
                      />
                      <Separator className="h-[0.2rem]"/>
                      {/* medications inputs start */}
                      {fields.map((field, index) => (
                          <div className='grid '>
                            <FormField
                              control={form.control}
                              key={`${field.id}m`}
                              name={`medications.${index}.medication`}
                              render={({ field }) => (
                                <FormItem className="grid space-y-0 ">
                                  <FormLabel className="block uppercase tracking-wide !text-gray-700 text-xs font-bold mb-2">
                                    Medication
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={""}
                                      {...field}
                                      className="appearance-none h-9 block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-xs italic" />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              key={`${field.id}d`}
                              name={`medications.${index}.dosage`}
                              render={({ field }) => (
                                <FormItem className="grid space-y-0 ">
                                  <FormLabel className="block uppercase tracking-wide !text-gray-700 text-xs font-bold mb-2">
                                    Dosage
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={"1ml"}
                                      {...field}
                                      className="appearance-none h-9 block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-xs italic" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              key={`${field.id}f`}
                              name={`medications.${index}.frequency`}
                              render={({ field }) => (
                                <FormItem className="grid space-y-0 ">
                                  <FormLabel className="block uppercase tracking-wide !text-gray-700 text-xs font-bold mb-2">
                                    Frequency
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder={"once a day"}
                                      {...field}
                                      className="appearance-none h-9 block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-xs italic" />
                                </FormItem>
                              )}
                            />
                            <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className={cn(fields.length > 1 ? "bg-red-500 text-white w-20 h-8 mt-2 justify-self-center" : "hidden")}
                            onClick={() => {
                                remove(index)
                            }}
                          >
                            <BiX className='text-2xl'/>
                          </Button>
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
                      {/* medications inputs end */}
                      <Separator className="h-[0.2rem]"/>

                      <div className="flex flex-wrap -mx-3 mb-6">
                        {/* text area input */}
                        <div className="w-full px-3">
                            <FormField
                                control={form.control}
                                name="instructions"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="block uppercase tracking-wide !text-gray-700 text-xs font-bold mb-2">
                                        Instructions
                                    </FormLabel>
                                    <FormDescription>
                                        Additional instructions for the patient.
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Take before meals.."
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

                      <Button type="submit" disabled={isSubmitting} className="float-end text-sm bg-teal-500 rounded-lg p-2 mr-1 -mt-3 font-medium text-white border shadow-md">
                      Submit
                      </Button>                  
                    </form>
                  </Form>
                </div>

              </div>
            </div>
            <div className=' grid grid-rows-2'>
              <div className='m-4 bg-slate-50 rounded-lg row-span-2 '>
                <TreatmentHistoryForm change={change} />
              </div>
              <div className='m-4 h-12 flex justify-end '>
              <Button
                    onClick={handlePrint}
                    className="bg-blue-500 px-6 ml-12 text-base z-40">
                    Print Prescription
                </Button>
                <Button
                    onClick={handleFinish}
                    className="bg-green-600 px-6 ml-12 text-base z-40">
                    Finish
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
}


export default prescribeContainer