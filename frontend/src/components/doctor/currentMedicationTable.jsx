import React from 'react'

import DataTable from '@/components/shared/dataTable'
import { currentMedicationColumns } from '@/services/shared/currentMedicationColumns'

function currentMedicationTable(data) {
    return (
        <div>
            <div className="container p-6">
                <h1 className='py-2 font-semibold'>Current Medications</h1>
                <div className="table-container">
                    <DataTable columns={currentMedicationColumns} data={data.tableData} />
                </div>
            </div>
        </div>
    )
}

export default currentMedicationTable