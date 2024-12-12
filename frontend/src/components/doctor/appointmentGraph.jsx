import React, { useMemo } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

//sample data
const data = [
    {
      name: "Jan",
      count: Math.floor(Math.random() * 50) + 100,
    },
    {
      name: "Feb",
      count: Math.floor(Math.random() * 30) + 100,
    },
    {
      name: "Mar",
      count: Math.floor(Math.random() * 10) + 100,
    },
    {
      name: "Apr",
      count: Math.floor(Math.random() * 70) + 100,
    },
    {
      name: "May",
      count: Math.floor(Math.random() * 0) + 100,
    },
    {
      name: "Jun",
      count:0
    },
    {
      name: "Jul",
      count:0
    },
    {
      name: "Aug",
      count:0
    },
    {
      name: "Sep",
      count:0
    },
    {
      name: "Oct",
      count:0
    },
    {
      name: "Nov",
      count:0
    },
    {
      name: "Dec",
      count:0
    },
  ]


  //data for the graph
  const gotData = [
    {
        name: "Jan",
        count: 0,
      },
      {
        name: "Feb",
        count: 0,
      },
      {
        name: "Mar",
        count: 0,
      },
      {
        name: "Apr",
        count: 0,
      },
      {
        name: "May",
        count: 0,
      },
      {
        name: "Jun",
        count: 0,
      },
      {
        name: "Jul",
        count: 0,
      },
      {
        name: "Aug",
        count: 0,
      },
      {
        name: "Sep",
        count: 0,
      },
      {
        name: "Oct",
        count: 0,
      },
      {
        name: "Nov",
        count: 0,
      },
      {
        name: "Dec",
        count: 0,
      },
]


function appointmentGraph({docAppointments}) {

    //data to display in graph
    const graphData = data

    // filter completed appoitments
    const completedAppointments = docAppointments.filter((appointment) => {
        return appointment.status === "Completed";
    });

    // Function to update 'gotData' based on appointments
function updateGotDataWithAppointments() {
    const currentYear = new Date().getFullYear();
  
    // Iterate through appointments
    for (const appointment of completedAppointments) {
      const appointmentDate = new Date(appointment.App_date);
      const appointmentMonth = appointmentDate.getMonth(); // 0-indexed (0 = January)
  
      // Check if the appointment is in the current year
      if (appointmentDate.getFullYear() === currentYear) {
        // Increment the 'total' for the corresponding month
        gotData[appointmentMonth].count++;
      }
    }
  }
  // Update 'gotData' when 'completedAppointments' changes
  useMemo(() => {
    updateGotDataWithAppointments();
  }, [completedAppointments])


    

  return (
    <div className='p-4 relative'>
        <h1 className='font-semibold text-slate-700'>Monthly Appointment History</h1>
        <ResponsiveContainer width="100%" height={350} className="mt-6 bg-white py-4 rounded-lg">
            {/* gotData */}
            <BarChart data={graphData}> 
                <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar
                dataKey="count"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary text-teal-600"
                />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default appointmentGraph