import React from 'react'
import { NavLink } from 'react-router-dom'
import SubMenu from "./SubMenu";

//icons
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";

import { FaNotesMedical } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import {FaAddressBook} from "react-icons/fa";


function DoctorMenu() {
    const path = "/doctor";

    // items with sub menus
    const subMenusList = [
        {
          name: "reports",           //display name
          path: "/doctor/reports",          // main path
          icon: HiOutlineDocumentReport,
          menus: [
            {subName: "Appointment Report", subPath: "appointmentReport"},
            // {subName: "sub 1.2", subPath: "/sub1.2"},
          ],
        },

        {
            name: "Bookings",
            path: "/doctor",
            icon: FaAddressBook,
            menus: [
              {subName: "View Bookings", subPath: "serviceDoctorView"},
            ],
          },



        // {
        //   name: "Sub Topic 2",    
        //   path: "/subtopic2",    
        //   icon: TbReportAnalytics,
        //   menus: [
        //     {subName: "overview", subPath: "overview"},  //sub menu diplay name and path(dont add / before path)
        //     {subName: "sub 1.2", subPath: "sub1.2"},
        //   ],
        // },

        
      ];

  return (
    <>
        <li>
            <NavLink to={path + "/overview"} className="link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Overview
            </NavLink>
        </li>
        <li>
            <NavLink to={path + "/examination"} className="link">
                <FaNotesMedical  size={23} className="min-w-max" />
                Examination
            </NavLink>
        </li>

        
        {/* <li>
            <NavLink to={path + "/stroage"} className="link">
                <HiOutlineDatabase size={23} className="min-w-max" />
                Topic 3
            </NavLink>    
        </li> */}


        <div name='submenu-items'>
            {subMenusList?.map((menu) => (
                <div key={menu.name} className="flex flex-col gap-1">
                <SubMenu data={menu} />
                </div>
            ))}
        </div>

    </>
  )
}

export default DoctorMenu