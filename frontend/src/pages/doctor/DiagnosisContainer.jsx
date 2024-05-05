import React from 'react'

import DoctorRequisitionForm from '@/components/doctor/doctorRequisitionForm'
import DisplayRequisitions from '@/components/doctor/displayRequisitions'

import DoctorNoteForm from '@/components/doctor/doctorNoteForm'
import DoctorNoteViewer from '@/components/doctor/doctorNoteViewer'

function diagnosisContainer({change}) {

  return (
    <div className='h-[80vh] overflow-x-auto scrollbar-thin -mr-20 rounded-md'>
      <div className='grid grid-cols-2'>
        <div className='grid grid-rows-2'>
        <div className='m-4 mr-8 bg-slate-50 rounded-lg'>
            <DoctorNoteForm change={change}/>
          </div>
          <div className='m-4 bg-slate-50 rounded-lg'>
            {/* add requisitions */}
            <DoctorRequisitionForm change={change}/>
          </div>
        </div>
        <div className=' grid grid-rows-2'>
          <div className='m-4 -ml-2 bg-slate-50 rounded-lg'>
            <DoctorNoteViewer/>
          </div>
          <div className='m-4 bg-slate-50 rounded-lg '>
              {/* display requisitions*/}
              <DisplayRequisitions />
          </div>
        </div>
      </div>
    </div>
  )
}

export default diagnosisContainer