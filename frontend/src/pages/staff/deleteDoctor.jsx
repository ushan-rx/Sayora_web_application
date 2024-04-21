import React from 'react';

function DeleteDoctor({ isOpen, handleClose, doctorId, handleDelete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this doctor?</p>
        <button onClick={() => handleDelete(doctorId)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
          Delete
        </button>
        <button onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteDoctor;
