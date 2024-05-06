import React, { useState, useEffect } from 'react';
import { z } from 'zod';

// Define the schema using Zod
const staffSchema = z.object({
  fName: z.string().min(1, "First name is required."),
  lName: z.string().min(1, "Last name is required."),
  phone: z.string().min(10, "Phone number must be at least 10 digits long.").regex(/^\d+$/, "Phone number must be numeric."),
  JobRole: z.enum(['systemadmin', 'staffmanager', 'medicalsecratary'], "Job role is required.")
});

function EditStaff({ isOpen, handleClose, staffMember, handleUpdate }) {
  const [formData, setFormData] = useState({
    staffId: staffMember.staffId,
    userId: staffMember.userId,
    fName: staffMember.fName,
    lName: staffMember.lName,
    phone: staffMember.phone,
    JobRole: staffMember.JobRole || 'systemadmin'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      staffId: staffMember.staffId,
      userId: staffMember.userId,
      fName: staffMember.fName,
      lName: staffMember.lName,
      phone: staffMember.phone,
      JobRole: staffMember.JobRole || 'systemadmin'
    });
  }, [staffMember]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when the user starts correcting them
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data against the schema
    const result = staffSchema.safeParse(formData);
    if (!result.success) {
      // Transform the errors to a more friendly format
      const newErrors = result.error.flatten().fieldErrors;
      setErrors(newErrors);
    } else {
      handleUpdate(staffMember.staffId, formData);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg space-y-4">
        <h2 className="text-lg font-bold mb-4">Edit Staff Member</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block mb-3">
            First Name:
            <input
              type="text"
              name="fName"
              value={formData.fName}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-1 w-full"
            />
            {errors.fName && <p className="text-red-500 text-xs mt-1">{errors.fName}</p>}
          </label>

          <label className="block mb-3">
            Last Name:
            <input
              type="text"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-1 w-full"
            />
            {errors.lName && <p className="text-red-500 text-xs mt-1">{errors.lName}</p>}
          </label>

          <label className="block mb-3">
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-1 w-full"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </label>
          
          <label className="block mb-3">
            Job Role:
            <select name="JobRole"
              value={formData.JobRole}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-1 w-full"
            >
            
            <option value="systemadmin">System Admin</option>
            <option value="medicalsecretary">Medical Secretary</option>
            <option value="staffmanager">Staff Manager</option>
            <option value="appointmentmanager">Appointment Manager</option>
            <option value="inventorymanager">Inventory Manager</option>
            <option value="productmanager">Product Manager</option> 
            <option value="servicehandler">Service Handler</option>  
            </select>
            {errors.JobRole && <p className="text-red-500 text-xs mt-1">{errors.JobRole}</p>}
          </label>

          <div className="flex justify-between space-x-2">
            <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-700 flex-grow">
              Save Changes
            </button>
            <button onClick={handleClose} type="button" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex-grow">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStaff;

             
