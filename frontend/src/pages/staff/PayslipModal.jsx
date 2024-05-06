import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
//import Cookies from 'js-cookie';

class ComponentToPrint extends React.Component {
  render() {
    const { salaryDetails, staffDetails } = this.props;
    return (
      <div className="p-5 border rounded bg-white">
        <h2 className="text-lg font-bold mb-2">Salary Payslip</h2>
        <div>Staff ID: {salaryDetails.staffId}</div>
        <div>Staff Name: {salaryDetails.staffName}</div>
        <div>Base Salary: {salaryDetails.baseSalary}</div>
        <div>Deductions: {salaryDetails.deductions}</div>
        <div>Bonus: {salaryDetails.Bonus}</div>
        <div>Net Salary: {salaryDetails.netSalary}</div>
        <div className="mt-2">
          <h3 className="text-md font-bold">Manager Details</h3>
         
          
        </div>
      </div>
    );
  }
}

function PayslipModal({ isOpen, handleClose, salaryDetails, staffDetails }) {
  const componentRef = useRef();


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: handleClose  // Close modal after printing
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        <ComponentToPrint ref={componentRef} salaryDetails={salaryDetails} staffDetails={staffDetails} />
        <div className="flex justify-between items-center mt-4">
          <button onClick={handlePrint} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Print Payslip
          </button>
          <button onClick={handleClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayslipModal;
