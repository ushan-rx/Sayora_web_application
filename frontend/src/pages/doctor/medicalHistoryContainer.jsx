import React from 'react'

import SurgicalProcedureTable from '@/components/doctor/surgicalProcedureTable'
import CurrentMedicationTable from '@/components/doctor/currentMedicationTable'
import FamilyHistoryTable from '@/components/doctor/familyHistoryTable'
import TreatmentHistoryTable from '@/components/doctor/treatmentHistoryTable'

import { usePatientStore } from '@/store/patient.store'

function medicalHistoryContainer() {
    const surgicalProcedures = usePatientStore(state => state.patient.surgicalProcedures)
    const currentMedications = usePatientStore(state => state.patient.currentMedications)
    const familyHistory = usePatientStore(state => state.patient.familyHistory)
    console.log(surgicalProcedures)
  return (
    <div>
        <div className='grid grid-flow-row h-[80vh] overflow-auto -mr-24'>
            <div className='grid grid-flow-col grid-cols-2'>
                <div className='m-4 bg-slate-50 rounded-lg'><SurgicalProcedureTable tableData={surgicalProcedures} /></div>
                <div className='m-4 bg-slate-50 rounded-lg'><FamilyHistoryTable tableData={familyHistory} /></div>
            </div>
            <div className='grid grid-flow-col grid-cols-2 my-2'>
            <div className='m-4 bg-slate-50 rounded-lg'><CurrentMedicationTable tableData={currentMedications}/></div>
            <div className='m-4 bg-slate-50 rounded-lg'><TreatmentHistoryTable /></div>
            </div>
        </div>
    </div>
  )
}

export default medicalHistoryContainer