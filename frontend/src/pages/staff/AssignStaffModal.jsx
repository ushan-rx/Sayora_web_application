import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import PayslipModal from './PayslipModal';  

function AssignSalaryModal({ isOpen, handleClose, staffMember, apiUrl,staffDetails }) {
  const [bankAcc, setBankAcc] = useState('');
  const [salaryMonth, setSalaryMonth] = useState(new Date().toISOString().slice(0, 7)); // Default to current month
  const [baseSalary, setBaseSalary] = useState(20000);
  const [deductions, setDeductions] = useState(500);
  const [Bonus, setBonus] = useState(2000);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [showPayslip, setShowPayslip] = useState(false);

  const netSalary = baseSalary + Bonus - deductions; // Calculate net salary




  const validateForm = () => {
    let newErrors = {};
    // Validation rules
    if (!bankAcc) {
      newErrors.bankAcc = 'Bank account number is required.';
  } else if (!/^\d{8,18}$/.test(bankAcc)) {
      // Assuming bank account numbers are between 8 and 18 digits
      newErrors.bankAcc = 'Invalid bank account number. Please enter a valid number.';
  }
    if (!salaryMonth) newErrors.salaryMonth = 'Salary month is required.';
    if (baseSalary < 0) newErrors.baseSalary = 'Base salary cannot be negative.';
    if (deductions < 0) newErrors.deductions = 'Deductions cannot be negative.';
    if (Bonus < 0) newErrors.Bonus = 'Bonus cannot be negative.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop the form submission if validation fails

    try {
      const response = await axios.post(apiUrl, {
        staffId: staffMember.staffId,
        staffName: `${staffMember.fName} ${staffMember.lName}`,
        bankAcc,
        salaryMonth,
        baseSalary,
        deductions,
        Bonus,
        netSalary
      });
      console.log('Salary assigned successfully:', response.data);
      setMessage('Salary successfully assigned.Now Check Mange Salary section to Gry Salary Report');
      //setShowPayslip(true);
      const staffDetails = {
        staffId: response.data.staffId,
        staffName: response.data.staffName,
        // Add other necessary details
      };
    } catch (error) {
      console.error('Error assigning salary:', error);
      setMessage('Failed to assign salary. Please try again.');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handlePayslipClose = () => {
    setShowPayslip(false);
    handleClose();  // Close the original modal as well
  };


  if (!isOpen) return null;

  return (
    <Transition.Root show={isOpen} as="div">
    <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={handleClose}>
      <div className="fixed inset-0 flex items-center justify-center">
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        </Transition.Child>

        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
        
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Assign Salary to {staffMember.fName} {staffMember.lName}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="bankAcc" className="block text-sm font-medium text-gray-700">Bank Account Number</label>
                  <input id="bankAcc" type="text" value={bankAcc} onChange={(e) => setBankAcc(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"/>
                  {errors.bankAcc && <p className="text-red-500 text-xs italic">{errors.bankAcc}</p>}
                </div>
                <div>
                  <label htmlFor="salaryMonth" className="block text-sm font-medium text-gray-700">Salary Month</label>
                  <input id="salaryMonth" type="month" value={salaryMonth} onChange={(e) => setSalaryMonth(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"/>
                  {errors.salaryMonth && <p className="text-red-500 text-xs italic">{errors.salaryMonth}</p>}
                </div>
                <div>
                  <label htmlFor="baseSalary" className="block text-sm font-medium text-gray-700">Base Salary</label>
                  <input id="baseSalary" type="number" value={baseSalary} onChange={(e) => setBaseSalary(parseInt(e.target.value))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"/>
                  {errors.baseSalary && <p className="text-red-500 text-xs italic">{errors.baseSalary}</p>}
                </div>
                <div>
                  <label htmlFor="deductions" className="block text-sm font-medium text-gray-700">Deductions</label>
                  <input id="deductions" type="number" value={deductions} onChange={(e) => setDeductions(parseInt(e.target.value))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"/>
                  {errors.deductions && <p className="text-red-500 text-xs italic">{errors.deductions}</p>}
                </div>
                <div>
                  <label htmlFor="Bonus" className="block text-sm font-medium text-gray-700">Bonus</label>
                  <input id="Bonus" type="number" value={Bonus} onChange={(e) => setBonus(parseInt(e.target.value))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"/>
                  {errors.Bonus && <p className="text-red-500 text-xs italic">{errors.Bonus}</p>}
                </div>
                <div className="font-medium text-sm text-gray-800">Net Salary: {netSalary}</div>
                <div className="text-center my-2 text-sm font-semibold">
                  {message && <div className={`${message.startsWith('Failed') ? 'text-red-500' : 'text-green-500'}`}>{message}</div>}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">Submit</button>
                  <button onClick={handleClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">Cancel</button>
                </div>
              </form>
            </div>
            {showPayslip && <PayslipModal isOpen={showPayslip} handleClose={handlePayslipClose} salaryDetails={{ baseSalary, deductions, Bonus, netSalary }} staffDetails={staffDetails} />}
          </div>
          </Transition.Child>
        </div>
      </Dialog>
     
    </Transition.Root>
  );
}

export default AssignSalaryModal;
