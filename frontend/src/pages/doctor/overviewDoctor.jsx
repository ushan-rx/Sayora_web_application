import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


import OverviewCards from '@/components/doctor/overviewCards'
import AppointmentGraph from '@/components/doctor/appointmentGraph';
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button';

function overview() {
  const navigate = useNavigate()

  const docId = Cookies.get("roleId")
  //for calender
  const [date, setDate] = React.useState(new Date())
  //doctor's appointments
  const [docAppointments, setDocAppointments] = React.useState([])

  const fetchAppointments = async () => {
    try {
        const res = await axios.get('http://localhost:5000/appointments')
        const data = await res.data
        //filter appointments by docID
        const docAppointments = data.filter((appointment) => {
            return appointment.doctorID === docId;
        });
        setDocAppointments(docAppointments)
      }
      catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
      fetchAppointments()
    }, [])

  return (
    <div className='h-[86vh] overflow-auto scrollbar-none m-4 rounded-lg bg-slate-100  flex justify-center'>
      <div className="grid w-full h-[85vh] px-8 grid-rows-4 gap-4">
        {/* cards container */}
        <div className="mt-4">
          <OverviewCards docAppointments = {docAppointments}/>
        </div>
        {/* cards container end*/}
        <div className='row-span-3 my-2 grid gap-4 grid-cols-3 '>
          <div className='bg-slate-200 col-span-2 rounded-lg h-full'>
            <AppointmentGraph  docAppointments = {docAppointments}/>
          </div>
          <div className='bg-slate-200 w-fit pt-4 rounded-lg h-full'>
            <Calendar
              mode="single"
              onSelect={setDate}
              className="rounded-md border mx-12 mt-12 w-fit bg-white"
            />
            <Button className="bg-teal-600 mx-[5.5rem] mt-6 w-fit" onClick={() => navigate('/doctor/examination')}>
              Go to Appointments
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default overview
