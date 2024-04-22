export const surgicalProcedureColumns = [
    {
        accessorKey: "name",
        header: "Surgery",
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