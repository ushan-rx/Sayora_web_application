import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";

import AppointmentReportTable from '@/components/doctor/appointmentReportTable'
import { appointmentReportColumns } from '@/services/doctor/appointmentReportColumns'
import { set } from 'date-fns';

function appointmentReport() {
  const doctorId = Cookies.get('roleId');

  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    // fetch data from backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/appointments'); // Fetch all appointments
        const data = await response.json();
        console.log(data)

        const filteredAppointments = data.filter((appointment) => {
          return appointment.doctorID === doctorId
        });
        console.log(filteredAppointments)
        setAppointmentList(filteredAppointments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className='h-[70vh] rounded-md p-4'>
        <h1 className='pl-8 text-slate-600 font-bold'>Appointmemt Report</h1>
        <div className='px-8 py-4'>
          <AppointmentReportTable 
            columns={appointmentReportColumns} 
            data={appointmentList}
            filterColumn="App_reason"
          />
        </div>
      </div>
    </div>
  )
}

export default appointmentReport