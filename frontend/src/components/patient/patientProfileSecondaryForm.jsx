import React from "react";
import { useState } from "react";

import Cookies from "js-cookie";

import { BiX } from "react-icons/bi";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { cn } from "@/lib/utils";
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
import { Switch } from "@/components/ui/switch";
import { uploadImage } from "@/utils/imageUpload";

//form schema
const formSchema = z.object({
  bloodGroup: z.string().min(2, {
    message: "Blood group must be at least 2 characters.",
  }),
  currentMedications: z.array(
    z.object({
      name: z.string().min(2, {
        message: "Medication name must be at least 2 characters.",
      }),
      dosage: z.string().min(2, {
        message: "Dosage must be at least 2 characters.",
      }),
      frequency: z.string().min(2, {
        message: "Frequency must be at least 2 characters.",
      }),
      reason: z.string().min(2, {
        message: "Reason must be at least 2 characters.",
      }),
    })
  ),
  allergies: z.array(
    z.string().min(2, {
      message: "Allergy name must be at least 2 characters.",
    })
  ),
  vitals: z.array(
    z.object({
      weight: z.number().min(1, {
        message: "Weight must be at least 1.",
      }),
      height: z.number().min(1, {
        message: "Height must be at least 1.",
      }),
      bloodPressure: z.string().min(2, {
        message: "Blood pressure must be at least 2 characters.",
      }),
      temperature: z.number().min(1, {
        message: "Temperature must be at least 1.",
      }),
      oxygenSaturation: z.number().min(1, {
        message: "Oxygen saturation must be at least 1.",
      }),
      pulseRate: z.number().min(1, {
        message: "Pulse rate must be at least 1.",
      }),
    })
  ),
});

function doctorProfileSecondaryForm({ doctor, change }) {
  const patId = Cookies.get("roleId");

  //to hold the form submit state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [image, setImage] = useState(null);

  //default values for the form from the doctor prop
  let defaultValues = {
    bloodGroup: doctor?.bloodGroup || "",
    currentMedications: doctor?.currentMedications || {name: "", dosage: "", frequency: "", reason: ""},
    allergies: doctor?.allergies || "",
    vitals: doctor?.vitals,
  };

  // react hook form init with zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
    values: defaultValues,
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const {
    fields: medicationFields,
    append: medicationAppend,
    remove: medicationRemove,
  } = useFieldArray({
    // hook to handle array fields(specialization)
    name: "currentMedications",
    control: form.control,
  });

  const {
    fields: allergyFields,
    append: allergyAppend,
    remove: allergyRemove,
  } = useFieldArray({
    // hook to handle array fields(specialization)
    name: "allergies",
    control: form.control,
  });

  const { fields: vitalsFields } = useFieldArray({
    // hook to handle array fields(specialization)
    name: "vitals",
    control: form.control,
  });

  //on form submit
  const onSubmitSecondary = async (data) => {
    setIsSubmitting(true);
    let imageURL = ""; // profule picture url

    let updatedData = {
      bloodGroup: data.bloodGroup,
      currentMedications: data.currentMedications,
      allergies: data.allergies,
      vitals: data.vitals,
    };

    if (image) {
      // if there is an image input
      imageURL = await uploadImage(image); // upload the image to the firebase storage and get the url
      updatedData = { ...updatedData, profilePic: imageURL }; // add image url to the updated data
    }

    console.log(updatedData);

    const url = `http://localhost:5000/api/v1/patient/${patId}`; // backend url to update the doctor details
    let res = await axios.put(url, updatedData); // send the updated data to the backend
    if (res.status === 200) {
      setIsSubmitting(false);
      change(true);
      return;
    } else {
      setIsSubmitting(false);
      change(false);
      return;
    }
  };

  return (
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
            {/* bloodGroup*/}
            <div class="w-full px-3">
              <FormField
                control={form.control}
                name="bloodGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Blood Group
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={doctor.bloodGroup}
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

          <div className="flex flex-col md:flex-row">
            {/* Allergies */}
            <div class="w-full px-4 md:w-2/5">
              

              {/* vitalsFields */}
              <div class="w-full mt-6 md:w-1/5">
                <p className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                  Vitals
                </p>
                {vitalsFields.map((field, index) => (
                  <div className="w-56 my-1 ">
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`vitals.${index}.weight`}
                      render={({ field }) => (
                        <FormItem className="flex w-full py-2 space-y-0">
                          <FormLabel class="tracking-wide text-gray-700 text-sm font-medium mt-2">
                            Weight -
                          </FormLabel>
                          <div className="flex-1 pl-8 ">
                            <FormControl>
                              <Input {...field} onChange={(event) => field.onChange(+event.target.value)}/>
                            </FormControl>
                            <FormMessage className="w-full" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`vitals.${index}.height`}
                      render={({ field }) => (
                        <FormItem className="flex w-full pb-2 space-y-0">
                          <FormLabel class="tracking-wide text-gray-700 text-sm font-medium mt-2">
                            Height -
                          </FormLabel>
                          <div className="flex-1 pl-8 ">
                            <FormControl>
                              <Input {...field} onChange={(event) => field.onChange(+event.target.value)}/>
                            </FormControl>
                            <FormMessage className="w-full" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`vitals.${index}.bloodPressure`}
                      render={({ field }) => (
                        <FormItem className="flex w-full pb-2 space-y-0">
                          <FormLabel class="tracking-wide text-gray-700 text-sm font-medium mt-2">
                            Blood Pressure -
                          </FormLabel>
                          <div className="flex-1 pl-8 ">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage className="w-full" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`vitals.${index}.temperature`}
                      render={({ field }) => (
                        <FormItem className="flex w-full pb-2 space-y-0">
                          <FormLabel class="tracking-wide text-gray-700 text-sm font-medium mt-2">
                            Temperature -
                          </FormLabel>
                          <div className="flex-1 pl-8 ">
                            <FormControl>
                              <Input {...field} onChange={(event) => field.onChange(+event.target.value)}/>
                            </FormControl>
                            <FormMessage className="w-full" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`vitals.${index}.oxygenSaturation`}
                      render={({ field }) => (
                        <FormItem className="flex w-full pb-2 space-y-0">
                          <FormLabel class="tracking-wide text-gray-700 text-sm font-medium mt-2">
                            Oxygen Saturation -
                          </FormLabel>
                          <div className="flex-1 pl-8 ">
                            <FormControl>
                              <Input {...field} onChange={(event) => field.onChange(+event.target.value)}/>
                            </FormControl>
                            <FormMessage className="w-full" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`vitals.${index}.pulseRate`}
                      render={({ field }) => (
                        <FormItem className="flex w-full pb-2 space-y-0">
                          <FormLabel class="tracking-wide text-gray-700 text-sm font-medium mt-2">
                            Pulse Rate -
                          </FormLabel>
                          <div className="flex-1 pl-8 ">
                            <FormControl>
                              <Input {...field} onChange={(event) => field.onChange(+event.target.value)}/>
                            </FormControl>
                            <FormMessage className="w-full" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div class="w-full m-6 md:w-4/5">
            <p className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Allergies
              </p>

              <div className="w-full">
                {allergyFields.map((field, index) => (
                  <div className="flex w-full my-1 ">
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`allergies.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex w-full space-y-0">
                          <div className="flex-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage className="w-full" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn("text-red-500 h-9 mr-4")}
                      onClick={() => {
                        allergyRemove(index);
                      }}
                    >
                      <BiX />
                    </Button>
                  </div>
                ))}
                {/* button to add new fields */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 text-white bg-slate-600"
                  onClick={() => allergyAppend({ name: "" })}
                >
                  Add New
                </Button>
              </div>
            </div>
          </div>

          {/* Currunt medication */}
          <p className="block mt-6 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Current medications
              </p>

              <div className="w-full">
                {medicationFields.map((field, index) => (
                  <div className="flex w-full my-1 ">
                    <FormField
                      control={form.control}
                      name={`currentMedications.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex w-full space-y-2">
                          <div className="flex-1 pr-2">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage className="w-full" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`currentMedications.${index}.dosage`}
                      render={({ field }) => (
                        <FormItem className="flex w-full space-y-0">
                          <div className="flex-1 pr-2">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage className="w-full" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`currentMedications.${index}.frequency`}
                      render={({ field }) => (
                        <FormItem className="flex w-full space-y-0">
                          <div className="flex-1 pr-4">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage className="w-full" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`currentMedications.${index}.reason`}
                      render={({ field }) => (
                        <FormItem className="flex w-full space-y-0">
                          <div className="flex-1 ">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage className="w-full" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn("text-red-500 h-9 mr-4")}
                      onClick={() => {
                        medicationRemove(index);
                      }}
                    >
                      <BiX />
                    </Button>
                  </div>
                ))}
                {/* button to add new fields */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 text-white bg-slate-600"
                  onClick={() =>
                    medicationAppend({ name: "", dosage: "", frequency: "", reason: "" })
                  }
                >
                  Add New
                </Button>
              </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            class="float-end bg-teal-500 rounded-lg p-2 mt-2 font-medium text-white border shadow-md"
          >
            Update
          </Button>
        </form>
      </Form>
    </>
  );
}

export default doctorProfileSecondaryForm;
