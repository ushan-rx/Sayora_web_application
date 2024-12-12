import React, { useState, useEffect } from 'react';
import { z } from 'zod';

// Define the schema using Zod
const patientSchema = z.object({
  fName: z.string().min(1, "First name is required."),
  lName: z.string().min(1, "Last name is required."),
  phone: z.string().min(10, "Phone number must be at least 10 digits long.").regex(/^\d+$/, "Phone number must be numeric."),
  address: z.object({
    street: z.string().min(1, "Street is required."),
    city: z.string().min(1, "City is required."),
    state: z.string().min(1, "State is required.")
  })
});

function EditPatient({ isOpen, handleClose, patient, handleUpdate }) {
  const [formData, setFormData] = useState({
    fName: patient.fName,
    lName: patient.lName,
    phone: patient.phone,
    address: patient.address || { street: '', city: '', state: '' }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      fName: patient.fName,
      lName: patient.lName,
      phone: patient.phone,
      address: patient.address || { street: '', city: '', state: '' }
    });
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = patientSchema.safeParse(formData);
    if (!result.success) {
      const newErrors = result.error.flatten().fieldErrors;
      setErrors(Object.keys(newErrors).reduce((acc, key) => {
        // Flatten nested errors for address
        if (typeof newErrors[key] === 'object' && !Array.isArray(newErrors[key])) {
          Object.keys(newErrors[key]).forEach(subKey => {
            acc[`${key}.${subKey}`] = newErrors[key][subKey];
          });
        } else {
          acc[key] = newErrors[key];
        }
        return acc;
      }, {}));
    } else {
      handleUpdate(patient.patientId, formData);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg space-y-4">
        <h2 className="text-lg font-bold mb-4">Edit Patient</h2>
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

          <div className="grid grid-cols-3 gap-4">
            <label className="block">
              Street:
              <input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
              {errors['address.street'] && <p className="text-red-500 text-xs mt-1">{errors['address.street']}</p>}
            </label>
            <label className="block">
              City:
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
              {errors['address.city'] && <p className="text-red-500 text-xs mt-1">{errors['address.city']}</p>}
            </label>
            <label className="block">
              State:
              <input
                type="text"
                name="state"
                value={formData.address.state}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
              {errors['address.state'] && <p className="text-red-500 text-xs mt-1">{errors['address.state']}</p>}
            </label>
          </div>

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

export default EditPatient;
