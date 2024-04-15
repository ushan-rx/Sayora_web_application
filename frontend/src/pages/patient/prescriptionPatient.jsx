//presciption 9:02am

import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
function overview() {
  return (
    <div>
        <h2 className="m-4 text-2xl font-bold">My Records</h2> 
    <ScrollArea className="p-4 mx-20 border rounded-xl h-[580px]">
        
        <div className="grid grid-cols-1 gap-4">
            {/* report Card 1 */}
            <div className="px-6 py-4 border border-[#089BAB] rounded-2xl">
            <div className="flex justify-between">
                <div>
                <h2 className="mb-2 text-xl font-bold ">Treatment Report</h2>
                <div className=" text-[#089BAB] text-m">Date</div>
                <div className="font-normal text-md text-slate-800 ">26-Aug-2024</div>
                <div className=" text-[#089BAB] text-m">Time</div>
                <div className="font-normal text-md text-slate-800 ">12:45 PM</div>
                </div>
                <div className="text-right">
                    <button className="px-4 py-2 mb-2 text-white bg-blue-500 rounded-2xl">View</button>
                    <div></div>
                    <button className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-2xl">Download</button>
                    <div className="px-2 text-md text-red">Dr. John Doe</div>
                    <div className="px-2 mb-4 text-xs text-red">Skin therepist</div>
                    
                </div>
            </div>
            </div>
            {/* insert sesscond card start here */}
        </div>
    </ScrollArea>
    </div>
  )
}
export default overview
