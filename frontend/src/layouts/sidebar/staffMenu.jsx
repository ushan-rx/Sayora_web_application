import React from 'react'
import { NavLink } from 'react-router-dom'
import SubMenu from "./SubMenu";
import Cookies from 'js-cookie';

//icons
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { FaUserMd } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUserInjured } from "react-icons/fa";
import { ImAirplane } from "react-icons/im";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { AiFillMedicineBox } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import {FaRegCalendarPlus,FaMoneyBillWave} from 'react-icons/fa';
import {MdOutlineEventNote } from 'react-icons/md';

import {FaAddressBook} from "react-icons/fa";

import { MdWarehouse } from "react-icons/md";



function staffMenu() {
  const path = "/staff";


  const jobRole=Cookies.get("staffRole")

  const roleAccess = {
    systemadmin: ["Manage Staff", "Staff Profile", "Manage Doctors","Manage Patients","Manage Leaves","Treatment","Cashier","Product","Overview","Salary Management","Manage Attendance","service","Manage Inventory","Appointments"],
    doctor: ["ManageDoctor", "Treatment"],
    cashier: ["Cashier"],
    appointmentmanager: ["Overview","Appointments","Staff Profile"],
    servicehandler: ["Overview","service","Staff Profile"],
    inventorymanager: ["Overview","Manage Inventory","Staff Profile"], 
    staffmanager: ["Overview","Manage Staff","Salary Management","Manage Leaves","Manage Attendance","Staff Profile"], 
    productmanager: ["Overview","Product","Staff Profile"], 
  };
  

  // items with sub menus
  const subMenusList = [
    {
        name: "Manage Staff",           //display name
        path: "/staff/managestaff",          // main path
        icon: FaUserTie,
        menus: [
          {subName: "Overview", subPath: "overview"},
          {subName: "Add Staff", subPath: "add"},
        ],

        
      },

      {
        name: "Manage Doctors",           //display name
        path: "/staff/managedoctor",          // main path
        icon: FaUserDoctor,
        menus: [
          {subName: "Overview", subPath: "overview"},
          {subName: "Add Doctor", subPath: "add"},
        ],

        
      },

      {
        name: "Manage Patients",           //display name
        path: "/staff/managepatients",          // main path
        icon: FaUser,
        menus: [
          {subName: "Overview", subPath: "overview"},
          {subName: "Add Patient", subPath: "add"},
        ],

        
      },

    
      {
        name: "Salary Management",           //display name
        path: "/staff/managesalary",          // main path
        icon: FaMoneyBillWave,
        menus: [
          {subName: "Overview", subPath: "overview"},
         
        ],

       
      },

      

      {
        name: "Manage Attendance",           //display name
        path: "/staff/attendance",          // main path
        icon: IoMdCheckmarkCircleOutline,
        menus: [
          {subName: "Overview", subPath: "overview"},
          
        ],

       
      },
      {
        name: "Manage Leaves",           //display name
        path: "/staff/manageleaves",          // main path
        icon: FaRegCalendarPlus,
        menus: [
          {subName: "Overview", subPath: "overview"},
          
        ],

        
      },

      //kaumal
      {
        name: "Treatment",           //display name
        path: "/staff/treatment",          // main path
        icon: AiFillMedicineBox,
        menus: [
          {subName: "Add Treatmenet", subPath: "addTreat"},
          {subName: "Manage Treatment", subPath: "viewTreat"},
          
        ],

      },

      {
        name: "service",           //display name
        path: "/staff",          // main path
        icon: FaAddressBook,
        menus: [
          {subName: "View", subPath: "service/viewBookedServices"},
          {subName: "Add", subPath: "addServices"},
          
        ],

        
      },



      {
        name: "Cashier",           //display name
        path: "/staff/cashier",          // main path
        icon: FaFileInvoice,
        menus: [
          {subName: "Invoice", subPath: "cashier"},
          {subName: "Manage Invoice", subPath: "viewCash"},
          
        ],

      },

      {
        name: "Manage Inventory",           //display name
        path: "/staff/inventory",          // main path
        icon: MdWarehouse,
        menus: [
          {subName: "Overview", subPath: "overview"},
          {subName: "Orders", subPath: "orders"},
          {subName: "Suppliers", subPath: "suppliers"},
          {subName: "Inventory", subPath: "view"},
          
        ],

      },


      {
        name: "Product",    
        path: "/staff/product",    
        icon: FaCartShopping,
        menus: [
          {subName: "Product List", subPath: "viewProduct"},
          // {subName: "Add products", subPath: "add"},  //sub menu diplay name and path(dont add / before path)
          // {subName: "Update products", subPath: "viewproduct/product/update-product"},
          {subName: "Orders", subPath: "adminOrder"},
         
          
        ],
      },

      {
        name: "Appointments",    
        path: "/staff/appointment",    
        icon: MdOutlineEventNote,
        menus: [
          {subName: "Add Schedule Time", subPath: "addtime"},
          // {subName: "Add products", subPath: "add"},  //sub menu diplay name and path(dont add / before path)
          // {subName: "Update products", subPath: "viewproduct/product/update-product"},
          {subName: "View Appointments", subPath: "view"},
          {subName: "Appointment Times", subPath: "time"},
         
          
        ],
      },

      {
        name: "Staff Profile",           //display name
        path: "/staff/staffprofile",          // main path
        icon: FaUser,
        menus: [
          {subName: "Overview", subPath: "overview"},
          {subName: "My Salary", subPath: "mysalary"},
          {subName: "Mark Attendance", subPath: "attendance/mark"},
          {subName: "Apply Leave", subPath: "leaves/apply"},
          {subName: "My Leaves", subPath: "leaves/my"},
          
        ],

       
      },
  ];

  const accessibleSubMenus = subMenusList.filter(menu => roleAccess[jobRole]?.includes(menu.name));


return (
  <>
    {/* include single menu items here */}

    {roleAccess[jobRole]?.includes("Overview") && (
        <li>
          <NavLink to={`${path}/`} className="link">
            <AiOutlineAppstore size={23} className="min-w-max" />
            Overview
          </NavLink>
        </li>
      )}



  

    {/* attach sub menu items  */}
    <div name='submenu-items'>
        {accessibleSubMenus?.map((menu) => (
            <div key={menu.name} className="flex flex-col gap-1">
            <SubMenu data={menu} />
            </div>
        ))}
    </div>

  </>
)
}

export default staffMenu