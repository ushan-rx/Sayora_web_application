import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { BiX } from "react-icons/bi";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

//view pop-up import from shudcn
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { usePatientStore } from "@/store/patient.store";

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const currentDate = new Date();

  // Calculate the difference in years
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Adjust age if the current date is before the birth month and day
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

const dailyUpdateView = () => {
    const {patientId} = usePatientStore(state => ({
        patientId: state.patient.patientId,
    }));
  const [reportData, setReportData] = useState(null);
  const [patientDetails, setPatientDetails] = useState({}); // to store patient details
  

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/dailyupdate/${patientId}`
        );
        setReportData(response.data.dailyUpdates);
        console.log(response.data);
        console.log(reportData);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="m-4 text-2xl font-bold">Daily Updates</h2>
      <Tabs defaultValue="dailyupload">
        {/* <TabsList className="flex p-4 mx-6"> */}
          {/* <TabsTrigger value="dailyupload">Daily Uploads</TabsTrigger>
          <TabsTrigger value="report">Medical Reports</TabsTrigger> */}
        {/* </TabsList> */}
        <TabsContent value="dailyupload">
          <ScrollArea className="p-4 mx-20 border rounded-xl h-[65vh]">
            {/* Check if data has been fetched */}

            {reportData && Array.isArray(reportData) ? (
              reportData.map((report) => {
                // Assuming report.date is a string in ISO 8601 format like "2024-03-30T08:00:00.000Z"
                const dateObj = new Date(report.date);

                // Extract date components
                const year = dateObj.getFullYear();
                const month = dateObj.getMonth() + 1; // Months are 0-indexed
                const date = dateObj.getDate();

                // Extract time components
                const hours = dateObj.getHours();
                const minutes = dateObj.getMinutes();
                const seconds = dateObj.getSeconds();

                // Format the date and time strings
                const formattedDate = `${year}-${month}-${date}`;
                const formattedTime = `${hours}:${minutes}:${seconds}`;

                return (
                  <div key={report._id}>
                    {/* report Card 1 */}
                    <div className="mb-4 px-6 py-4 border border-[#089BAB] rounded-2xl">
                      <div className="flex justify-between"><h2 className="mb-2 text-xl font-bold ">
                        {report.reportName}
                      </h2></div>
                      
                      <div className="flex justify-between">
                        <div>
                          <div className=" text-slate-600 font-bold text-md">Date</div>
                          <div className="font-normal text-md text-slate-800 ">
                            {formattedDate}
                          </div>
                          <div className=" text-slate-600 font-bold text-md">Time</div>
                          <div className="font-normal text-md text-slate-800 ">
                            {formattedTime}
                          </div>
                        </div>
                        <div className="w-[400px] text-center desktop-view-only">
                          <h2 className="text-xl pb-4 font-bold">Summery</h2>
                          <div className=" text-slate-600 font-bold text-m">
                            Temperature :
                            <span className="text-black font-normal">
                              {report.temperature}
                            </span>
                          </div>
                          <div className=" text-slate-600 font-bold text-m">
                            Syptomps :
                            <span className="text-black font-normal">
                              {report.symptoms + " "}
                            </span>
                          </div>
                          <div className=" text-slate-600 font-bold text-m">
                            Medication :
                            {report.medications.map((medication) => (
                              <div key={medication.index}>
                                <span className="text-black font-normal">
                                  {medication.type + " - "}
                                </span>
                                <span className="text-black font-normal">
                                  {medication.messure + " "}
                                </span>{" "}
                                {/* //this measure is not defined in the report schema */}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <Dialog>
                            <DialogTrigger className="px-4 py-2 mb-2 text-[#089BAB]  border-2 border-[#089BAB] rounded-3xl hover:bg-[#089BAB] hover:text-white">
                              View
                            </DialogTrigger>
                            <DialogContent className="w-[50vw]">
                              <div className="popup">
                                <div className="popup-content">
                                  <div className="">
                                    <h2 className="flex justify-center mb-2 text-xl font-bold">
                                      {report.reportName}
                                    </h2>
                                    <p> <span className="font-bold text-slate-600"> Date:</span> {formattedDate}</p>
                                    <p><span className="font-bold text-slate-600"> Time:</span> {formattedTime}</p>
                                    <div className=" text-slate-600 font-bold text-m">
                                      Temperature :
                                      <span className="text-black font-normal">
                                        {report.temperature}
                                      </span>
                                    </div>
                                    <div className=" text-slate-600 font-bold text-m">
                                      Syptomps :
                                      <span className="text-black font-normal">
                                        {report.symptoms + " "}
                                      </span>
                                    </div>
                                    <p className="font-bold text-slate-600">
                                      Additional Notes: 
                                      <span className="text-black font-normal">
                                        {report.additionalNotes}
                                      </span>
                                    </p>
                                    <div className="flex justify-between mt-6">
                                        <div className="flex ">
                                            <div className=" text-slate-600 font-bold text-xs">
                                                Date
                                            </div>
                                            <div className="mr-4 font-normal text-md text-slate-800">
                                                {formattedDate}
                                            </div>
                                            <div className=" text-slate-600 font-bold text-xs">
                                                Time
                                            </div>
                                            <div className="font-normal text-md text-slate-800 ">
                                                {formattedTime}
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="ml-4">
                                            {patientDetails.fName} {patientDetails.lName}
                                            </div>
                                        </div>
                                        </div>
                                    <div class="w-64 h-64 mt-2  flex items-center justify-center text-indigo-500 border rounded-xl">
                                      <img
                                        src={report.documentURL}
                                        alt=""
                                        srcset=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="report">
          hello
          {patientDetails.testName}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default dailyUpdateView;

// note -stop working on this page until filter by patient id
