import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

function LeaveModal({ isOpen, onClose, leave, onStatusChange }) {
  const updateLeaveStatus = async (status) => {
    try {
      await axios.put(`http://localhost:5000/staff/leaves/${leave.leavesId}`, { status });
      onStatusChange(); // Notify parent component of the update
      onClose(); // Close modal after update
    } catch (error) {
      console.error('Failed to update leave status', error);
    }
  };

  const deleteLeave = async () => {
    try {
      await axios.delete(`http://localhost:5000/staff/leaves/${leave.leavesId}`);
      onStatusChange(); // Notify parent component of the deletion
      onClose(); // Close modal after deletion
    } catch (error) {
      console.error('Failed to delete leave', error);
    }
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Leave Details
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500 space-y-2">
                  {/* Displaying leave details */}
                  <span className="block font-bold text-cyan-500">Leave ID:</span> {leave.leavesId}
                  <span className="block font-bold text-cyan-500">Staff ID:</span> {leave.staffId}
                  <span className="block font-bold text-cyan-500">Name:</span> {leave.staffName}
                  <span className="block font-bold text-cyan-500">Job Role:</span> {leave.JobRole}
                  <span className="block font-bold text-cyan-500">Status:</span> {leave.status}
                  <span className="block font-bold text-cyan-500">Start Time:</span> {new Date(leave.leaveStartTime).toLocaleString()}
                  <span className="block font-bold text-cyan-500">End Time:</span> {new Date(leave.leaveEndTime).toLocaleString()}
                  <span className="block font-bold text-cyan-500">Reason:</span> {leave.reason}
                </p>
              </div>
              <div className="mt-4 flex justify-around">
                <button onClick={() => updateLeaveStatus('approved')} className="...">Approve</button>
                <button onClick={() => updateLeaveStatus('rejected')} className="...">Reject</button>
                <button onClick={deleteLeave} className="...">Delete</button> {/* New delete button */}
                <button onClick={onClose} className="...">Cancel</button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default LeaveModal;
