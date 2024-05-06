import React, { useEffect, useState, PureComponent } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";

//calnder
import { Calendar } from "@/components/ui/calendar";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import axios from "axios";
import Cookies from "js-cookie";

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

// Function to count occurrences of test names and create an array of objects with name and uv properties
function countTestNames(testData) {
  const testNameCounts = [];
  const countMap = {};
  testData.forEach((test) => {
    const testName = test.treatment?.name;
    if (countMap[testName]) {
      countMap[testName]++;
    } else {
      countMap[testName] = 1;
    }
  });

  for (const testName in countMap) {
    testNameCounts.push({ name: testName, uv: countMap[testName] });
  }

  return testNameCounts;
}

function getMonthAbbreviation(monthIndex) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthIndex];
}

function overview() {
  const patId = Cookies.get("roleId"); // get the patient id from the
  const [reportData, setReportData] = useState([]);
  const [totalReportCount, setTotalReportCount] = useState(0);
  const [patientDetails, setPatientDetails] = useState({}); // to store patient details
  const [treatmentHistory, setTreatmentHistory] = useState([]);
  const [nextTreatment, setNextTreatment] = useState(null);
  const [updateData, setUpdateData] = useState([]);
  const [totalUpdatesCount, setTotalUpdatesCount] = useState(0);

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

  const renderVitals = () => {
    if (patientDetails.vitals && patientDetails.vitals.length > 0) {
      return patientDetails.vitals.map((vital, index) => (
        <div key={index}>
          <span className="mx-5">{vital.height}</span>
          <span className="mx-5">{vital.weight}</span>
          {/* Add other vital information as needed */}
        </div>
      ));
    } else {
      return <p>No vitals recorded.</p>;
    }
  };

  useEffect(() => {
    // Fetch medical reports from backend API
    const fetchTreatmentHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/treatmentHistory/patient/${patId}`
        );
        setTreatmentHistory(response.data.tHistory);

        const testNameCounts = countTestNames(response.data.tHistory);
        setReportData(countTestNames(response.data.tHistory));

        const totalCount = response.data.tHistory.length;
        setTotalReportCount(totalCount);

        // Find the next treatment
        const currentDate = new Date();
        const futureTreatments = response.data.tHistory.filter(
          (treatment) => new Date(treatment.date) > currentDate
        );
        const sortedTreatments = futureTreatments.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setNextTreatment(sortedTreatments[0]);

        console.log(testNameCounts);
        console.log(response.data);
        console.log(sortedTreatments[0]);
      } catch (error) {
        console.error("Error fetching medical reports:", error);
      }
    };

    fetchTreatmentHistory();
  }, [patId]); // Fetch reports when patient ID changes

  useEffect(() => {
    // Fetch medical reports from backend API
    const fetchMedicalReports = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/dailyupdate/${patId}`
        );
        setUpdateData(response.data.dailyUpdates);

        const totalCount = response.data.dailyUpdates.length;
        setTotalUpdatesCount(totalCount);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching medical reports:", error);
      }
    };

    fetchMedicalReports();
  }, [patId]); // Fetch reports when patient ID changes

  return (
    <ScrollArea className="h-screen">
      <div>
        <div className="flex flex-col md:flex-row">
          <div className="bg-white md:w-3/5">
            <div className="flex flex-col justify-center gap-4 mt-6 ml-2 md:flex-row">
              {/* Square Card 1 */}
              <div className="px-4 py-4 border-[#FEAD54] border-l-4 border-t-2  rounded-2xl shadow-md hover:bg-[#ecd4b9]">
                <div className="flex justify-between">
                  <div>
                    <div className="text-xl text-center text-slate-800">
                      Daily Uploads
                    </div>
                    <br />
                    <div className="text-md text-slate-800">Last Update :</div>
                    {/* <div className="text-sm text-slate-600">today 02:00pm</div> */}
                  </div>
                  <div className="text-right ">
                    <div className="ml-6 text-3xl font-medoum text-slate-600">
                      {totalUpdatesCount}
                    </div>
                    <div className="ml-6 text-sm text-center text-slate-600">
                      reports
                    </div>
                  </div>
                </div>
              </div>
              {/* Square Card 2 */}
              <div className="px-6 py-4 border-[#FD988B] border-l-4 border-t-2  rounded-2xl shadow-md hover:bg-[#FD988B]">
                <div className="flex justify-between">
                  <div>
                    <div className="text-xl text-center text-slate-800">
                      Treatments
                    </div>
                    <br />
                    <div className="text-md text-slate-800">
                      Count : {totalReportCount}
                    </div>

                    {nextTreatment && (
                      <div className="next-treatment">
                        <div className="text-sm text-slate-600">
                          Last Update{" "}
                          {new Date(nextTreatment.date).toLocaleDateString()}
                        </div>
                        {/* Add more properties as needed */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Square Card 3 */}
              <div className="px-6 py-4 border-[#089BAB] border-l-4 border-t-2 rounded-2xl shadow-md hover:bg-[#5fd7e4]">
                <div className="flex justify-between">
                  <div>
                    <div className="text-xl text-center text-slate-800">
                      Appoinment
                    </div>
                    <br />
                    <div className="text-md text-slate-800">Last Update :</div>
                    {/* <div className="text-sm text-slate-600">today 02:00pm</div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* left below chart part*/}
            <div className="pt-2 flex-col mx-6 mt-6 border-t-4 border-l-4 h-[450px] border-slate-300 rounded-2xl shadow-md">
              <h2 className="mt-2 text-xl font-bold text-center text-[#2d737b]">
                Nearest Treatment
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={reportData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <ScrollArea className="px-4 my-6 bg-white border border-slate-400 rounded-2xl md:w-1/4 h-[605px]">
            <div>
              <h2 className="mt-2 text-xl font-bold text-center text-[#2d737b]">
                Nearest Treatment
              </h2>
              <div className="grid grid-cols-1 gap-2">
                <Calendar className="mt-4 mb-3 border border-slate-400 rounded-2xl"></Calendar>
                {/* Square Card 1 */}
                {nextTreatment && (
                  <div className="next-treatment">
                    {/* <p>Doctor ID: {nextTreatment.doctorId}</p>
                    <p>Appointment ID: {nextTreatment.appointmentId}</p> */}

                    {/* Add more properties as needed */}
                    <div className="pl-6 pr-4 py-4 bg-[#089BAB] border border-gray-300 rounded-2xl hover:bg-[#4db7c2]">
                      <div>
                        <div className="flex justify-between">
                          <div>
                            <div className="text-center text-white text-m">
                              {getMonthAbbreviation(
                                new Date(nextTreatment.date).getMonth()
                              )}
                            </div>
                            <div className="text-5xl font-bold text-white">
                              {new Date(nextTreatment.date).getDate()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-white">
                              {nextTreatment.doctorId}
                            </div>
                            <div className="mb-4 text-xs text-white"></div>
                            <div className="p-2 text-sm bg-[#e0eff1] rounded-lg text-center">
                              {nextTreatment.isComplete
                                ? "Completed"
                                : "Not completed"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 font-semibold text-white text-md">
                        {nextTreatment.treatment?.name}
                      </div>
                      <div className="mb-4 text-sm text-white ">
                        Rs. {nextTreatment.treatment?.price}
                      </div>
                    </div>
                  </div>
                )}
                {/* Square Card 2 */}
                {/* <div className="p-4 mb-4 bg-white border border-gray-300 rounded-2xl">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Sep</div>
                      <div className="text-4xl font-bold">15</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-700">
                        Dr. Jane Smith
                      </div>
                      <div className="text-lg">2:30 PM</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </ScrollArea>

          <div className="object-center p-4 bg-white md:w-1/4">
            <div className="flex-row justify-center ">
              <div className="flex-col my-2 border border-slate-400 rounded-2xl">
                <div class="w-24 h-24 mt-2 bg-indigo-100 mx-auto rounded-full shadow-2xl flex items-center justify-center text-indigo-500">
                  <img
                    src={patientDetails.profilePic}
                    alt=""
                    srcset=""
                    className="rounded-full"
                  />
                </div>
                <div className="mx-2 mt-1 text-center text-slate-600">
                  {patientDetails.fName && (
                    <span className="text-black capitalize">
                      {" "}
                      {patientDetails.fName}
                    </span>
                  )}
                  {patientDetails.lName && (
                    <span className="text-black capitalize">
                      {" "}
                      {patientDetails.lName}
                    </span>
                  )}
                </div>
                <div className="mx-2 text-sm text-center text-slate-600">
                  {patientDetails.dob && (
                    <span>{calculateAge(patientDetails.dob)} Yrs old</span>
                  )}
                </div>
                <div className="mx-6 mt-2 text-xs center text- text-[#089BAB]">
                  <span className="mr-4">BloodGroup</span>
                  <span className="mr-5">Height</span>
                  <span className="">Weight</span>
                </div>
                <div className="flex mx-6 mb-3 text-sm text-center text-slate-">
                  <span className="mx-6">{patientDetails.bloodGroup}</span>
                  {renderVitals()}
                </div>
              </div>
              <div className="flex-col my-4 border border-slate-400 rounded-2xl h-[380px]">
                <h2 className="p-4 text-xl font-bold text-[#089BAB] mb-28">
                  Notification
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center text-3xl text-[#089BAB] ">
                    {" "}
                    <HiOutlineDocumentSearch />
                  </div>

                  <div className=" flex justify-center text-[#089BAB]">
                    No Notifications
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default overview;
