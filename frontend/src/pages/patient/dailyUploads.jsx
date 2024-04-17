import React from "react";
import { useState } from "react";

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
import { cn } from "@/lib/utils";
import { add } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { uploadImage } from "@/utils/imageUpload";

//form1 schema
const formSchema = z.object({
  reportName: z.string().min(2, {
    message: "reportName must be at least 2 characters.",
  }),
  temperature: z.number().int({
    message: "temperature must be a number.",
  }),
  additionalNotes: z.string().min(2, {
    message: "additionalNotes must be at least 2 characters.",
  }),
  medications: z.array(
    z.object({
      type: z.string().min(2, {
        message: "type must be at least 2 characters.",
      }),
    })
  ),
  symptoms: z.array(
    z.string().min(2, {
      message: "symptoms must be at least 2 characters.",
    })
  ),
});

export default function DailyUploads() {
  //get the doctore id from the store
  const patId = Cookies.get("roleId");

  //to hold the form submit state
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [image, setImage] = useState(null);

  //form default values with zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportName: "",
      temperature: 0,
      medications: [{ type: "" }],
      symptoms: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "medications",
    control: form.control,
    name: "symptoms",
    control: form.control,
  });

  //Define a submit handler.
  async function onSubmit(data) {
    setIsSubmitting(true);
    let imageURL = ""; // profule picture url

    if (image) {
      // if there is an image input
      imageURL = await uploadImage(image); // upload the image to the firebase storage and get the url
      data = { ...data, documentURL: imageURL }; // add image url to the updated data
    }

    
    console.log(data);

    try {
      // Send the form data to the backend
      data.patientId = patId;
      await axios.post(`http://localhost:5000/api/v1/dailyupdate`, { ...data });
    } catch (error) {
      console.error("Failed to submit the form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="px-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ScrollArea className="p-4 h-[580px]">
            <h1>Do You need to Update your medical status today?</h1>
            <br />
            <div className="flex flex-col md:flex-row">
              <div className="p-4 md:w-3/5">
                <div className="grid grid-cols-1 gap-4">
                  {/* report name */}
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
                  {/* 
              twmparature
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your body tempareture now?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
                </div>

                {/* Additional note */}
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

                {/* long input */}
                <div class="flex flex-wrap -mx-3 mb-6">
                  {/* profile photo input*/}
                  <div class="w-full px-3">
                    <FormField
                      control={form.control}
                      name="documentURL"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Upload your document
                          </FormLabel>
                          <FormDescription>
                            Select a file as document
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
              </div>

              <div className="p-4 bg-white md:w-2/5">
                <div className="grid grid-cols-1 gap-4">
                  {/* Medications */}
                  <FormLabel>Did you get any medications?</FormLabel>
                  {fields.map((field, index) => (
                    <div className="w-full my-1">
                      <FormField
                        control={form.control}
                        key={field.id}
                        name={`medications.${index}.type`}
                        render={({ field }) => (
                          <FormItem className="flex w-64 space-y-0">
                            <div className="flex-1 mr-2">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage className="w-full" />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className={cn(
                                  fields.length > 1
                                    ? "bg-red-500 text-white h-9 m-0"
                                    : "hidden"
                                )}
                                onClick={() => {
                                  remove(index);
                                }}
                              >
                                Remove
                              </Button>
                            </div>
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
                    className="w-32 mt-2 text-white bg-slate-600"
                    onClick={() => append({ name: "" })}
                  >
                    Add New1
                  </Button>

                  {/* Symptomps */}
                  <FormLabel>Did you get any medications?</FormLabel>
                  {fields.map((field, index) => (
                    <div className="w-full my-1">
                      <FormField
                        control={form.control}
                        key={field.id}
                        name={`symptoms.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex w-full space-y-0">
                            <div className="flex-1 mr-2">
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage className="w-full" />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className={cn(
                                  fields.length > 1
                                    ? "bg-red-500 text-white h-9 m-0"
                                    : "hidden"
                                )}
                                onClick={() => {
                                  remove(index);
                                }}
                              >
                                Remove
                              </Button>
                            </div>
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
                    className="w-32 mt-2 text-white bg-slate-600"
                    onClick={() => append({ name: "" })}
                  >
                    Add New
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    class="float-end bg-teal-500 rounded-lg p-2 mt-2 font-medium text-white border shadow-md"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </form>
      </Form>
    </div>
  );
}
