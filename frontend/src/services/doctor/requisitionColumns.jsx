import React from "react";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { useExaminationStore } from '@/store/examination.store';

const deleteRequesition = async (requisitionId) => {
    try {
      console.log('delete appointment:', requisitionId)
      const response = await axios.delete(`http://localhost:5000/api/v1/requesition/${requisitionId}`)
      console.log(response)
    } catch (error) {
      console.error('Error cancelling appointment:', error)
    }
  }

export const requesitionColumns = [
    {
        accessorKey: "testName",
        header: "Test Name",
    },
    {
        accessorKey: "reqDate",
        header: "Requested Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("reqDate"))
            const dateFormatted = date.toLocaleDateString()
            return <div className="font-medium">{dateFormatted}</div>
          },
    },
    {
        accessorKey: "is_uploaded",
        header: "Status",
        cell: ({ row }) => {
            const value = row.getValue("is_uploaded")
            return value == true ?<div className="font-medium">Uploaded</div>
            :<div className="font-medium">Pending</div>
          },
    },
    //action section
    {
        id: "delete",
        cell: ({row }) => {
          const requisition = row.original
          //state to refresh the table 
          const {setRefetchNeeded} = useExaminationStore();

          return (
                // display button to delete requisition
                <Button 
                className="h-8 lg:px-3 text-white bg-red-500 hover:bg-red-700 hover:text-white"
                onClick={async () => {
                                await deleteRequesition(requisition._id)
                                setRefetchNeeded()
                              }}
                >
                  Delete
                </Button>
              
          ) 

        }
    }

]