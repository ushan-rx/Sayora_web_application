import React, { useState } from 'react';

function EditStaff({ isOpen, handleClose, staffMember, handleUpdate }) {
  const [formData, setFormData] = useState({
    staffId: staffMember.staffId,
    userId: staffMember.userId,
    fName: staffMember.fName,
    lName: staffMember.lName,
    phone: staffMember.phone,
    Status: staffMember.Status,
    JobRole: staffMember.JobRole
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(staffMember.staffId, formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Edit Staff Member</h2>
        <form onSubmit={handleSubmit}>
         
          <label className="block mb-2">
            First Name:
            <input
              type="text"
              name="fName"
              value={formData.fName}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <label className="block mb-2">
            Last Name:
            <input
              type="text"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </label>

          <label className="block mb-2">
            First Name:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </label>
          {/* Include other fields similarly */}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
          <button onClick={handleClose} type="button" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStaff;
