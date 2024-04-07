import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import ReportDetailsPopup from "./reportDetailsPopup";

//view pop-up import from shudcn
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ReportCard = () => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/dailyupdate/${Cookies.get("roleId")}`
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
      <h2 className="m-4 text-2xl font-bold">My Records</h2>
      <ScrollArea className="p-4 mx-20 border rounded-xl h-[580px]">
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
                  <div className="flex justify-between">
                    <div>
                      <h2 className="mb-2 text-xl font-bold ">
                        {report.reportName}
                      </h2>
                      <div className=" text-[#089BAB] text-m">Date</div>
                      <div className="font-normal text-md text-slate-800 ">
                        {formattedDate}
                      </div>
                      <div className=" text-[#089BAB] text-m">Time</div>
                      <div className="font-normal text-md text-slate-800 ">
                        {formattedTime}
                      </div>
                    </div>
                    <div className="w-[400px] text-center desktop-view-only">
                      <h2 className="text-xl font-medium ">Summery</h2>
                      <div className=" text-[#089BAB] text-m">
                        Temperature :
                        <span className="text-black">{report.temperature}</span>
                      </div>
                      <div className=" text-[#089BAB] text-m">
                        Syptomps :
                        <span className="text-black">
                          {report.symptoms + " "}
                        </span>
                      </div>
                      <div className=" text-[#089BAB] text-m">
                        Medication :
                        {report.medications.map((medication) => (
                          <div key={medication.index}>
                            <span className="text-black">
                              {medication.type + " "}
                            </span>
                            <span className="text-black">
                              {medication.measure + " "}
                            </span>{" "}
                            {/* //this measure is not defined in the report schema */}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <Dialog>
                        <DialogTrigger className="px-4 py-2 mb-2 text-white bg-blue-500 rounded-2xl">
                          View
                        </DialogTrigger>
                        <DialogContent>
                          <div className="popup">
                            <div className="popup-content">
                              <h2 className="mb-2 text-xl font-bold ">
                                {report.reportName}
                              </h2>
                              <p>Date: {formattedDate}</p>
                              <p>Time: {formattedTime}</p>
                              <div className=" text-[#089BAB] text-m">
                                Temperature :
                                <span className="text-black">
                                  {report.temperature}
                                </span>
                              </div>
                              <div className=" text-[#089BAB] text-m">
                                Syptomps :
                                <span className="text-black">
                                  {report.symptoms + " "}
                                </span>
                              </div>
                              <p>Additional Notes: {report.additionalNotes}</p>
                              <p>Time: {formattedTime}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <div></div>
                      <button className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-2xl">
                        Download
                      </button>
                      <div className="px-2 text-md text-red">Status</div>
                      <div className="px-2 mb-4 text-xs text-red">
                        {report.status}
                      </div>
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
    </div>
  );
};

export default ReportCard;



// note -stop working on this page until filter by patient id