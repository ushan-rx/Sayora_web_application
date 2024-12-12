import React from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
//import { useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";


const schema = z.object({
  reason: z.string().min(10, "Reason must be at least 10 characters long."),
  leaveStartTime: z.date(),
  leaveEndTime: z.date(),
  confirmDetails: z.boolean().refine(val => val === true, "You must confirm the details")
});

const ApplyLeave = () => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  });

 
  const onSubmit = async data => {
   
    const submissionData = {
      ...data,
      staffId: Cookies.get("staffId"),
      staffName: Cookies.get("staffName"),
      JobRole: Cookies.get("staffRole")
    };

    try {
      const response = await axios.post('http://localhost:5000/staff/leaves/', submissionData);
      alert('Leave request submitted successfully!');
      reset();
    } catch (error) {
      console.error('Error submitting leave request', error);
      alert('Failed to submit leave request.');
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <form className="space-y-6 w-full max-w-4xl bg-white p-8 shadow rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold text-center text-gray-900">Apply for Leave</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reason for Leave</label>
          <textarea {...register('reason')} className={`mt-1 p-2 w-full border ${errors.reason ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`} />
          {errors.reason && <p className="text-red-500 text-xs italic">{errors.reason.message}</p>}
        </div>









<div>
  <label className="block text-sm font-medium text-gray-700">Start Time</label>
  <Controller
    name="leaveStartTime"
    control={control}
    render={({ field, errors }) => (
      <DatePicker
        selected={field.value}
        onChange={field.onChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        minDate={new Date()}
      />
    )}
  />
  {errors.leaveStartTime && (
    <p className="text-red-500 text-sm">Please select a date today or in the future.</p>
  )}
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">End Time</label>
  <Controller
    name="leaveEndTime"
    control={control}
    render={({ field }) => {
      const startTime = useWatch({
        control,
        name: 'leaveStartTime',
      });

      return (
        <DatePicker
          selected={field.value}
          onChange={field.onChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          minDate={startTime? new Date(startTime.getTime() + 86400000) : undefined}
        />
      );
    }}
  />
</div>

        <div className="flex items-center">
          <input type="checkbox" {...register('confirmDetails')} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
          <label className="ml-2 block text-sm text-gray-900">Confirm Details</label>
          {errors.confirmDetails && <p className="text-red-500 text-xs italic">{errors.confirmDetails.message}</p>}
        </div>

        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Apply Leave
        </button>
      </form>
    </div>
  );
};

export default ApplyLeave;
