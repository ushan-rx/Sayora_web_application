import React from 'react'

import DataTable from '@/components/shared/dataTable'
import { examinationColumns } from '@/services/doctor/examinationColumns'

const payments = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
      },
]


function examinationList() {
    return (
        <div>
            <div className="container">
                <h1>Heading</h1>
                <div className="table-container">
                    <DataTable columns={examinationColumns} data={payments} />
                </div>
            </div>
        </div>
    )
}

export default examinationList
