import React, { useState } from 'react';
import { uploadImage } from "@/utils/imageUpload";

const ProfileUpdateComponent = ({ staff }) => {
  const [formData, setFormData] = useState(staff);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const imageUrl = await uploadImage(file); // Assume this uploads the image to Firebase and returns the URL
      formData.Image = imageUrl;
    }
    try {
      await updateStaff(formData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. See console for details.');
    }
  };

  // Define updateStaff function here
  const updateStaff = async (staffData) => {
    const response = await fetch(`http://localhost:5000/api/v1/staff/${staffData.staffId}`, {
      method: 'PUT', // or 'PATCH' depending on how your API is set up
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staffData)
    });

    if (!response.ok) {
      throw new Error('Failed to update staff data');
    }

    return response.json(); // or handle as needed
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="fName" value={formData.fName} onChange={handleChange} />
      <input type="text" name="lName" value={formData.lName} onChange={handleChange} />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileUpdateComponent;
