import React from "react";

//icons
import { BiX } from "react-icons/bi";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ScrollArea } from "@/components/ui/scroll-area";
import Cookies from "js-cookie";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils"

//form1 schema
const formSchema = z.object({
  reportName: z.string().min(2, {
    message: "reportName must be at least 2 characters.",
  }),
  temperature: z.number().int().min(0, {
    message: "temperature must be a number.",
  }),
});

export default function DailyUploads() {
  //get the doctore id from the store
  const patId = Cookies.get("roleId");
  console.log(patId);

  //to hold the form submit state
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportName: "",
      temperature: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "medications",
    control:form.control,
  });

  //Define a submit handler.
  async function onSubmit(data) {
    setIsSubmitting(true);
    console.log(data);
    try {
      // Send the form data to the backend
      data.patientId = patId;
      const response = await axios.post(
        `http://localhost:5000/api/v1/dailyupdate`,
        {
          ...data,
          medications: data.medications.map((medication) => ({
            type: medication.type,
            measure: medication.measure,
          })),
        }
      );
    } catch (error) {
      console.error("Failed to submit the form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="px-12">
      <div className="flex flex-col md:flex-row">
        <div className="p-4 md:w-3/5">
          <h1>Do You need to Update your medical status today?</h1>
          <br />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="reportName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Your report name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter valid name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be used to identify your report.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your body  tempareture now?</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter temparature" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <br />
              <FormLabel>Did you get any medications?</FormLabel>
              <br />
              {fields.map((field, index) => (
                                <div className='w-full my-1'>
                                    <FormField
                                        control={form.control}
                                        key={`${field.id}type`}
                                        name={`medications.${index}.type`}
                                        render={({ field }) => (
                                            <FormItem className="flex w-full space-y-0">
                                            <div className='flex-1 mr-2'>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage className="w-full"/>
                                            </div>
                                            
                                            </FormItem>
                                            
                                        )}
                                    />
                       
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
              
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any aditional notice to add?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter valid report" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                class="float-end bg-teal-500 rounded-lg p-2 mt-2 font-medium text-white border shadow-md"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <div className="p-4 bg-white md:w-2/5">
          <div className="grid grid-cols-1 gap-4"></div>
        </div>
      </div>
    </div>
  );
}
