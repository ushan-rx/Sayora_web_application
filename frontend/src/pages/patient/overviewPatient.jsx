import React, { useEffect, useState } from "react";

//calnder
import { Calendar } from "@/components/ui/calendar";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";

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

function overview() {
  const patId = Cookies.get("roleId"); // get the patient id from the
  const [patientDetails, setPatientDetails] = useState({}); // to store patient details

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

  return (
    <ScrollArea className="h-screen">
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="bg-white md:w-3/5">
          <div className="flex flex-col justify-center gap-4 mt-6 ml-4 md:flex-row">
            {/* Square Card 1 */}
            <div className="px-4 py-4 border-[#FEAD54] border-l-4  rounded-2xl">
              <div className="flex justify-between">
                <div>
                  <div className="text-xl text-center text-slate-800">
                    Daily Uploads
                  </div>
                  <br />
                  <div className="text-md text-slate-800">Last Update :</div>
                  <div className="text-sm text-slate-600">today 02:00pm</div>
                </div>
                <div className="text-right ">
                  <div className="ml-6 text-3xl font-medoum text-slate-600">
                    26
                  </div>
                  <div className="ml-6 text-sm text-center text-slate-600">
                    reports
                  </div>
                </div>
              </div>
            </div>
            {/* Square Card 2 */}
            <div className="px-6 py-4 border-[#FD988B] border-l-4  rounded-2xl">
              <div className="flex justify-between">
                <div>
                  <div className="text-xl text-center text-slate-800">
                    Daily Uploads
                  </div>
                  <br />
                  <div className="text-md text-slate-800">Last Update :</div>
                  <div className="text-sm text-slate-600">today 02:00pm</div>
                </div>
              </div>
            </div>
            {/* Square Card 3 */}
            <div className="px-6 py-4 border-[#089BAB] border-l-4  rounded-2xl">
              <div className="flex justify-between">
                <div>
                  <div className="text-xl text-center text-slate-800">
                    Appoinment
                  </div>
                  <br />
                  <div className="text-md text-slate-800">Last Update :</div>
                  <div className="text-sm text-slate-600">today 02:00pm</div>
                </div>
              </div>
            </div>
          </div>
          {/* left below chart part*/ }
          <div className="flex-col m-6 border-t-4 border-l-4 h-[490px] border-slate-300 rounded-2xl">
            
          </div>
        </div>
        <div className="p-4 bg-white md:w-1/4">
          <h2 className="mb-4 text-xl font-bold">Nearest Treatment</h2>
          <div className="grid grid-cols-1 gap-2">
            <Calendar className="my-4 border border-slate-400 rounded-2xl"></Calendar>
            {/* Square Card 1 */}
            <div className="px-6 py-4 bg-[#089BAB] border border-gray-300 rounded-2xl">
              <div className="flex justify-between">
                <div>
                  <div className="text-center text-white text-m">Aug</div>
                  <div className="text-5xl font-bold text-white">26</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white">Dr. John Doe</div>
                  <div className="mb-4 text-xs text-white">Skin therepist</div>
                  <div className="p-2 text-lg bg-[#e0eff1] rounded-lg ">
                    9:00 AM
                  </div>
                </div>
              </div>
            </div>
            {/* Square Card 2 */}
            <div className="p-4 bg-white border border-gray-300 rounded-2xl">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-gray-500">Sep</div>
                  <div className="text-4xl font-bold">15</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-700">Dr. Jane Smith</div>
                  <div className="text-lg">2:30 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="object-center p-4 bg-white md:w-1/4">
          <div className="flex-row justify-center ">
            <div className="flex-col my-4 border border-slate-400 rounded-2xl">
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
            <div className="flex-col my-4 border border-slate-400 rounded-2xl">
              <h2 className="p-4 text-xl font-bold text-[#089BAB]">
                Notification
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ScrollArea>
  );
}

export default overview;
