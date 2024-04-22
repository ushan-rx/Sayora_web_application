import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";

import LogOut from "../../utils/LogoutHandler";

// * custom menu components
import DoctorMenu from "./doctorMenu";
import PatientMenu from "./patientMenu";
import StaffMenu from "./staffMenu";

const Sidebar = ({role}) => {
  
  const navigate = useNavigate()
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

      const logOutBtn = ()=>{
        const roleTemp = role
        LogOut();
        if(roleTemp === "doc" || roleTemp === "patient"){
            navigate('/')
        }else{
            navigate('/')
        }
  }


  return (
    <div className="fixed md:relative">
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[40] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-[#e0eff1] text-[#324054] shadow-xl z-[50] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img
            src="https://sayora.lk/wp-content/uploads/2023/04/SAYORA-LOGO-NEW.png"
            width={45}
            alt=""
          />
          {/* <span className="text-xl whitespace-pre"> Sayora Web</span> */}
        </div>

        <div className="flex flex-col h-full">
        <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300   md:h-[68%] h-[70%]">

            {/* custom navigation menu for doctor */}
          { role === "doc" ? (
              <DoctorMenu />
            ) : role === "patient" ? ( 
              <PatientMenu/>
            ) : role === "staff" ? (
              <StaffMenu/>
            ): <Navigate to="/login" />
          }

            {/* common navigation items */} 
              {/* <li>
                <NavLink to={"/settings"} className="link">
                  <SlSettings size={23} className="min-w-max" />
                  Settings
                </NavLink>
              </li> */}

        </ul>
          {open && (
            <div className="z-50 flex-1 w-full my-auto text-sm font-medium whitespace-pre max-h-48 ">
              <div className="flex items-center justify-between p-4 border-y border-slate-300">
                {/* <div>
                  <p>Lorem</p>
                  <small>Lrem ipsum</small>
                </div> */}
                <button className="text-white ml-4 py-1.5 px-3 text-md bg-red-500 rounded-xl"
                onClick={() => {logOutBtn()}}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: -20,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -20,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute z-50 hidden cursor-pointer w-fit h-fit md:block right-2 bottom-3"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
