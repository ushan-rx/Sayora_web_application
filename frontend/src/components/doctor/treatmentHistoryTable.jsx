import React, { useEffect , useState} from 'react'
import axios from 'axios'

import DataTable from '@/components/shared/dataTable'
import { treatmentHistoryColumns } from '@/services/doctor/treatmentHistoryColumns'
import { usePatientStore } from "@/store/patient.store";

function treatmentHistoryTable() {

    const [treatmentHistory, setTreatmentHistory] = useState([]);

    const {patientId} = usePatientStore(state => ({
		patientId: state.patient.patientId,
	}))

    useEffect(() => {
        const fetchTreatmentHistory = async () => {
            
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/treatmentHistory/patient/${patientId}`);
                const data = response.data.tHistory;
                const tHistory = data.map((item) => {
                    return {
                        date: item.date,
                        treatment: item.treatment?.name,
                        doctorId: item.doctorId,
                    }
                });
                setTreatmentHistory(tHistory);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTreatmentHistory();
    }, [patientId]);

  return (
    <div>
        <div className="container p-6">
            <h1 className='py-2 font-semibold'>Treatments History</h1>
            <div className="table-container">
                <DataTable columns={treatmentHistoryColumns} data={treatmentHistory} />
            </div>
        </div>
    </div>
  )
}

export default treatmentHistoryTable