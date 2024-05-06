import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

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

import { uploadFile } from "@/utils/pdfUpload";
import { uploadImage } from "@/utils/imageUpload";

//form1 schema
const formSchema = z.object({
  testName: z.string().min(2, {
    message: "reportName must be at least 2 characters.",
  }),
});

function Requesition() {
  const patId = Cookies.get("roleId"); // get the patient id from the
  const [reportData, setReportData] = useState(null);

  //to hold the form submit state
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  //to store requesition id
  const [selectedReportId, setSelectedReportId] = useState(null);

  const handleButtonClick = (reportId) => {
    setSelectedReportId(reportId);
    console.log(selectedReportId);
    // You can perform any other actions you need here
  };

 // console.log(selectedReportId);

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  //form default values with zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportName: "",
      temperature: 0,
    },
  });

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/requesition/patient/${Cookies.get(
            "roleId"
          )}`
        );
        setReportData(response.data.requesitions);
        console.log(response.data);
        //console.log(reportData);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchData();
  }, []);

  //Define a submit handler.
  async function onSubmit(data) {
    setIsSubmitting(true);
    let fileURL = ""; // profule picture url

    if (file) {
      // if there is an image input
      fileURL = await uploadImage(file); // upload the image to the firebase storage and get the url
      data = { ...data, documentURL: fileURL }; // add image url to the updated data
    }


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
      await axios.post(`http://localhost:5000/api/v1/report`, { ...data });

      if (selectedReportId) {
        const requestData = selectedReportId;
        

        console.log(requestData);

        await axios.put(
          `http://localhost:5000/api/v1/requesition/${requestData}`
          
        );
      }
    } catch (error) {
      console.error("Failed to submit the form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="mx-6 my-4 text-2xl font-bold">My Requesition</h2>
      <div className="flex flex-col md:flex-row">
        <ScrollArea className="p-4 border rounded-xl h-[550px] bg-slate-300 md:w-3/5 mx-6">
          {/* Check if data has been fetched */}
          {reportData && Array.isArray(reportData) ? (
            reportData.map((report) => {
              // Assuming report.date is a string in ISO 8601 format like "2024-03-30T08:00:00.000Z"
              const dateObj = new Date(report.reqDate);

              // Extract date components
              const year = dateObj.getFullYear();
              const month = dateObj.getMonth() + 1; // Months are 0-indexed
              const date = dateObj.getDate();

              // Extract time components
              let hours = dateObj.getHours();
              const minutes = dateObj.getMinutes();

                            // Determine AM or PM
                            const amOrPm = hours >= 12 ? "pm" : "am";

                            // Convert to 12-hour format
                            if (hours > 12) {
                              hours -= 12;
                            } else if (hours === 0) {
                              hours = 12; // 0 hour (midnight) is represented as 12 AM
                            }
              
                            // Format the date and time strings
                            const formattedDate = `${year}-${month}-${date}`;
                            const formattedTime = `${hours
                              .toString()
                              .padStart(2, "0")}:${minutes
                              .toString()
                              .padStart(2, "0")} ${amOrPm}`;
              
                            // Get month name
                            const monthNames = [
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                              "December",
                            ];
                            const monthName = monthNames[month];
              
                            // Get day name
                            const dayNames = [
                              "Sunday",
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                              "Saturday",
                            ];
                            const dayName = dayNames[dateObj.getDay()];

              return (
                <div key={report._id}>
                  {/* prescription Card 1 */}
                  <div className="mb-4 px-6 py-4 border-2 border-[#089BAB] rounded-2xl bg-white">
                    <div>
                      <div className="text-xl font-semibold">
                        Report Name - {report.testName}
                      </div>
                      <div className="flex justify-between mt-6">
                        <div className="flex flex-col">
                          <div className="mt-6">
                            <span className="font-semibold">
                              Insturctions :{" "}
                            </span>
                            {report.instructions}
                          </div>
                        </div>
                        <div className="flex flex-col">
                            {!report.is_uploaded ? (<button
                            className="px-4 py-2 mb-2 text-[#089BAB] border-2 border-[#089BAB] rounded-3xl hover:bg-[#089BAB] hover:text-white"
                            onClick={() => handleButtonClick(report._id)}
                          >
                            Upload
                          </button>): (<div><button
                            className="px-4 py-2 mb-2  text-[#089BAB] border-2 border-[#089BAB] rounded-3xl hover:bg-[#089BAB] hover:text-white"
                            onClick={() => handleButtonClick(report._id)}
                          >
                            Re-Upload
                          </button>
                          <div className="text-sm font-light">already uploaded</div>
                          <div className="ml-4 font-light">{formattedDate}</div></div>)}
                          
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <div className="flex ">
                        <div>
                          <div className=" text-[#089BAB] text-xs">Date</div>
                          <div className="mr-4 font-normal text-md text-slate-800">
                            {formattedDate}
                          </div>
                        </div>
                        <div>
                          <div className=" text-[#089BAB] text-xs">Time</div>
                          <div className="font-normal text-md text-slate-800 ">
                            {formattedTime}
                          </div>
                        </div>
                      </div>
                      {/* <div className="m-4">{patientDetails.fName}</div> */}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </ScrollArea>
        <div className="mr-6 bg-white border-2 md:w-2/5 rounded-xl border-[#089BAB]">
          {selectedReportId && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                
                <div className="p-4">
                  {/* report name */}
                  <h2 className="mb-6 text-lg font-semibold text-center">Upload Your Report</h2>
                  <FormField
                    control={form.control}
                    name="testName"
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
                  <br />
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
                <br />
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

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    class="float-end bg-teal-500 rounded-lg p-2 mt-2 font-medium text-white border shadow-md"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Requesition;
