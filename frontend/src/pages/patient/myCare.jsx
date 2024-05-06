import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect, PureComponent } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PatientProfileSecondaryForm from "@/components/patient/patientProfileSecondaryForm";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
//import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useRef } from "react";
import generatePDF from "react-to-pdf";

// Function to count occurrences of test names and create an array of objects with name and uv properties
function countTestNames(testData) {
  const testNameCounts = [];
  const countMap = {};
  testData.forEach((test) => {
    const testName = test.testName;
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

const MyCareProfile = () => {
  const patId = Cookies.get("roleId"); // get the patient id from the
  //console.log(patId);
  const [reportData, setReportData] = useState([]);
  const [patientDetails, setPatientDetails] = useState({}); // to store patient details

  const [medicalReports, setMedicalReports] = useState(null);
  const [treatmentHistory, setTreatmentHistory] = useState([]);

  const targetRef = useRef();

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

  useEffect(() => {
    // get patient details from the backend
    getPatient(patId);
  }); // to update patient details

  const renderVitals = () => {
    if (patientDetails.vitals && patientDetails.vitals.length > 0) {
      return patientDetails.vitals.map((vital, index) => (
        <div key={index}>
          <span className="mr-6">{vital.height}cm</span>
          <span className="mr-5">{vital.weight}kg</span>
          {/* Add other vital information as needed */}
        </div>
      ));
    } else {
      return <p>No vitals recorded.</p>;
    }
  };

  const renderAllergies = () => {
    if (patientDetails.allergies && patientDetails.allergies.length > 0) {
      return patientDetails.allergies.map((allergies, index) => (
        <div key={index}>
          <span className="mr-6">{allergies}</span>
        </div>
      ));
    } else {
      return <p>No vitals recorded.</p>;
    }
  };

  const renderCurrentMedications = () => {
    if (
      patientDetails.currentMedications &&
      patientDetails.currentMedications.length > 0
    ) {
      return patientDetails.currentMedications.map(
        (currentMedications, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <div>{currentMedications.name}</div>
              <div>{currentMedications.dosage}</div>
              <div>{currentMedications.frequency}</div>
              <div className="font-light">{currentMedications.reason}</div>
            </div>
          </div>
        )
      );
    } else {
      return <p>No vitals recorded.</p>;
    }
  };

  const familyHistory = () => {
    if (
      patientDetails.familyHistory &&
      patientDetails.familyHistory.length > 0
    ) {
      return patientDetails.familyHistory.map((familyHistory, index) => (
        <div key={index}>
          <div className="flex justify-between gap-14">
            <div>{familyHistory.name}</div>
            <div>{familyHistory.relationship}</div>
          </div>
        </div>
      ));
    } else {
      return <p>No vitals recorded.</p>;
    }
  };

  const surgicalProcedures = () => {
    if (
      patientDetails.surgicalProcedures &&
      patientDetails.surgicalProcedures.length > 0
    ) {
      return patientDetails.surgicalProcedures.map(
        (surgicalProcedure, index) => {
          // Parse the date string
          const dateObj = new Date(surgicalProcedure.date);

          // Extract date, month, and year
          const day = dateObj.getDate();
          const month = dateObj.getMonth() + 1; // Months are zero-based
          const year = dateObj.getFullYear();

          // Format the date as "dd-mm-yyyy"
          const formattedDate = `${day.toString().padStart(2, "0")}-${month
            .toString()
            .padStart(2, "0")}-${year}`;

          return (
            <div key={index}>
              <div className="flex justify-between gap-4">
                <div>{surgicalProcedure.name}</div>
                <div>{formattedDate}</div>
              </div>
            </div>
          );
        }
      );
    } else {
      return <p>No surgical procedures recorded.</p>;
    }
  };

  const renderVitals2 = () => {
    if (patientDetails.vitals && patientDetails.vitals.length > 0) {
      return patientDetails.vitals.map((vital, index) => (
        <div key={index} className="flex flex-col ">
          <div className="flex justify-between mr-10">
            <div className="font-medium capitalize">Height :</div>{" "}
            <div>{vital.height}cm</div>{" "}
          </div>
          <div className="flex justify-between mr-10 ">
            {" "}
            <div className="font-medium capitalize">weight :</div>{" "}
            <div>{vital.weight}kg</div>{" "}
          </div>
          <div className="flex justify-between mr-10">
            {" "}
            <div className="font-medium capitalize">temperature :</div>{" "}
            <div>{vital.temperature}c</div>{" "}
          </div>
          <div className="flex justify-between mr-10">
            {" "}
            <div className="font-medium capitalize">blood Pressure :</div>{" "}
            <div className="hidden-space"></div>{" "}
            <div>{vital.bloodPressure}Hgmm</div>{" "}
          </div>
          <div className="flex justify-between mr-10">
            {" "}
            <div className="font-medium capitalize">pulse Rate :</div>{" "}
            <div>{vital.pulseRate}bpm</div>{" "}
          </div>
          <div className="flex justify-between mr-10">
            {" "}
            <div className="font-medium capitalize">
              oxygen Saturation :
            </div>{" "}
            <div>{vital.oxygenSaturation}</div>{" "}
          </div>
          {/* Add other vital information as needed */}
        </div>
      ));
      div;
    } else {
      return <p>No vitals recorded.</p>;
    }
  };

  const renderVitals3 = () => {
    if (patientDetails.vitals && patientDetails.vitals.length > 0) {
      return (
        <div>
          {patientDetails.vitals.map((vital, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between mr-10">
                <div>Last Check Date:</div>
                <div className="text-[#089BAB]">
                  {new Date(vital.checkdate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return <p>No vitals recorded.</p>;
    }
  };

  const handlePDFGeneration = () => {
    // Check if the image is loaded before generating PDF
    if (targetRef.current.querySelector("img").complete) {
      generatePDF(targetRef, { filename: "page.pdf" });
    } else {
      toast.error("Image is still loading. Please wait and try again.");
    }
  };

  const changeSecondaryState = (value) => {
    if (value) {
      toast.success("Profile details updated successfully");
    } else {
      toast.error("Failed to update Profile details");
    }
    setIsSecondarySubmitted(!isSecondarySubmitted); // to update doctor details
  };

  const testData = []; // Replace [...] with your actual test data array
  //testNameCounts = countTestNames(testData);

  useEffect(() => {
    // Fetch medical reports from backend API
    const fetchMedicalReports = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/report/patient/${patId}`
        );
        setMedicalReports(response.data);
        const testNameCounts = countTestNames(response.data);
        setReportData(countTestNames(response.data));
        console.log(testNameCounts);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching medical reports:", error);
      }
    };

    fetchMedicalReports();
  }, [patId]); // Fetch reports when patient ID changes

  useEffect(() => {
    // Fetch medical reports from backend API
    const fetchTreatmentHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/treatmentHistory/patient/${patId}`
        );
        setTreatmentHistory(response.data.tHistory);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching medical reports:", error);
      }
    };

    fetchTreatmentHistory();
  }, [patId]); // Fetch reports when patient ID changes

  return (
    <div>
      <Tabs defaultValue="mycare" className="pt-4">
        <TabsList className="flex p-4 mx-6">
          <TabsTrigger value="mycare">My Care Profile</TabsTrigger>
          <TabsTrigger value="mycareupdate">Update Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="mycare">
          <div>
            <ScrollArea className="h-[480px] p-2 m-4 border border-slate-400 rounded-2xl">
              <div ref={targetRef}>
                <div className="flex-row justify-center border-2 border-[#089BAB] rounded-2xl p-4">
                  <div className="flex-col ">
                    <div class="w-24 h-24  bg-red-500 mx-auto rounded-full shadow-2xl flex items-center justify-center">
                      <img
                        src={patientDetails.profilePic}
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
                    <div className="mx-6 mt-2 text-xs text-center text-[#089BAB]">
                      <span className="mr-5">BloodGroup</span>
                      <span className="mr-7">Height</span>
                      <span className="">Weight</span>
                    </div>
                    <div className="flex justify-center mx-6 mb-3 text-sm text-slate-">
                      <span className="mx-10">{patientDetails.bloodGroup}</span>
                      {renderVitals()}
                    </div>
                    <Separator className="mb-4" />

                    {/* part 2 */}
                    <div className="flex justify-between">
                      <div>
                        <div className="flex mx-6">
                          <div className="text-[#089BAB] text-lg mr-4">
                            Allergies :{" "}
                          </div>
                          <div>{renderAllergies()}</div>
                        </div>
                        <Separator className="my-4" />

                        {/* current medication */}
                        <div className="flex mx-6">
                          <div className="text-[#089BAB] text-lg mr-4">
                            Medications :{" "}
                          </div>
                          <div>
                            <div className=" mt-1 text-sm center text- text-[#089BAB]">
                              <div className="flex justify-between gap-4">
                                <div>Name</div>
                                <div>Dosage</div>
                                <div>Frequency</div>
                                <div>Reason</div>
                              </div>
                            </div>
                            <div>{renderCurrentMedications()}</div>
                          </div>
                        </div>

                        <Separator className="my-4" />
                        {/* surgicalProcedures */}
                        <div className="flex mx-6">
                          <div className="text-[#089BAB] text-lg mr-4">
                            Surgical Procedures :{" "}
                          </div>
                          <div>
                            <div className=" mt-1 text-sm center text- text-[#089BAB]">
                              <div className="flex justify-around gap-4">
                                <div>Name</div>
                                <div>Period</div>
                              </div>
                            </div>
                            <div>{surgicalProcedures()}</div>
                          </div>
                        </div>

                        <Separator className="my-4" />
                        {/* familyHistory */}
                        <div className="flex mx-6">
                          <div className="text-[#089BAB] text-lg mr-4">
                            Family History :{" "}
                          </div>
                          <div>
                            <div className=" mt-1 text-sm center text- text-[#089BAB]">
                              <div className="flex justify-around gap-14">
                                <div>Name</div>
                                <div>Relation</div>
                              </div>
                            </div>
                            <div>{familyHistory()}</div>
                          </div>
                        </div>
                        <div>
                          {" "}
                          <Separator className="my-4" />
                          <div className="text-[#089BAB] text-lg ml-6">
                            Tests :{" "}
                          </div>
                          {/* <ResponsiveContainer width="100%" height={400}>
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
                    </ResponsiveContainer> */}
                          {/* <ResponsiveContainer width="100%" height={230}>
                            <PieChart width={400}>
                              <Pie
                                dataKey="uv"
                                startAngle={360}
                                endAngle={0}
                                data={reportData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                              />
                            </PieChart>
                          </ResponsiveContainer> */}
                          <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                              width={500}
                              height={300}
                              data={reportData}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                              barSize={20}
                            >
                              <XAxis
                                dataKey="name"
                                scale="point"
                                padding={{ left: 2, right: 2 }}
                              />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <CartesianGrid strokeDasharray="3 3" />
                              <Bar
                                dataKey="uv"
                                fill="#8884d8"
                                background={{ fill: "#eee" }}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div>
                        <div className="text-[#089BAB] text-lg mr-4">
                          Vitals :{" "}
                        </div>
                        <div>
                          <div className="mb-3 text-sm">{renderVitals3()}</div>
                          <div>{renderVitals2()}</div>
                        </div>
                        <div>
                          <br />
                          <Separator className="my-4" />
                          <div className="text-[#089BAB] text-lg mr-4 mb-6">
                            The treatements have done :{" "}
                          </div>
                          {treatmentHistory ? (
                            <div>
                              {treatmentHistory.map((report) => (
                                <div key={report._id}>
                                  {report.treatment?.name}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p>Loading...</p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div>
                    {medicalReports ? (
                      <div>
                        {medicalReports.map((report) => (
                          <div key={report._id}>{report.testName}</div>
                        ))}
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div> */}
                    <Separator className="my-4" />
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
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
          <button
            onClick={handlePDFGeneration}
            className="p-2 mx-4 mt-2 font-medium text-white bg-teal-500 border rounded-lg shadow-md"
          >
            Download PDF
          </button>
        </TabsContent>
        <TabsContent value="mycareupdate">
          <ScrollArea className="h-[540px] p-4 m-4 border border-slate-400 rounded-2xl">
            <div className="px-6  rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 bg-teal-50 shadow-inner lg:col-span-2 h-[34rem] overflow-y-auto scrollbar-thin">
              {/* personal details form */}
              <span className="col-span-2 mt-6 text-2xl font-bold">
                Update your personal medical Details...
              </span>
              {patientDetails != undefined && (
                <PatientProfileSecondaryForm
                  doctor={patientDetails}
                  change={changeSecondaryState}
                />
              )}

              {/* from end */}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyCareProfile;
