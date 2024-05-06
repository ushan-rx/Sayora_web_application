import * as React from "react"
import { useRef } from "react";

import { useReactToPrint } from "react-to-print";

import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "../ui/separator";

import { RxCross2 } from "react-icons/rx";

import { DataTablePagination } from "../shared/advanceTable/data-table-pagination"

export default function treatmentReportTable({columns, data, filterColumn, reportData}) {

  const [columnFilters, setColumnFilters] = React.useState([])

  const [sorting, setSorting] = React.useState([]);

// for printing (react-to-print)
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Treatment History Report",
    onBeforeGetContent: () => document.getElementById('reportHeader').className = 'block',
    onAfterPrint:() => document.getElementById('reportHeader').className= 'hidden'
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
 //   columnVisibility,
 //   rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    // enableRowSelection: true,
    // onRowSelectionChange: setRowSelection,
    // getFacetedRowModel: getFacetedRowModel(),
    // getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const filter = filterColumn; // column name for filtering
  const isFiltered = table.getState().columnFilters.length > 0;  // to display reset button

  return (
    <div className="space-y-4">
        {/* filtering (searching) */}
      <div className="flex flex-1 items-center space-x-4">
        <Input
          placeholder="Filter..."
          value={(table.getColumn(filter)?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn(filter)?.setFilterValue(event.target.value)
          }
          className="h-8 mt-1 ml-1 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <RxCross2 className="ml-2 h-4 w-4" />
          </Button>
        )}
         {/* print Button */}
        <Button
            onClick={handlePrint}
            className="h-8 px-2 lg:px-3 bg-teal-500"
        >
            Export
        </Button>

        </div>
        {/* table container */}
        <div className="rounded-md  h-[60vh] overflow-auto ">
            <div ref={componentRef}>   
                <style>{`@page { margin: 6rem 2rem 2rem 2rem !important; }`}</style>
                {/* decerative section with title only visibke in report pdf */}
                <div className="hidden" id="reportHeader"> 
                <div className="font-bold bg-teal-50 w-full text-center my-6 p-2">
                  <span className="w-full">Appointments Report</span>

                  <div className="w-full font-normal text-left mt-4 ml-4">
                    { reportData.doctor && 
                      <p className="text-sm">Doctor: {reportData.doctor}</p>
                    }
                    {
                      reportData.date &&
                      <p className="text-sm">Date: { reportData.date}</p>
                    }
                    
                    {
                      reportData.totalAppointments != '' &&(
                        <p className="text-sm">Total Appointments: {reportData.totalAppointments}</p>
                        )
                    }
                    {
                      reportData.totalCompleted != '' && (
                        <p className="text-sm">Completed Appointments: {reportData.totalCompleted}</p>
                      )
                    }
                    {
                      reportData.totalCanceled != '' &&
                        <p className="text-sm">Cancelled Appointments: {reportData.totalCanceled}</p>
                    }
                    {
                      reportData.earnings != '' &&(
                      <p className="text-sm">Total Earnings: {'Rs.' + reportData.earnings}</p>
                      )
                    }
                  </div>
                </div>  
                </div>
                
                <Table className="rounded-md border" >
                    <TableHeader className="border-y-2 bg-slate-200">
                        {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            )
                            })}
                        </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className=" ">
                        {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                                </TableCell>
                            ))}
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                            >
                            No results.
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
        <DataTablePagination table={table}/>
    </div>
  )
}