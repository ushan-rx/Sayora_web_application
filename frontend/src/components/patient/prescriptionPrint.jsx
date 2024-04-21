import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ReportCardPrint = () => {
  const patId = Cookies.get("roleId"); // get the patient id from the
  const [reportData, setReportData] = useState(null);
  const [patientDetails, setPatientDetails] = useState({}); // to store patient details

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/prescription/${Cookies.get("roleId")}`
        );
        setReportData(response.data.prescriptions);
        //console.log(response.data);
        //console.log(reportData);
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
        <ScrollArea className="p-4 border rounded-xl h-[580px] bg-white md:w-3/4 mx-6">
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

                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </ScrollArea>
        <div className="mr-6 bg-white border md:w-1/3 rounded-xl"></div>
      </div>
    </div>
  );
};

export default ReportCardPrint;

// note -stop working on this page until filter by patient id
