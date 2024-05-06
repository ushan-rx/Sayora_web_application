import React, { useEffect, useState } from 'react';
import { MdPersonOutline, MdOutlineLocalHospital, MdOutlineShoppingCart, MdOutlineEventNote, MdOutlinePendingActions } from 'react-icons/md';
import { FaUserMd } from 'react-icons/fa';
import Cookies from "js-cookie";

import axios from 'axios';

const SDashboard = () => {
    const [ActiveStaffcount, setCount] = useState(0);
    const [PatientCount, setPatientCount] = useState(0);
    const [DoctorCount, setDoctorCount] = useState(0);
    const [ProductCount, setProductCount] = useState(0);
    const [AppoinmentCount, setAppoinmentCount] = useState(0);
    const [PendingLeavesCount, setPendingLeavesCount] = useState(0);

    
    const [isLoading, setIsLoading] = useState(true);
    const staffName = Cookies.get("staffName");
    const jobRole=Cookies.get("staffRole")

    useEffect(() => {
        const getActiveStaffCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/count/staff');
                setCount(response.data.count);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch active staff count:', error);
                setIsLoading(false);
            }
        };

        getActiveStaffCount();

        const getPatientCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/count/patient');
                setPatientCount(response.data.count);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch active staff count:', error);
                setIsLoading(false);
            }
        };

        getPatientCount();


        const getDoctorCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/count/doctor');
                setDoctorCount(response.data.count);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch active staff count:', error);
                setIsLoading(false);
            }
        };

        getDoctorCount();

        const getProductCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/count/product');
                setProductCount(response.data.count);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch active staff count:', error);
                setIsLoading(false);
            }
        };

        getProductCount();

        const getAppoinmentCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/count/appoinment');
                setAppoinmentCount(response.data.count);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch active staff count:', error);
                setIsLoading(false);
            }
        };

        getAppoinmentCount();

        const getPendingLeavesCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/count/leaves');
                setPendingLeavesCount(response.data.count);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch active staff count:', error);
                setIsLoading(false);
            }
        };

        getPendingLeavesCount();

    }, []);

    return (
<div>
<h3 className="text-2xl text-center font-bold text-cyan-700 my-4">Hello {staffName}, you are logged in as {jobRole}.</h3>
<div className="p-4 shadow-md rounded-lg bg-white grid grid-cols-3 gap-4">

    <div className="flex items-center space-x-3 border-4 border-cyan-500 rounded-lg p-4">
        <MdPersonOutline className="text-6xl text-cyan-500" />
        <div>
            {isLoading ? (
                <p className="text-xl text-cyan-500">Loading...</p>
            ) : (
                <>
                    <p className="text-lg text-cyan-500">Staff</p>
                    <p className="text-4xl font-bold text-cyan-500">{ActiveStaffcount}</p>
                </>
            )}
        </div>
    </div>

    <div className="flex items-center space-x-3 border-4 border-cyan-500 rounded-lg p-4">
        <MdOutlineLocalHospital className="text-6xl text-cyan-500" />
        <div>
            {isLoading ? (
                <p className="text-xl text-cyan-500">Loading...</p>
            ) : (
                <>
                    <p className="text-lg text-cyan-500">Patients</p>
                    <p className="text-4xl font-bold text-cyan-500">{PatientCount}</p>
                </>
            )}
        </div>
    </div>

    <div className="flex items-center space-x-3 border-4 border-cyan-500 rounded-lg p-4">
        <FaUserMd className="text-6xl text-cyan-500" /> {/* FontAwesome icon used for Doctors */}
        <div>
            {isLoading ? (
                <p className="text-xl text-cyan-500">Loading...</p>
            ) : (
                <>
                    <p className="text-lg text-cyan-500">Doctors</p>
                    <p className="text-4xl font-bold text-cyan-500">{DoctorCount}</p>
                </>
            )}
        </div>
    </div>

    <div className="flex items-center space-x-3 border-4 border-cyan-500 rounded-lg p-4">
        <MdOutlineShoppingCart className="text-6xl text-cyan-500" />
        <div>
            {isLoading ? (
                <p className="text-xl text-cyan-500">Loading...</p>
            ) : (
                <>
                    <p className="text-lg text-cyan-500">Products</p>
                    <p className="text-4xl font-bold text-cyan-500">{ProductCount}</p>
                </>
            )}
        </div>
    </div>

    <div className="flex items-center space-x-3 border-4 border-cyan-500 rounded-lg p-4">
        <MdOutlineEventNote className="text-6xl text-cyan-500" />
        <div>
            {isLoading ? (
                <p className="text-xl text-cyan-500">Loading...</p>
            ) : (
                <>
                    <p className="text-lg text-cyan-500">Appointments</p>
                    <p className="text-4xl font-bold text-cyan-500">{AppoinmentCount}</p>
                </>
            )}
        </div>
    </div>

    <div className="flex items-center space-x-3 border-4 border-cyan-500 rounded-lg p-4">
        <MdOutlinePendingActions className="text-6xl text-cyan-500" />
        <div>
            {isLoading ? (
                <p className="text-xl text-cyan-500">Loading...</p>
            ) : (
                <>
                    <p className="text-lg text-cyan-500">Pending Leave Requests</p>
                    <p className="text-4xl font-bold text-cyan-500">{PendingLeavesCount}</p>
                </>
            )}
        </div>
    </div>
</div>

</div>                

        

        
    );
};

export default SDashboard;
