export const treatmentHistoryColumns = [
    {
        accessorKey: "treatment",
        header: "Treatment",
    },
    {
        accessorKey: "doctorId",
        header: "Doctor ID",
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("date"))
            const formatted = date.toLocaleDateString()
       
            return <div className="font-medium">{formatted}</div>
          },    
    },
]