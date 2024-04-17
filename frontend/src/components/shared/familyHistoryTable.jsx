import React from 'react'

import DataTable from '@/components/shared/dataTable'
import { familyHistoryColumns } from '@/services/shared/familyHistoryColumns'

function currentMedicationTable(data) {
    console.log(data.tableData)
    return (
        <div>
            <div className="container p-6">
                <h1 className='py-4 font-semibold'>Current Medications</h1>
                <div className="table-container">
                    <DataTable columns={familyHistoryColumns} data={data.tableData} />
                </div>
            </div>
        </div>
    )
}

export default currentMedicationTable