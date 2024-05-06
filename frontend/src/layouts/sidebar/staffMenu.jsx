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
import { ImAirplane } from "react-icons/im";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { AiFillMedicineBox } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";

import {FaAddressBook} from "react-icons/fa";

import { MdWarehouse } from "react-icons/md";



function staffMenu() {
  const path = "/staff";

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
        name: "Manage Doctor",           //display name
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
        name: "Manage Leaves",           //display name
        path: "/staff/manageleaves",          // main path
        icon: FaShoppingBag,
        menus: [
          {subName: "Overview", subPath: "overview"},
          
        ],

        
      },

      {
        name: "Staff Profile",           //display name
        path: "/staff/staffprofile",          // main path
        icon: FaUser,
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
        path: "/cashier",          // main path
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
        icon: FaCartShopping,
        menus: [
          {subName: "Add Schedule Time", subPath: "addtime"},
          // {subName: "Add products", subPath: "add"},  //sub menu diplay name and path(dont add / before path)
          // {subName: "Update products", subPath: "viewproduct/product/update-product"},
          {subName: "View Appointments", subPath: "view"},
          {subName: "Appointment Times", subPath: "time"},
         
          
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