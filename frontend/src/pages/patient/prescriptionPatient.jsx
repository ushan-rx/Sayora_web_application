import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { useReactToPrint } from "react-to-print";
import { Separator } from "@/components/ui/separator";

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

const ReportCard = () => {
  const patId = Cookies.get("roleId"); // get the patient id from the
  const [reportData, setReportData] = useState(null);
  const [patientDetails, setPatientDetails] = useState({}); // to store patient details

  //to store requesition id
  const [selectedReportId, setSelectedReportId] = useState(null);

  const handleButtonClick = (reportId) => {
    setSelectedReportId(reportId);
    console.log(selectedReportId);
    // You can perform any other actions you need here
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Sayora Wellness Center",
  });

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/prescription/${Cookies.get("roleId")}`
        );
        setReportData(response.data.prescriptions);
        console.log(response.data);
        console.log(reportData);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchData();
  }, []);

  // get patient details from the backend
  async function getPatient(patId) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/patient/${patId}`
      );
      setPatientDetails(response.data.patient);
    } catch (error) {
      toast.error(
        "Failed to retrieve personal details. please refresh the page"
      );
      console.log(error);
    }
  }

  useEffect(() => {
    // get patient details from the backend
    getPatient(patId);
  }); // to update patient details

  return (
    <div>
      <h2 className="mx-6 my-4 text-2xl font-bold">My Prescription</h2>
      <div className="flex flex-col md:flex-row">
        <ScrollArea className="p-4 border rounded-xl h-[550px] bg-slate-300 md:w-3/5 mx-6">
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

              // Format the date and time strings
              const formattedDate = `${year}-${month}-${date}`;
              const formattedTime = `${hours}:${minutes}`;

              return (
                <div key={report._id}>
                  {/* prescription Card 1 */}
                  <div className="mb-4 px-6 py-4 border-2 border-[#089BAB] rounded-2xl bg-white">
                    <div>
                      <div className="text-xl font-semibold">
                        {report.sickness}
                      </div>
                      <div className="flex justify-between mt-6">
                        <div className="flex flex-col">
                          <div className="flex ">
                            <div className="mr-4 font-normal text-md text-slate-800">
                              {report.medications.map((medication) => (
                                <div key={medication.index}>
                                  <span className="text-black">
                                    {medication.medication + ""}
                                  </span>
                                  {/* //this measure is not defined in the report schema */}
                                </div>
                              ))}
                            </div>
                            <div className="mr-6 font-normal text-md text-slate-800">
                              {report.medications.map((medication) => (
                                <div key={medication.index}>
                                  <span className="text-black">
                                    {medication.dosage + " "}
                                  </span>{" "}
                                  {/* //this measure is not defined in the report schema */}
                                </div>
                              ))}
                            </div>
                            <div className="font-normal text-md text-slate-800 ">
                              {report.medications.map((medication) => (
                                <div key={medication.index}>
                                  <span className="text-slate-600">
                                    {medication.frequency + " "}
                                  </span>{" "}
                                  {/* //this measure is not defined in the report schema */}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-6">
                            <span className="font-semibold">
                              Insturctions :{" "}
                            </span>
                            {report.instructions}
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <button
                            className="px-4 py-2 mb-2 text-[#089BAB] border-2 border-[#089BAB] rounded-3xl hover:bg-[#089BAB] hover:text-white"
                            onClick={() => handleButtonClick(report._id)}
                          >
                            View
                          </button>
                         
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
                      <div className="">
                        <div className="ml-4">
                          {patientDetails.fName} {patientDetails.lName}
                        </div>
                        <div className="ml-4">
                          {calculateAge(patientDetails.dob)} Yrs old
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* prescription Card 1 */}
                  {/* targrt*/}
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </ScrollArea>
        <div className="mr-6 bg-white  md:w-2/5  border-2 border-[#089BAB] rounded-2xl ">
          {selectedReportId && (
            <div >
              {selectedReportId && reportData && (
                <div>
                  {reportData.map((report) => {
                    if (report._id === selectedReportId) {
                      // Assuming report.date is a string in ISO 8601 format like "2024-03-30T08:00:00.000Z"
                      const dateObj = new Date(report.date);

                      // Extract date components
                      const year = dateObj.getFullYear();
                      const month = dateObj.getMonth() + 1; // Months are 0-indexed
                      const date = dateObj.getDate();

                      // Extract time components
                      const hours = dateObj.getHours();
                      const minutes = dateObj.getMinutes();

                      // Format the date and time strings
                      const formattedDate = `${year}-${month}-${date}`;
                      const formattedTime = `${hours}:${minutes}`;

                      return (
                        <div key={report._id}>
                          {/* prescription Card 1 */}
                          <div className="px-6 py-4 m-4 mb-4 bg-white">
                            <div className="flex justify-center">
                              <img
                                className="h-16 w-15"
                                src="https://sayora.lk/wp-content/uploads/2023/04/SAYORA-LOGO-NEW.png"
                                alt=""
                              />
                              <div className="px-4">
                                <h1 className="flex px-2 pt-2">
                                  Sayora Wellness Center
                                </h1>
                                <div className="text-sm font-light">
                                  221 High Level Rd, Maharagama 10280
                                </div>
                              </div>
                            </div>
                            <div>
                              <Separator className="my-4" />
                              <div className="font-normal text-md">
                                <span className="font-semibold">Name :</span>{" "}
                                {patientDetails.fName} {patientDetails.lName}
                              </div>
                              <div className="font-normal text-md">
                                <span className="font-semibold">Age :</span>{" "}
                                {calculateAge(patientDetails.dob)} Yrs old
                              </div>
                              <div className="mt-2 font-normal text-md">
                                <span className="font-semibold">Reason :</span>{" "}
                                {report.sickness}
                              </div>
                              <div className="mt-6 font-normal text-md">
                                <span className="font-semibold">
                                  Medications :
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <div className="flex flex-col">
                                  <div className="flex ">
                                    <div className="mr-4 font-normal text-md text-slate-800">
                                      {report.medications.map((medication) => (
                                        <div key={medication.index}>
                                          <span className="text-black">
                                            {medication.medication + ""}
                                          </span>
                                          {/* //this measure is not defined in the report schema */}
                                        </div>
                                      ))}
                                    </div>
                                    <div className="mr-6 font-normal text-md text-slate-800">
                                      {report.medications.map((medication) => (
                                        <div key={medication.index}>
                                          <span className="text-black">
                                            {medication.dosage + " "}
                                          </span>{" "}
                                          {/* //this measure is not defined in the report schema */}
                                        </div>
                                      ))}
                                    </div>
                                    <div className="font-normal text-md text-slate-800 ">
                                      {report.medications.map((medication) => (
                                        <div key={medication.index}>
                                          <span className="text-slate-600">
                                            {medication.frequency + " "}
                                          </span>{" "}
                                          {/* //this measure is not defined in the report schema */}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="mt-6">
                                    <span className="font-semibold">
                                      Insturctions :{" "}
                                    </span>
                                    {report.instructions}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="grid content-end h-16 grid-cols-3 ">
                              <div>
                                <div className="flex justify-between">
                                  <div>
                                    <div className=" text-[#089BAB] text-xs">
                                      Date
                                    </div>
                                    <div className="mr-4 font-normal text-md text-slate-800">
                                      {formattedDate}
                                    </div>
                                  </div>
                                  <div>
                                    <div className=" text-[#089BAB] text-xs">
                                      Time
                                    </div>
                                    <div className="font-normal text-md text-slate-800 ">
                                      {formattedTime}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <div className="ml-4"></div>
                                <div className="ml-4"></div>
                              </div>
                              <div className="">
                                <div className="ml-4">{report.doctorId}</div>
                                <div className="ml-4"></div>
                              </div>
                            </div>
                            <button
                            className="px-4 py-2 mt-8 text-[#089BAB] border-2 border-[#089BAB] rounded-3xl hover:bg-[#089BAB] hover:text-white flex justify-center w-full"
                            onClick={handlePrint}
                          >
                            Download
                          </button>
                          </div>
                          {/* prescription Card 1 */}
                          <div className="hidden">
                            <div ref={componentRef}>
                              <br />
                              <div className="mx-6 px-6 py-4 border-2 border-[#089BAB] rounded-2xl ">
                                <div>
                                  <div className="flex justify-center">
                                    <img
                                      className="h-28 w-28 "
                                      src="https://sayora.lk/wp-content/uploads/2023/04/SAYORA-LOGO-NEW.png"
                                      alt=""
                                    />
                                    <div className="px-8">
                                      <h1 className="flex px-4 pt-4">
                                        Sayora Wellness center{" "}
                                      </h1>
                                      <div className="text-sm font-light">
                                        221 High Level Rd, Maharagama 10280
                                      </div>
                                      <div className="text-sm font-light text-center">
                                        info@sayora.lk / +94719626625
                                      </div>
                                      <div className="text-sm font-light text-center">
                                        Sun to Fri 8 am to 6 pm
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <Separator className="my-8" />
                                    <div className="font-normal text-md">
                                      <span className="font-semibold">
                                        Name :
                                      </span>{" "}
                                      {patientDetails.fName}{" "}
                                      {patientDetails.lName}
                                    </div>
                                    <div className="font-normal text-md">
                                      <span className="font-semibold">
                                        Age :
                                      </span>{" "}
                                      {calculateAge(patientDetails.dob)} Yrs old
                                    </div>
                                    <div className="mt-2 font-normal text-md">
                                      <span className="font-semibold">
                                        Reason :
                                      </span>{" "}
                                      {report.sickness}
                                    </div>
                                    <div className="mt-6 font-normal text-md">
                                      <span className="font-semibold">
                                        Medications :
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <div className="flex flex-col">
                                        <div className="flex ">
                                          <div className="mr-4 font-normal text-md text-slate-800">
                                            {report.medications.map(
                                              (medication) => (
                                                <div key={medication.index}>
                                                  <span className="text-black">
                                                    {medication.medication + ""}
                                                  </span>
                                                  {/* //this measure is not defined in the report schema */}
                                                </div>
                                              )
                                            )}
                                          </div>
                                          <div className="mr-6 font-normal text-md text-slate-800">
                                            {report.medications.map(
                                              (medication) => (
                                                <div key={medication.index}>
                                                  <span className="text-black">
                                                    {medication.dosage + " "}
                                                  </span>{" "}
                                                  {/* //this measure is not defined in the report schema */}
                                                </div>
                                              )
                                            )}
                                          </div>
                                          <div className="font-normal text-md text-slate-800 ">
                                            {report.medications.map(
                                              (medication) => (
                                                <div key={medication.index}>
                                                  <span className="text-slate-600">
                                                    {medication.frequency + " "}
                                                  </span>{" "}
                                                  {/* //this measure is not defined in the report schema */}
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                        <div className="mt-6">
                                          <span className="font-semibold">
                                            Insturctions :{" "}
                                          </span>
                                          {report.instructions}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-between mt-6">
                                  <div className="flex ">
                                    <div>
                                      <div className=" text-[#089BAB] text-xs">
                                        Date
                                      </div>
                                      <div className="mr-4 font-normal text-md text-slate-800">
                                        {formattedDate}
                                      </div>
                                    </div>
                                    <div>
                                      <div className=" text-[#089BAB] text-xs">
                                        Time
                                      </div>
                                      <div className="font-normal text-md text-slate-800 ">
                                        {formattedTime}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="">
                                    <div className="ml-4">
                                      {patientDetails.fName}{" "}
                                      {patientDetails.lName}
                                    </div>
                                    <div className="ml-4">
                                      {calculateAge(patientDetails.dob)} Yrs old
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportCard;

// note -stop working on this page until filter by patient id
