import React, {useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import usePrescriptionStore from '@/store/prescription.store'

import axios from 'axios';
import { useReactToPrint } from "react-to-print";

import { Button } from '@/components/ui/button'

import TreatmentHistoryForm from '@/components/doctor/treatmentHistoryForm'

function prescribeContainer({change}) {
    const appointmentId = useParams().id
    const navigate = useNavigate() 

    // state to handle prescription details
    const {
        prescription,
        setPatientId,
        setPatientName,
        setDoctorId,
        setDoctorName,
        setSickness,
        setMedications,
        setInstructions,
        setDate,
      } = usePrescriptionStore();

    // for printing (react-to-print)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Sayora Wellness Center",
    });

    //finish examination handle
    const handleFinish = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/updateappointments/${appointmentId}`, {
              status: 'Completed'
            })
            console.log(response)
            change("Examination Completed")
            setTimeout(() => {
                navigate(`/doctor/examination`)
            }, 1500);
          } catch (error) {
            console.error('Error completing appointment:', error)
          }
    }

    return (
        <div className='h-[80vh] overflow-auto scrollbar-thin -mr-20 rounded-md'>
          <div className='grid grid-cols-2'>
            <div className='grid grid-rows-2 '>
              <div className='m-4 bg-slate-50 rounded-lg row-span-2 h-[75vh]'>

                {/* print prescription component */}
                <div className='hidden'>
                    <div ref={componentRef} className="bg-white rounded-lg  p-6">
                        <style>{`@page { margin: 3rem 2rem 2rem 2rem !important; }`}</style>
                        <div className='flex justify-center'>
                        <img className='h-16 mb-4 ' src="https://sayora.lk/wp-content/uploads/2023/04/SAYORA-LOGO-NEW.png" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-6 text-center underline underline-offset-8">Prescription</h2>
                        {/* value fields */}
                        <div className="mb-4">
                            <p className="font-semibold">Doctor Name:</p>
                            <p>{prescription?.doctorName}</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Patient Name:</p>
                            <p>{prescription?.patientName}</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Diagnosis:</p>
                            <p>{prescription?.sickness}</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Issued Date:</p>
                            <p>{prescription?.date}</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Medications:</p>
                            {/* medications table  */}
                            <table className=" ml-6 w-full">
                            <thead>
                                <tr>
                                <th className="text-left">Medication</th>
                                <th className="text-left">Dosage</th>
                                <th className="text-left">Frequency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescription?.medications.map((med, index) => (
                                <tr key={index}>
                                    <td>{med.medication}</td>
                                    <td>{med.dosage}</td>
                                    <td>{med.frequency}</td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        <div className='mt-6'>
                            <p className="font-semibold">Instructions:</p>
                            <p className='px-20'>{prescription?.instructions}</p>
                        </div>
                    </div>
                </div>
                {/* print prescription end */}
              </div>
            </div>
            <div className=' grid grid-rows-3'>
              <div className='m-4 bg-slate-50 rounded-lg row-span-1'>
                diagnosis
              </div>
              <div className='m-4 bg-slate-50 rounded-lg row-span-2'>
                <TreatmentHistoryForm change={change} />
              </div>
              <div className='m-4 h-12 flex justify-end '>
              <Button
                    onClick={handlePrint}
                    className="bg-blue-500 px-6 ml-12 text-base z-40">
                    Print Prescription
                </Button>
                <Button
                    onClick={handleFinish}
                    className="bg-green-600 px-6 ml-12 text-base z-40">
                    Finish
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
}


export default prescribeContainer