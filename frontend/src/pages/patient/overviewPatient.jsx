import React from 'react'
import { Calendar } from "@/components/ui/calendar"


function overview() {
  return (
    <div>
    <div className="flex flex-col md:flex-row">
      <div className="p-4 bg-gray-200 md:w-4/5">Column 1</div>
      <div className="p-4 bg-white md:w-1/4">
      <h2 className="mb-4 text-xl font-bold">Nearest Treatment</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Square Card 1 */}
          <div className="px-6 py-4 bg-[#089BAB] border border-gray-300 rounded-2xl">
            <div className="flex justify-between">
              <div>
                <div className="text-center text-white text-m">Aug</div>
                <div className="text-5xl font-bold text-white">26</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white">Dr. John Doe</div>
                <div className="mb-4 text-xs text-white">Skin therepist</div>
                <div className="p-2 text-lg bg-[#e0eff1] rounded-lg ">9:00 AM</div>
              </div>
            </div>
          </div>
          {/* Square Card 2 */}
          <div className="p-4 bg-white border border-gray-300 rounded-2xl">
            <div className="flex justify-between">
              <div>
                <div className="text-sm text-gray-500">Sep</div>
                <div className="text-4xl font-bold">15</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-700">Dr. Jane Smith</div>
                <div className="text-lg">2:30 PM</div>
              </div>
            </div>
          </div>
          {/* Square Card 2 */}
          <div className="p-4 bg-white border border-gray-300 rounded-2xl">
            <div className="flex justify-between">
              <div>
                <div className="text-sm text-gray-500">Sep</div>
                <div className="text-4xl font-bold">15</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-700">Dr. Jane Smith</div>
                <div className="text-lg">2:30 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="object-center p-4 bg-white md:w-1/4">
        <div className='flex justify-center'>
          <Calendar className="my-4 border rounded-2xl"></Calendar>
        </div>
        
      </div>
    </div>
    </div>
  )
}

export default overview
