import { LuArrowUpDown, LuMoreHorizontal } from "react-icons/lu";

// for actions
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const appointmentReportColumns = [

    {
        accessorKey: "App_date",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4" // to align headers with cells
            >
              Appointment Date
              <LuArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const date = new Date(row.getValue("App_date"))
          const dateFormatted = date.toLocaleDateString()
          return <div className="font-medium">{dateFormatted}</div>
        },
    },
    {
      accessorKey: "App_reason",
      header: "Reason",
    },
    {
        accessorKey: "patientName",
        // to make column sortable
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="-ml-4" // to align headers with cells
              >
                Patient Name
                <LuArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
      accessorKey: "patientGender",
      // to make column sortable
      header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4" // to align headers with cells
            >
              Gender
              <LuArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
    },
    // {
    //     accessorKey: "amount",
    //     header: ({ column }) => {
    //         return (
    //           <Button
    //             variant="ghost"
    //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //             className="-ml-10"     //align headers with cells
    //           >
    //             Amount
    //             <LuArrowUpDown className="ml-2 h-4 w-4" />
    //           </Button>
    //         )
    //       },
    // },
    //action section
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //       const payment = row.original
     
    //       return (
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Button variant="ghost" className="h-8 w-8 p-0">
    //               <span className="sr-only">Open menu</span>
    //               <LuMoreHorizontal className="h-4 w-4" />
    //             </Button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="end">
    //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //             <DropdownMenuItem
    //               onClick={() => navigator.clipboard.writeText(payment.id)}
    //             >
    //               Copy payment ID
    //             </DropdownMenuItem>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuItem>Edit</DropdownMenuItem>
    //             <DropdownMenuItem>Delete</DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       )
    //     },
    //   },
]