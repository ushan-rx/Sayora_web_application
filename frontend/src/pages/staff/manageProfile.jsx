import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { uploadImage } from "@/utils/imageUpload"; // Make sure this is correctly implemented
import { z } from 'zod';

// Define the schema using Zod
const staffSchema = z.object({
  fName: z.string().min(1, "First name is required."),
  lName: z.string().min(1, "Last name is required."),
  phone: z.string().min(10, "Phone number must be at least 10 digits long.").regex(/^\d+$/, "Phone number must be numeric."),
  email: z.string().email("Invalid email address."),
  JobRole: z.enum(['systemadmin', 'staffmanager', 'medicalsecratary'], "Job role is required."),
  Image: z.string().optional()
});

const StaffProfile = () => {
    const [staff, setStaff] = useState({});
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStaff = async () => {
            const staffId = Cookies.get('staffId');
            try {
                const { data } = await axios.get(`http://localhost:5000/api/v1/staff/${staffId}`);
                setStaff(data);
                setFormData(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch staff data:", error);
            }
        };
        fetchStaff();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' })); // Clear errors when the user starts correcting them
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = staffSchema.safeParse(formData);
        if (!result.success) {
            const newErrors = result.error.flatten().fieldErrors;
            setErrors(newErrors);
        } else {
            setLoading(true); // Set loading to true during the update process
            try {
                let imageUrl = staff.staff.Image; // Default to existing image URL
                if (file) {
                    imageUrl = await uploadImage(file);
                    formData.staff.Image = imageUrl;
                }

                const response = await axios.put(`http://localhost:5000/api/v1/staff/${staff.staff.staffId}`, formData);
                setStaff(response.data);
                setFormData(response.data);
                alert('Profile updated successfully!');
            } catch (error) {
                console.error('Failed to update profile:', error);
                alert('Failed to update profile. See console for details.');
            } finally {
                setLoading(false); // Ensure loading is set to false after the operation
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex justify-between p-10 space-x-10 bg-cyan-500 text-white">
            {/* Profile Display Section */}
            <div className="flex flex-col items-center space-y-4">
                <img src={staff.staff.Image || 'default-profile.jpg'} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white" />
                <h2 className="text-lg font-bold">{`${staff.staff.fName} ${staff.staff.lName}`}</h2>
                <p>{staff.staff.phone}</p>
                <p>{staff.staff.JobRole}</p>
                
            </div>
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white text-cyan-900 p-4 rounded shadow-lg overflow-auto max-h-screen">
                <Field label="First Name" name="fName" value={formData.staff.fName} onChange={handleChange} error={errors.fName} />
                <Field label="Last Name" name="lName" value={formData.staff.lName} onChange={handleChange} error={errors.lName} />
                <Field label="Phone" name="phone" value={formData.staff.phone} onChange={handleChange} error={errors.phone} />
                
                
                <div className="space-y-2">
                    <label htmlFor="file" className="text-sm font-medium">Profile Image:</label>
                    <input type="file" id="file" onChange={handleFileChange} className="p-2 border rounded border-cyan-500 w-full" />
                </div>
                <button type="submit" className="px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-800 w-full mt-4">Update Profile</button>
            </form>
        </div>
    );
};

// Helper component for rendering form fields
const Field = ({ label, name, value, onChange, error, type = 'input', options = [] }) => (
    <div className="space-y-2">
        <label className="block mb-3">
            {label}:
            {type === 'select' ? (
                <select name={name} value={value} onChange={onChange} className="border border-gray-300 rounded px-3 py-1 w-full">
                    {options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            ) : (
                <input
                    type={type === 'input' ? 'text' : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="border border-gray-300 rounded px-3 py-1 w-full"
                />
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </label>
    </div>
);

export default StaffProfile;
