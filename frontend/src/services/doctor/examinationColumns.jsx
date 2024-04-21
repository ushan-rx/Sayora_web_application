import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { useExaminationStore } from '@/store/examination.store';


const cancelAppointment = async (appointmentId) => {
  try {
    console.log('Completing appointment:', appointmentId)
    const response = await axios.put(`http://localhost:5000/updateappointments/${appointmentId}`, {
      status: 'Cancel'
    })
    console.log(response)
  } catch (error) {
    console.error('Error cancelling appointment:', error)
  }
}

const completeAppointment = async (appointmentId) => {
  try {
    const response = await axios.put(`http://localhost:5000/updateappointments/${appointmentId}`, {
      status: 'Completed'
    })
    console.log(response)
  } catch (error) {
    console.error('Error completing appointment:', error)
  }
}

export const examinationColumns = [
      
    {
        accessorKey: "App_Id",
        header: "Appointment ID",
    },
    {
        accessorKey: "App_date",
        header: "Appointment Date",
        cell: ({ row }) => {
          const date = new Date(row.getValue("App_date"))
          const dateFormatted = date.toLocaleDateString()
          return <div className="font-medium">{dateFormatted}</div>
        },
    },
    {
        accessorKey: "App_time",
        header: "Appointment Time"
    },
    {
      accessorKey: "patientName",
      header: "Patient Name"
    },
    {
      accessorKey: "status",
      cell: ({ row }) => {
        const value = row.getValue("status")
        
        return <div className="font-medium">{value}</div>
      },
    },
    //action section
    {
        id: "complete",
        cell: ({ row }) => {
          const appointment = row.original
          const navigate = useNavigate() 
          //state to refresh the table 
          const {setRefetchExaminationNeeded} = useExaminationStore();

          return appointment.patientId ? (
                // display button to enter examination panel only when the patient is registered
                <Button 
                    className="h-8 lg:px-3 text-white bg-teal-500 hover:bg-teal-700 hover:text-white"
                    onClick={() => navigate(`/doctor/examination/${appointment.App_Id}`)}
                >
                  Examine
                </Button>
              
          ) : (
            //otherwise display complete button to mark the appointment as completed
            <Button 
                className="h-8 lg:px-3 text-white bg-teal-500 hover:bg-teal-700 hover:text-white"
                onClick={async () => { await completeAppointment(appointment.App_Id)
                                setRefetchExaminationNeeded();
                              }}
            >
              Complete
            </Button>
          )
        },
      },
      {
        id: "complete",
        cell: ({ row }) => {
          const appointment = row.original
          //state to refresh the table after the appointment is cancelled
          const {setRefetchExaminationNeeded} = useExaminationStore() 
          return (
                // display button to cancel appointment
              <Button 
                  className="h-8  lg:px-3 text-white bg-red-500 hover:bg-red-700 hover:text-white"
                  onClick={async () => { await cancelAppointment(appointment.App_Id);
                                    setRefetchExaminationNeeded();
                                }}
              >
                Cancel
              </Button>
          )
        },
      },
]