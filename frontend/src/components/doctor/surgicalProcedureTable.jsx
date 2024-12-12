import React from 'react'

import DataTable from '@/components/shared/dataTable'
import { surgicalProcedureColumns } from '@/services/shared/surgicalProcedureColumns' 

function surgicalProcedureTable(data) {
    return (
        <div>
            <div className="container p-6">
                <h1 className='py-2 font-semibold'>Surgical Procedures History</h1>
                <div className="table-container">
                    <DataTable columns={surgicalProcedureColumns} data={data.tableData} />
                </div>
            </div>
        </div>
    )
}

export default surgicalProcedureTable