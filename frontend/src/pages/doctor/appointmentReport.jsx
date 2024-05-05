import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';

import { cn } from "@/lib/utils"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from '@/components/ui/separator';
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, addDays } from "date-fns"

import AppointmentReportTable from '@/components/doctor/appointmentReportTable'
import { appointmentReportColumns } from '@/services/doctor/appointmentReportColumns'

const formSchema = z.object({
  status: z.string(),
  gender: z.string(),
  range: z.string(),
  dateRange:z.object({
    from: z.coerce.date(),
    to: z.coerce.date(),
}),
});

const rangeOptions = ['Year','Month','Week','Day'];
const genderOptions = ['Any', 'Male', 'Female'];
const statusOptions = ['Any', 'Pending', 'Approved', 'Canceled', 'Completed'];


function appointmentReport() {
  const doctorId = Cookies.get('roleId');

  const [appointmentList, setAppointmentList] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const [date, setDate] = React.useState({
    from: new Date(),
    to: new Date(),
  })

  useEffect(() => {
    // fetch data from backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/appointments'); // Fetch all appointments
        const data = await response.json();
        //filter appointments by docID
        const filteredAppointments = data.filter((appointment) => {
          return appointment.doctorID === doctorId
        });

        setAppointmentList(filteredAppointments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);


  const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues:{
      status: '',
      gender: '',
      range: '',
      dateRange:{
        from: new Date(),
        to: new Date(),
      }
		},
	})

  const onSubmit = async (data) => {
    console.log(data);
    appointmentFilter(data);
    setDisplayTable(true);
  }

  const resetForm = () => {
    form.reset();
  }

  const appointmentFilter = (filters) => {
    const { status, gender, range, dateRange } = filters;

      // Get the current date
      const currentDate = new Date();

      // Initialize variables for date range
      let fromDate = currentDate;
      let toDate = currentDate;

      // Determine the date range based on the selected range
      switch (range) {
        case 'Month':
          fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          toDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          break;
        case 'Year':
          fromDate = new Date(currentDate.getFullYear(), 0, 1);
          toDate = new Date(currentDate.getFullYear(), 11, 31);
          break;
        case 'Week':
          const currentDay = currentDate.getDay();
          fromDate = new Date(currentDate);
          fromDate.setDate(currentDate.getDate() - currentDay);
          toDate = new Date(currentDate);
          toDate.setDate(currentDate.getDate() + (6 - currentDay));
          break;
        case 'Day':
          // Use the current date (already set)
          break;
        default:
          // Invalid range or no range specified, use dateRange input
          if (dateRange.from && dateRange.to) {
            console.log(dateRange.from, dateRange.to)
            fromDate = new Date(dateRange.from);
            toDate = new Date(dateRange.to);
          }
      }

      // Filter appointments based on user inputs
      const filteredList = appointmentList.filter((appointment) => {
        let matchesStatus = true;
        let matchesGender = true;
        let matchesDateRange = true;

        //check status
        if (status) {
          matchesStatus = (appointment.status === status || status === 'Any');
        }
        // check gender
        if (gender) {
          matchesGender = (appointment.patientGender === gender || gender === 'Any');
        }
        // check date range 
        const appointmentDate = new Date(appointment.App_date);
        if( (new Date(dateRange.from).toLocaleString != new Date(dateRange.to).toLocaleString)  || range != ''){
          matchesDateRange = (new Date(appointmentDate).getUTCDay >= new Date(fromDate).getUTCDay && new Date(appointmentDate).getUTCDay <= new Date(toDate).getUTCDay);
        }
        //return matching results
        return matchesStatus && matchesGender && matchesDateRange;
      })
      // Update filteredAppointments state
      setFilteredAppointments(filteredList);
      console.log(filteredList);
  }

  console.log(filteredAppointments);


  return (
    <div>
      <div className='h-[80vh] rounded-md p-4 overflow-auto scrollbar-thin'>
        <h1 className='pl-6 text-slate-600 font-bold'>Appointmemt Report</h1>
        <div className='grid w-full  grid-rows-4'>
          <div className='row-span-1 grid'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 m-4">
              <FormLabel className="text-md ml-2">Select Options
              </FormLabel>
                <div className='grid grid-cols-5'>
                  <div className='col-span-2 ml-2'>
                    <div>
                      <FormField
                        control={form.control}
                        name="dateRange"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Select Date Range</FormLabel>
                            <div className={cn("grid gap-2")}>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                      "w-[300px] justify-start text-left font-normal",
                                      !date && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                      date.to ? (
                                        <>
                                          {format(date.from, "LLL dd, y")} -{" "}
                                          {format(date.to, "LLL dd, y")}
                                        </>
                                      ) : (
                                        format(date.from, "LLL dd, y")
                                      )
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className='col-span-3 pt-5 grid grid-cols-4'>
                    <div>
                        <FormField
                          control={form.control}
                          name={'range'}
                          render={({ field }) => (
                            <FormItem className="grid col-span-1 space-y-0 justify-center">
                              <Select onValueChange={field.onChange} defaultValue={field.value} > 
                                <FormControl>
                                  <SelectTrigger className="col-span-2">
                                    <SelectValue placeholder="Select Range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {
                                    rangeOptions.map((range) => (
                                      <SelectItem value={range}>{'This '+ range}</SelectItem>
                                    ))
                                  }
                                </SelectContent>
                              </Select>
                              <FormMessage className="col-span-3"/>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name={'status'}
                          render={({ field }) => (
                            <FormItem className="grid col-span-1 space-y-0 justify-center">
                              <Select onValueChange={field.onChange} defaultValue={field.value} > 
                                <FormControl>
                                  <SelectTrigger className="col-span-2">
                                    <SelectValue placeholder="Select Status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {
                                    statusOptions.map((status) => (
                                      <SelectItem key={status} value={status}>{status}</SelectItem>
                                    ))
                                  }
                                </SelectContent>
                              </Select>
                              <FormMessage className="col-span-3"/>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                            control={form.control}
                            name={'gender'}
                            render={({ field }) => (
                              <FormItem className="grid col-span-1 space-y-0 justify-center">
                                <Select onValueChange={field.onChange} defaultValue={field.value} > 
                                  <FormControl>
                                    <SelectTrigger className="col-span-2">
                                      <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {
                                      genderOptions.map((gender) => (
                                        <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                                      ))
                                    }
                                  </SelectContent>
                                </Select>
                                <FormMessage className="col-span-3"/>
                              </FormItem>
                            )}
                          />
                      </div>
                      
                      <div>
                        <Button type="submit" class="text-sm ml-4 w-fit px-4 bg-teal-500 rounded-lg py-2 font-medium text-white border shadow-md">
                          Generate
                        </Button>
                        {/* <Button type="button" onClick={() =>resetForm()} class="text-sm ml-10 mt-2 w-fit px-4 bg-red-500 rounded-lg py-2 font-medium text-white border shadow-md">
                          Reset
                        </Button> */}
                      </div>
                  </div> 
                </div>                   
            </form>
          </Form>
          <Separator />
          </div>
          
          <div className='px-8 py-2 row-span-3'>
            {
              displayTable && (
                <AppointmentReportTable 
                  columns={appointmentReportColumns} 
                  data={filteredAppointments}
                  filterColumn="App_reason"
                />
              )
            }  
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default appointmentReport