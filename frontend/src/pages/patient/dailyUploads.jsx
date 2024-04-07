import React from "react";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ScrollArea } from "@/components/ui/scroll-area";
import Cookies from "js-cookie";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

//form1 schema
const formSchema = z.object({
  reportName: z.string().min(2, {
    message: "reportName must be at least 2 characters.",
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
      username: "",
    },
  });
  
  //Define a submit handler.
  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      // Send the form data to the backend
      data.patientId = patId;
      const response = await axios.post(
        `http://localhost:5000/api/v1/dailyupdate`,
        data
      );
      console.log(response.data);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="reportName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>reportName</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} class="float-end bg-teal-500 rounded-lg p-2 mt-2 font-medium text-white border shadow-md">Submit</Button>
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
