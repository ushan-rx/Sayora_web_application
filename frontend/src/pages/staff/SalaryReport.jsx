import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import ReactToPrint from 'react-to-print';

const SalaryReport = ({ isOpen, closeModal, salary, staff }) => {
  const [staffDetails, setStaffDetails] = useState({});
  const reportRef = useRef();
  

  useEffect(() => {
    const fetchStaffDetails = async () => {
      if (!staff) {
        console.error('Invalid staffId:', staff);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/staff/${staff}`);
        setStaffDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch staff details:', error);
      }
    };

    if (isOpen && staff) {
      fetchStaffDetails();
    }
  }, [isOpen, staff]);



  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
          <Dialog.Panel className="w-full max-w-md p-6 my-8 mx-auto bg-white rounded-md">
            <Dialog.Title>Salary Payslip</Dialog.Title>
            <Dialog.Description>
              Sayora Staff Management
            </Dialog.Description>
            {salary && (
              <div ref={reportRef} className="mt-4">
                {/* Report content for printing */}
                <div className="w-3/4 h-3/4 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="px-4 py-4 h-full flex flex-col">
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-cyan-700 my-4">Salary Payslip</h2>
                      <p className="text-sm text-gray-600">Month: {salary.salaryMonth}</p>
                      <p className="text-sm text-gray-600">SalaryID: {salary.salaryId}</p>
                      <p className="text-sm text-gray-600">Assigned Date:{salary.paymentDate}</p>
                    </div>

                    <hr className="my-2 border-gray-200" />
                      <div className="flex justify-between font-bold">
                        <span>Staff Details</span>
                        
                      </div>
                      <hr className="my-2 border-gray-200" />
                    <div className="mt-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Staff Name:</span>
                        <span>{salary.staffName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Staff ID:</span>
                        <span>{staff}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bank Account:</span>
                        <span>{salary.bankAcc}</span>
                      </div>
                      <hr className="my-2 border-gray-200" />
                      <div className="flex justify-between font-bold">
                        <span>Calculation</span>
                        <span>LKR</span>
                      </div>
                      <hr className="my-2 border-gray-200" />
                    
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Salary:</span>
                        <span>+{salary.baseSalary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bonus:</span>
                        <span>+{salary.Bonus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Deductions:</span>
                        <span>-{salary.deductions}</span>
                      </div>
                      <hr className="my-2 border-gray-200" />
                      <div className="flex justify-between font-bold">
                        <span>Net Salary:</span>
                        
                        <span>{salary.netSalary}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
           
              <div className="mt-4">
                {/* Control buttons */}
                <button onClick={closeModal} className="bg-cyan-500 text-white px-4 py-2 rounded mr-4">Close</button>
                <ReactToPrint
                  trigger={() => <button className="bg-red-500 text-white px-4 py-2 rounded">Print Report</button>}
                  content={() => reportRef.current}
                 
                />
              </div>
          
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SalaryReport;
