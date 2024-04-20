import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { usePatientStore } from "@/store/patient.store";
import { useExaminationStore } from "@/store/examination.store";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ProfileDeatailSheet from "@/components/doctor/profileDetailSheet";
import MedicalHistoryContainer from './medicalHistoryContainer';


function examinationContainer() {
  // to store window size to handle the page content
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);  
  const handleResize = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Cleanup function to remove listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // get patientId from query params
  const {id} = useParams();

  const patient = usePatientStore(state => state.patient)
  const setPatientDetails = usePatientStore(state => state.setPatientDetails) 
  
  //state to handle new submissions and update patient details
  const isRefetchNeeded = useExaminationStore(state => state.isRefetchNeeded)

  // fetch patient detais from backend and store in patient store
  useEffect(() => {
    setPatientDetails({  // include patientid when calling
      onSuccess: (response) => console.log('Success:', response),
      onError: (error) => console.log('Error:', error),
      onFinal: () => console.log('Request finished'),
    })  

    console.log(patient)
  }, [])




  return (
    <>
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
              rgwe
            </TabsContent>
            <TabsContent value="diagnosis">
              wergwerr
            </TabsContent>
            <TabsContent value="prescribe">
              wergewr
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
