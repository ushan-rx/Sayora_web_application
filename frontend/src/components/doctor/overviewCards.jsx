import React from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  import { SlCalender } from "react-icons/sl";
import { useState } from 'react';
import { useEffect } from 'react';
import { set } from 'date-fns';

function overviewCards({docAppointments}) {
    const docId = Cookies.get("roleId")
    // const [appointments, setAppointments] = useState([])
    const [doctorPrice, setDoctorPrice] = useState(0)
    const [futureAppointments, setFutureAppointments] = useState([])
    const [completedAppointments, setCompletedAppointments] = useState(0)
    const [treatments, setTreatments] = useState([])
    const [regPatients, setRegPatients] = useState([])

    const fetchAppointments = async () => {
        try {
            //filter future appointments
            const futureAppointments = docAppointments.filter((appointment) => {
                const today = new Date()
                const appointmentDate = new Date(appointment.App_date)
                return (
                    appointmentDate.getDate() >= today.getDate() &&
                    appointmentDate.getMonth() >= today.getMonth() &&
                    appointmentDate.getFullYear() >= today.getFullYear()
                )
            })
            setFutureAppointments(futureAppointments)

            //filter status = 'Completed' appointments by current month
            const completeAppointments = docAppointments.filter((appointment) => {
                const today = new Date()
                const appointmentDate = new Date(appointment.App_date)
                return (
                    appointmentDate.getMonth() === today.getMonth() &&
                    appointmentDate.getFullYear() === today.getFullYear() &&
                    appointment.status === 'Completed'
                )
            })
            setCompletedAppointments(completeAppointments.length)
        } catch (error) {
            console.log(error)
        }
    }

    //get regular patients
    const fetchPatients = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/regularPatient/doctor/${docId}`)
            const data = await res.data.regularPatients
            setRegPatients(data)
        } catch (error) {
            console.log(error)
        }
    }

    //get completed treatments
    const fetchTreatments = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/treatmentHistory/doctor/${docId}`)
            const data = await res.data.tHistory
            const completedTreatments = data.filter((treatment) => {
              return treatment.isComplete === true
            })
            setTreatments(completedTreatments)
        } catch (error) {
            console.log(error)
        }
    }

    const dataCalculation = async () => {
        const getDocDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/doctor/${docId}`);
                setDoctorPrice(parseFloat(response.data.doctor.appointmentPrice))
            } catch (error) {
                console.log(error)
            }
        }
        await getDocDetails()
        await fetchAppointments()
        await fetchPatients()
        fetchTreatments()

    }

    useEffect(() => {
        dataCalculation()
    }, [docAppointments])

  return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Revenue<br/>
                      <span>(Channeling)</span>
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-teal-500 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rs. {parseFloat(doctorPrice * completedAppointments)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                      Regular Patients
                      <br/><br/>
                  </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-teal-500 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
              </CardHeader>
              <CardContent>
                
                <div className="text-2xl font-bold">{regPatients.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Future Appointments
                        <br/><br/>
                    </CardTitle>
                    <SlCalender className='fill-teal-500'/>

              </CardHeader>
              <CardContent>
                    <div className="text-2xl font-bold">{ futureAppointments && futureAppointments.length }</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Treatments
                  <br/><br/>
                </CardTitle>
                <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-teal-500 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{treatments.length}</div>
              </CardContent>
            </Card>
          </div>
  )
}

export default overviewCards