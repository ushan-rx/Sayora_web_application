import React, {useState} from 'react'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
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
import { toast, Toaster } from 'react-hot-toast';

import PatientReportTable from "@/components/doctor/patientReportTable"

import { usePatientStore } from "@/store/patient.store";
import { uploadFile } from '@/utils/pdfUpload';
import { set } from 'date-fns';

//file handling
// const MAX_FILE_SIZE = 100000000;
// const ACCEPTED_FILE_TYPES = ["application/pdf"]

const formSchema = z.object({
    testName: z.string(),
    documentURL: z.any()
    // .refine(
    //     file => ACCEPTED_FILE_TYPES.includes(file.type),
    //     { message: 'Please choose PDF format files only' }
    //   ),
});

function reportsContainer() {

    const {patientId} = usePatientStore(state => ({
		patientId: state.patient.patientId,
	}));

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pdf, setPdf] = useState(null);

    const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues:{
			testName: "",
		}
	})

    let pdfURL = ""; // to store the PDFURL

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const date = new Date().toLocaleString();

        if(pdf){
            pdfURL = await uploadFile(pdf);
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/v1/report`,{
                testName: data.testName,
                documentURL: pdfURL,
                date: date,
                patientId: patientId,
            })
            console.log('Report details posted:', response.data);
            setIsSubmitting(false);
            toast.success('Report uploaded successfully');
            setPdf(null);
            form.reset();
        } catch (error) {
            console.error('Error posting report details:', error);
        }

    }

  return (
    <div className='-mt-3'>
            <Toaster position="bottom-right z-[1000]"/> 
        <div className='flex flex-row'>
          <Tabs Tabs defaultValue="reports" className="w-full mt-2 mx-2">
            <TabsList className="grid w-full grid-cols-2 h-10 bg-slate-200 text-slate-900 border-slate-300 border-2">
              <TabsTrigger value="reports" className="col-span-2">Medical Reports</TabsTrigger>
              {/* <TabsTrigger value="medical">User's Updates</TabsTrigger> */}
            </TabsList>
            <TabsContent value="reports" className="-mt-3">
                <Dialog>
                    <DialogTrigger>
                        <Button className='absolute mt-8 right-[12em]'>Add Report</Button>
                    </DialogTrigger>
                    <DialogContent className="w-[40vw] h-[70vh] z-50">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 m-4 mt-8">
                                <FormLabel className="text-md">
                                    Upload Reports 
                                </FormLabel>
                                <FormField
                                    control={form.control}
                                    name="testName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Report Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={"X-Ray report"}
                                                    {...field}
                                                    class="appearance-none h-9 block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
                                                />
                                            </FormControl>
                                            <FormMessage class="text-red-500 text-xs italic" />
                                        </FormItem>
								    )}
							    />

                                <FormField
                                    control={form.control} 
                                    name="documentURL"
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
                                                    accept="application/pdf"
                                                    onChange={(event) => {
                                                        setPdf(event.target.files[0]);
                                                    }}
                                                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                />
                                            </FormControl>
                                            <FormMessage class="text-red-500 text-xs italic" />
                                        </FormItem>
                                    )}
							    />
                                <Button type="submit" disabled={isSubmitting} class="float-end bg-teal-500 rounded-lg p-2 mt-2 font-medium text-white border shadow-md">Update</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
                <PatientReportTable />
            </TabsContent>
            <TabsContent value="medical">
            rger
            </TabsContent>
          </Tabs>

        </div>
    </div>
  )
}

export default reportsContainer