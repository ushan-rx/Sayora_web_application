import React, { useEffect, useState } from 'react'

import { useExaminationStore } from '@/store/examination.store';
import { usePatientStore } from '@/store/patient.store';

import DataTable from '../shared/dataTable';
import { requesitionColumns } from '@/services/doctor/requisitionColumns';

function displayRequisitions() {
    const {isRefetchNeeded} = useExaminationStore(); //state to refresh the table data
	const {patientId} = usePatientStore(state => ({
		patientId: state.patient.patientId,
	}))

    const [requisitions, setRequisitions] = useState([]); //state to store requisitions
  
    const fetchRequisitions = async () => {
      try {
        if(patientId){
            const response = await fetch(`http://localhost:5000/api/v1/requesition/${patientId}`); // Fetch all requisitions
            const data = await response.json();
            setRequisitions(data.requesitions);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {   
        fetchRequisitions();
    }, [isRefetchNeeded, patientId]);

    return (
    <div>
        <div className="container p-4">
                <h1 className='py-2 font-semibold uppercase text-gray-700'>Requisitions</h1>
                <div className="table-container">
                    <DataTable columns={requesitionColumns} data={requisitions} />
                </div>
            </div>
    </div>
  )
}

export default displayRequisitions