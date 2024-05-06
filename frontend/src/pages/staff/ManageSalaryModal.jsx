import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';

const ManageSalaryModal = ({ isOpen, handleClose, staffMember, apiUrl }) => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (staffMember) {
      fetchStaffSalaries(staffMember.staffId);
    }
  }, [staffMember]);

  const fetchStaffSalaries = (staffId) => {
    axios.get(`http://localhost:5000/staff/salary/staff/${staffId}`)
      .then(response => {
        setSalaries(response.data);  // Assuming the API returns an array of salary records
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch staff salaries:', error);
        setLoading(false);
      });
  };

  if (!isOpen || !staffMember) return null;

  return (
    <Transition.Root show={isOpen} as="div">
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={handleClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as="div"
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as="div"
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div className="p-6 overflow-auto max-h-96">
              <button
                className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-900"
                onClick={handleClose}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <h2 className="text-lg font-medium mb-4">Manage Salary for {staffMember.fName} {staffMember.lName}</h2>
              {loading ? (
                <p>Loading...</p>
              ) : salaries.length > 0 ? (
                <table className="min-w-full leading-normal mt-4">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Salary ID</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Base Salary</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deductions</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Bonus</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Net Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaries.map((salary, index) => (
                      <tr key={index}>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">{salary.salaryId}</td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">{salary.baseSalary}</td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">{salary.deductions}</td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">{salary.Bonus}</td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">{salary.netSalary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No salary information found for this staff member.</p>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ManageSalaryModal;
