import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { usePatientStore } from "@/store/patient.store";
import { useExaminationStore } from "@/store/examination.store";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast, Toaster } from 'react-hot-toast';

import ProfileDeatailSheet from "@/components/doctor/profileDetailSheet";
import MedicalHistoryContainer from './medicalHistoryContainer';
import DiagnosisContainer from './DiagnosisContainer';
import PrescriptionContainer from './prescribeContainer';
import ReportsContainer from './reportsContainer';

import axios from 'axios';

function examinationContainer() {
  // to store window size to handle the page content
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);  
  const handleResize = () => setWindowWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Cleanup function to remove listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // get AppointmentId from query params
  const {id} = useParams();
  const getAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getappointments/${id}`)
      const appointment = response.data;
      // fetch patient details from backend and store in patient store
      if(appointment){
        setPatientDetails(
          appointment.patientId, 
          {  
          onSuccess: (response) => console.log('Success:', response),
          onError: (error) => console.log('Error:', error),
          onFinal: () => console.log('Request finished'),
          }
        )  
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const setPatientDetails = usePatientStore(state => state.setPatientDetails) 
  
  //state to handle new submissions and update patient details
  const {isRefetchNeeded, setRefetchNeeded} = useExaminationStore();

  // fetch patient detais from backend and store in patient store
  useEffect(() => {
    getAppointmentDetails()
  }, [isRefetchNeeded]);

  const handleFormSubmits = (value) => {
    if(value){
      toast.success(value);
    } else {
      toast.error("Operation Failed");
    }
    setRefetchNeeded();
  }

  return (
    <>
    <div><Toaster position="bottom-right"/></div> 
    {windowWidth < 1200 ? <div className='flex h-dvh items-center bg-slate-300 font-bold justify-center text-2xl'>Please maximize the page to operate</div> : 
      <div className='flex flex-row'>
          <Tabs Tabs defaultValue="medical" className="w-full mt-2 mx-2">
            <TabsList className="grid w-full grid-cols-4 h-10 bg-slate-100 text-slate-700">
              <TabsTrigger value="medical">Medical History</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
              <TabsTrigger value="prescribe">Prescribe</TabsTrigger>
            </TabsList>
            <TabsContent value="medical">
              <MedicalHistoryContainer />
            </TabsContent>
            <TabsContent value="reports">
              <ReportsContainer />
            </TabsContent>
            <TabsContent value="diagnosis">
            <DiagnosisContainer change={handleFormSubmits}/>
            </TabsContent>
            <TabsContent value="prescribe">
              <PrescriptionContainer change={handleFormSubmits}/>
            </TabsContent>
          </Tabs>
           {/* side sheet to display patient details */}
          <ProfileDeatailSheet />
        </div>
      }
    </>
  )
}

export default examinationContainer
