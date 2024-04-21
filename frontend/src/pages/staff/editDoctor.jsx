import React, { useState, useEffect } from 'react';
import { z } from 'zod';

// Define the schema using Zod
const doctorSchema = z.object({
  fName: z.string().min(1, "First name is required."),
  lName: z.string().min(1, "Last name is required."),
  phone: z.string().min(10, "Phone number must be at least 10 digits long.").regex(/^\d+$/, "Phone number must be numeric."),
  address: z.object({
    street: z.string().min(1, "Street is required."),
    city: z.string().min(1, "City is required."),
    state: z.string().min(1, "State is required.")
  }),
  specialization: z.array(z.object({
    name: z.string()
  }))
});

function EditDoctor({ isOpen, handleClose, doctor, handleUpdate }) {
  const [formData, setFormData] = useState({
    fName: doctor.fName,
    lName: doctor.lName,
    phone: doctor.phone,
    address: doctor.address || { street: '', city: '', state: '' },
    specialization: doctor.specialization || []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      fName: doctor.fName,
      lName: doctor.lName,
      phone: doctor.phone,
      address: doctor.address || { street: '', city: '', state: '' },
      specialization: doctor.specialization || []
    });
  }, [doctor]);

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

  const handleSpecializationChange = (index, value) => {
    const updatedSpecialization = [...formData.specialization];
    updatedSpecialization[index] = { name: value };
    setFormData(prev => ({ ...prev, specialization: updatedSpecialization }));
  };

  const addSpecialization = () => {
    setFormData(prev => ({
      ...prev,
      specialization: [...prev.specialization, { name: "" }]
    }));
  };

  const removeSpecialization = (index) => {
    const updatedSpecialization = [...formData.specialization];
    updatedSpecialization.splice(index, 1);
    setFormData(prev => ({ ...prev, specialization: updatedSpecialization }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = doctorSchema.safeParse(formData);
    if (!result.success) {
      const newErrors = result.error.flatten().fieldErrors;
      setErrors(Object.keys(newErrors).reduce((acc, key) => {
        // Flatten nested errors for address and specialization
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
      handleUpdate(doctor.doctorId, formData);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg space-y-4">
        <h2 className="text-lg font-bold mb-4">Edit Doctor</h2>
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

          <div>
            <h3 className="text-lg font-bold">Specialization:</h3>
            {formData.specialization.map((spec, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={spec.name}
                  onChange={(e) => handleSpecializationChange(index, e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 w-full"
                />
                <button onClick={() => removeSpecialization(index)} type="button" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                  Remove
                </button>
              </div>
            ))}
            <button onClick={addSpecialization} type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
              Add Specialization
            </button>
          </div>

          <div className="flex justify-between space-x-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex-grow">
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

export default EditDoctor;
