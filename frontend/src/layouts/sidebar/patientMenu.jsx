import React from "react";
import { NavLink } from "react-router-dom";
import SubMenu from "./SubMenu";

//icons
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { GiMedicines } from "react-icons/gi";

function PatientMenu() {
  const path = "/patient";

  // items with sub menus
  const subMenusList = [
    {
      name: "treatments", //display name
      path: "/patient/treatments", // main path
      icon: RiBuilding3Line,
      menus: [
        { subName: "my tretments", subPath: "mytretments" },
        { subName: "new schedule", subPath: "newshedule" },
      ],
    },

    {
      name: "My records",
      path: "/patient/myrecords",
      icon: TbReportAnalytics,
      menus: [
        { subName: "test reports", subPath: "reportpatient" }, //sub menu diplay name and path(dont add / before path)
        { subName: "daily uploads", subPath: "dailyuploads" },
        { subName: "My care profile", subPath: "mycareprofile" },
      ],
    },
  ];

  return (
    <>
      {/* include single menu items here */}
      <li>
        <NavLink to={path + "/overview"} className="link">
          <AiOutlineAppstore size={23} className="min-w-max" />
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to={path + "/prescription"} className="link">
          <BsPerson size={23} className="min-w-max" />
          Prescription
        </NavLink>
      </li>

      <li>
        <NavLink to={path + "/appoinmet_path"} className="link">
          <HiOutlineDatabase size={23} className="min-w-max" />
          Appoinments
        </NavLink>
      </li>

      <li>
        <NavLink to={path + "/requesition"} className="link">
          <HiOutlineDatabase size={23} className="min-w-max" />
          Requesition
        </NavLink>
      </li>

      <li>
        <NavLink to={path + "/product"} className="link">
          <GiMedicines size={23} className="min-w-max" />
          Ayurvedic Products
        </NavLink>
      </li>

      <li>
        <NavLink to={path + "/purchase"} className="link">
          <GiMedicines size={23} className="min-w-max" />
          Purchase History
        </NavLink>
      </li>

     

      
      {/* attach sub menu items  */}
      <div name="submenu-items">
        {subMenusList?.map((menu) => (
          <div key={menu.name} className="flex flex-col gap-1">
            <SubMenu data={menu} />
          </div>
        ))}
      </div>
    </>
  );
}

export default PatientMenu;
