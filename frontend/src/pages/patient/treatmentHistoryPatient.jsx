import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { Calendar } from "@/components/ui/calendar";

function TreatmentHistory() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/treatmentHistory/patient/${Cookies.get(
            "roleId"
          )}`
        );
        setReportData(response.data.tHistory);
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
      <div className="flex flex-col md:flex-row">
        <ScrollArea className="p-4 border rounded-xl h-[580px] bg-white md:w-3/4 mx-6">
          {/* Check if data has been fetched */}
          {reportData && Array.isArray(reportData) ? (
            reportData.map((report) => {
              // Assuming report.date is a string in ISO 8601 format like "2024-03-30T08:00:00.000Z"
              const dateObj = new Date(report.date);

              // Extract date components
              const year = dateObj.getFullYear();
              const month = dateObj.getMonth(); // Months are 0-indexed
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
                  <div className="mb-4 px-6 py-4 border-2 border-[#089BAB] rounded-2xl">
                    <div>
                      <div className="text-xl font-semibold">
                        {report.treatment?.name}
                      </div>
                      <div className="flex justify-between mt-6">
                        <div className="flex w-2/3">
                          <div>{report.treatment?.description}</div>
                        </div>
                        <div >
                          {!report.isComplete ? (
                            <div className="px-4 py-3 border-[#089BAB] border rounded-2xl">
                              <div className="text-xl font-semibold text-center ">
                                Next Shedule
                                <div className="mt-2 py-2 rounded-xl bg-[#FEF6ED]">
                                  <div className="mt-2 text-center text-[#089BAB] text-m">
                                    {monthName}
                                  </div>
                                  <div className=" text-center text-[#089BAB] text-md font-semibold">
                                    {dayName}
                                  </div>
                                  <div className="flex gap-4 p-4 py-2">
                                    <div>
                                      <div className="text-5xl font-medium text-slate-800">
                                        {date}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="p-2 text-lg bg-[#ffffff] rounded-lg font-medium">
                                        {formattedTime}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="px-4 py-3 border-[#fe6b54] border rounded-2xl ">
                              <div className="text-center text-[#fe6b54] text-md font-medium">
                                Treatment
                              </div>
                              <div className="text-xl font-semibold text-center text-[#fe6b54]">
                                Completed
                              </div>
                              <div className="text-lg font-medium text-center text-[#fe6b54]">On</div>
                              <div className="flex gap-4 px-2">
                                    <div>
                                      <div className="text-5xl font-medium text-[#fe6b54]">
                                        {date}
                                      </div>
                                    </div>
                                    <div className="text-right bg-[#ffffff] rounded-lg font-medium text-[#fe6b54]">
                                      <div className="text-lg ">
                                      {monthName}
                                      </div>
                                      <div className="text-xs ">
                                      {year}
                                      </div>
                                    </div>
                                  </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex ">
                        <div>
                          <div className=" text-[#089BAB] text-xs">Date</div>
                          <div className="mr-4 font-normal text-md text-slate-800">
                            {formattedDate}
                          </div>
                          <div className="mt-4">
                            {/* hello3 */}
                            </div>
                        </div>
                        <div>
                          <div className=" text-[#089BAB] text-xs">Time</div>
                          <div className="font-normal text-md text-slate-800 ">
                            {formattedTime}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 py-2 mt-10">
                        <button className=" px-3 py-3 text-[#089BAB] border border-[#089BAB] rounded-2xl hover:bg-[#089BAB] hover:text-white text-sm font-medium">
                          View
                        </button>
                        <button className="p-3 text-[#089BAB] border border-[#089BAB] rounded-2xl hover:bg-[#089BAB] hover:text-white text-sm font-medium">
                          Reshecdule
                        </button>
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
        <div className="px-6 mr-6 bg-white border md:w-1/3 rounded-xl">
          <div className="flex justify-center mt-6 text-xl font-bold">Monthly Shedule</div>
            <Calendar className="flex justify-around my-4 border border-slate-400 rounded-2xl" ></Calendar>
            <div className="flex justify-around"><div className="h-40 px-8 mr-6 bg-white border md:w-1/3 rounded-xl"></div>
            <div className="h-40 px-6 mr-6 bg-white border md:w-1/3 rounded-xl"></div></div>
            
        </div>
      </div>
    </div>
  );
}

export default TreatmentHistory;
