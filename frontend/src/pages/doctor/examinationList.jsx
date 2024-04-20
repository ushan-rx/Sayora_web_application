import React, { useEffect, useState } from 'react'

import  AdvancedTable  from "@/components/shared/advanceTable/advancedTable";
// import  AdvancedTable  from '@/components/shared/advanceTable/advancedTable'
import { examinationColumns } from '@/services/doctor/examinationColumns'
import { useExaminationStore } from '@/store/examination.store';


function examinationList() {
  const [examinationList, setExaminationList] = useState([]);
  const {isRefetchExaminationNeeded} = useExaminationStore(); //state to refresh the table data
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/appointments'); // Fetch all appointments
        const data = await response.json();

        // get only the appointments in current date
        const filteredAppointments = data.filter((appointment) => {
          const today = new Date(); // Get today's date
          const appointmentDate = new Date(appointment.App_date);
          return (
            appointmentDate.getDate() === today.getDate() &&
            appointmentDate.getMonth() === today.getMonth() &&
            appointmentDate.getFullYear() === today.getFullYear() &&
            appointment.status !== 'Pending' &&
            appointment.status !== 'Completed' &&
            appointment.status !== 'Cancel'
          );
        });
        // if there are appointments today
        if(filteredAppointments.length > 0) {
          const sortedAppointments = filteredAppointments.sort((a, b) => {
            // Extract the time portion from the appointment data
            const timeA = a.App_time;
            const timeB = b.App_time;
            // Convert the time strings to Date objects for comparison
            const dateA = new Date(`2000-01-01 ${timeA}`);
            const dateB = new Date(`2000-01-01 ${timeB}`);
            // Compare the Date objects
            return dateA - dateB;
          });
          // 'sortedAppointments' now contains appointments sorted by time
          setExaminationList(sortedAppointments);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [isRefetchExaminationNeeded]);

  return (
    <div>
      <div className="container overflow-auto">
        <h1 className='my-2 font-bold text-slate-500'>Appointments</h1>
        
        <div className="table-container h-[85vh] overflow-auto scrollbar-thin">
          {
            examinationList.length > 0 ? (
              <AdvancedTable
              columns={examinationColumns} 
              data={examinationList}
              filterColumn="patientName"
              />
            ) : (
              // If there are no appointments for today
              <div className="h-[60vh] text-center p-48 font-bold text-3xl text-teal-500">  
                No appointments for today..
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default examinationList
