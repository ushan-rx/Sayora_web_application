import React from 'react'
import { NavLink } from 'react-router-dom'
import SubMenu from "./SubMenu";

//icons
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { FaUserMd } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUserInjured } from "react-icons/fa";

function staffMenu() {
  const path = "/staff";

  // items with sub menus
  const subMenusList = [
    {
        name: "ManageStaff",           //display name
        path: "/manage",          // main path
        icon: FaUserTie,
        menus: [
          {subName: "Overview", subPath: "overview"},
          {subName: "Add Staff", subPath: "add"},
        ],

        
      },

      {
        name: "ManagePatients",           //display name
        path: "/managepatient",          // main path
        icon: FaUserInjured,
        menus: [
          {subName: "Overview", subPath: "overview"},
          {subName: "Add Patient", subPath: "add"},
        ],

        
      },

      {
        name: "ManageLeaves",           //display name
        path: "/manageleaves",          // main path
        icon: FaUserInjured,
        menus: [
          {subName: "Overview", subPath: "overview"},
          {subName: "Add Patient", subPath: "add"},
        ],

        
      },

      {
        name: "StaffProfile",           //display name
        path: "/manageleaves",          // main path
        icon: FaUserInjured,
        menus: [
          {subName: "Overview", subPath: "overview"},
          {subName: "Apply Leave", subPath: "leaves/apply"},
          {subName: "My Leaves", subPath: "leaves/my"},
        ],

       
      },

      //kaumal
      {
        name: "Treatment",           //display name
        path: "/treatment",          // main path
        icon: FaUserInjured,
        menus: [
          {subName: "Add Treatmenet", subPath: "addTreat"},
          {subName: "Manage Treatment", subPath: "viewTreat"},
          
        ],

      },
      {
        name: "Cashier",           //display name
        path: "/cashier",          // main path
        icon: FaUserInjured,
        menus: [
          {subName: "Invoice", subPath: "cashier"},
          {subName: "Manage Invoice", subPath: "viewCash"},
          
        ],

      },

       //kaumal
      {
        name: "Sub Topic 2",    
        path: "/subtopic2",    
        icon: TbReportAnalytics,
        menus: [
          {subName: "overview", subPath: "overview"},  //sub menu diplay name and path(dont add / before path)
          {subName: "sub 1.2", subPath: "sub1.2"},
        ],
      },
  ];


return (
  <>
    {/* include single menu items here */}
    <li>
        <NavLink to={path + "/"} className="link">
            <AiOutlineAppstore size={23} className="min-w-max" />
            Overview
        </NavLink>
    </li>

    <li>
        <NavLink to={path + "/authentication"} className="link">
            <BsPerson size={23} className="min-w-max" />
            Medical Records
        </NavLink>
    </li>

    <li>
        <NavLink to={path + "/stroage"} className="link">
            <HiOutlineDatabase size={23} className="min-w-max" />
            Topic 3
        </NavLink>    
    </li>

    {/* attach sub menu items  */}
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

export default staffMenu