import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarker, FaLinkedin, FaFacebook, FaTwitter, FaInstagram ,FaMoneyBillWave, FaCalendarAlt, FaRegCalendarPlus} from 'react-icons/fa';
import { IoMdContact } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import Cookies from "js-cookie";

function StaffProfile() {
    const staffName = Cookies.get("staffName");
    const jobRole=Cookies.get("staffRole")
  const profiles = [
    
   
    { icon: <IoMdContact size={40} />, text: 'Home Page', url: 'http://localhost:5173' },
    { icon: <FaMoneyBillWave size={30} />, text: 'My Salary', url: 'http://localhost:5173/staff/staffprofile/mysalary' },
    { icon: <FaCalendarAlt size={30} />, text: 'My Leaves', url: 'http://localhost:5173/staff/staffprofile/leaves/my' },
    { icon: <FaRegCalendarPlus size={30} />, text: 'Apply Leaves', url: '/staff/staffprofile/leaves/apply' },
    { icon: <IoMdCheckmarkCircleOutline size={30} />, text: 'Mark Attendance', url: '/staff/staffprofile/attendance/mark' },
    { icon: <FaUser size={40} />, text: ' Manage Profile', url: 'http://localhost:5173/staff/staffprofile/manage' },
  ];

  return (

    <div>
        <h3 className="text-2xl text-center font-bold text-cyan-700 my-4">Hello {staffName}, you are logged in as {jobRole}.</h3>
    <div className="grid grid-cols-3 gap-4 p-4">
        
      {profiles.map((profile, index) => (
        <a
          key={index}
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-500 hover:bg-cyan-700 text-white p-6 rounded-xl transition duration-300 ease-in-out flex flex-col items-center justify-center text-xl"
        >
          {profile.icon}
          <span className="mt-2">{profile.text}</span>
        </a>
      ))}
    </div>
    </div>
  );
}

export default StaffProfile;
