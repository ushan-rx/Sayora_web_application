import React, { useEffect, useState, useRef } from 'react'

import { usePatientStore } from "@/store/patient.store";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import  AdvancedTable  from "@/components/shared/advanceTable/advancedTable";
import { patientReportColumns } from '@/services/doctor/patientReportColumns';

import { useExaminationStore } from '@/store/examination.store';


function examinationList() {
  const [reportList, setReportList] = useState([]);
  const {isRefetchExaminationNeeded} = useExaminationStore(); //state to refresh the table data
  
  const {patientId} = usePatientStore(state => ({
    patientId: state.patient.patientId,
}))

const fetchData = async () => {
    console.log(patientId);
  try {
    // fetch report data from backend
    if(patientId){
        const response = await axios.get(`http://localhost:5000/api/v1/report/patient/${patientId}`)
        const reportData = await response.data;
        console.log(reportData)
        setReportList(reportData)
    }
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
  useEffect(() => {
    fetchData();
  }, [isRefetchExaminationNeeded, patientId]);

  return (
    <div>
      <div className="container overflow-auto">
        <h1 className='my-2 font-bold text-slate-500'>Reports</h1>
        
        <div className="table-container ">
          {
            reportList.length > 0 ? (
              <AdvancedTable
              columns={patientReportColumns} 
              data={reportList}
              filterColumn="testName"
              />
            ) : (
              // If there are no appointments for today
              <div className="h-[60vh] text-center p-48 font-bold text-3xl text-teal-500">  
                No Reports to show..
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default examinationList
