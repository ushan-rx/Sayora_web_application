import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const SubMenu = ({data}) => {
  const {pathname} = useLocation()
  const [subMenuOpen,setSubMenuOpen] = useState(false)
  return (
  <div>
    <li className={`link ${pathname.includes(data.name) && "text-blue-600"}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
    >
      <data.icon size={23} className="min-w-max"/>
      <p className="flex-1 capitalize">{data.name}</p>
      <IoIosArrowDown className={`${subMenuOpen && 'rotate-180'} duration-200`}/>
    </li>
    <motion.ul 
    animate={
      subMenuOpen
      ?{
        height: "fit-content",
      }
      :{
        height: 0,
      }
    }
    className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden">
      {
        data.menus?.map((menu) => (
          <li key={menu}>
            <NavLink to={`${data.name}/${menu.subPath}`} className="link !bg-transparent capitalize">{menu.subName}</NavLink>
          </li>
        ))
      }
    </motion.ul>
  </div>
  )
}

export default SubMenu;