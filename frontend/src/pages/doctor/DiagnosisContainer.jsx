import React from 'react'

import DoctorRequisitionForm from '@/components/doctor/doctorRequisitionForm'
import DisplayRequisitions from '@/components/doctor/displayRequisitions'

function diagnosisContainer({change}) {


  return (
    <div className='h-[80vh] overflow-auto scrollbar-thin -mr-20 rounded-md'>
      <div className='grid grid-cols-2'>
        <div className='grid grid-rows-2'>
          <div className='m-4 bg-slate-50 rounded-lg'>
            {/* add requisitions */}
            <DoctorRequisitionForm change={change}/>
          </div>
          <div className='m-4 bg-slate-50 rounded-lg'>
          sdsds
          </div>
        </div>
        <div className=' grid grid-rows-2'>
          <div className='m-4 bg-slate-50 rounded-lg '>
              {/* display requisitions*/}
              <DisplayRequisitions />
          </div>
          <div className='m-4 bg-slate-50 rounded-lg'>
            dsds
          </div>
        </div>
      </div>
    </div>
  )
}

export default diagnosisContainer