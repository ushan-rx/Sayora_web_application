import React from 'react'

import DataTable from '@/components/shared/dataTable'
import { familyHistoryColumns } from '@/services/shared/familyHistoryColumns'

function currentMedicationTable(data) {
    return (
        <div>
            <div className="container p-6">
                <h1 className='py-4 font-semibold'>Family History</h1>
                <div className="table-container">
                    <DataTable columns={familyHistoryColumns} data={data.tableData} />
                </div>
            </div>
        </div>
    )
}

export default currentMedicationTable