import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Sidebar from './sidebar'
import Navbar from "../components/shared/NavbarTop";
import { Outlet } from 'react-router-dom';
import Cookies from "js-cookie";

function StaffDashboard(){
    const staffId = Cookies.get("staffId")
    const [staffName, setStaffName] = useState("")
    const [staffPhoto, setStaffPhoto] = useState("")

    const[suc, setSuc] =  useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const  getUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1/staff/${staffId}`);
          console.log(response.data)
          if(response.data){
            setStaffName(response.data.staff.fName + " " + response.data.staff.lName)
            setStaffPhoto(response.data.staff.Image)
          }
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/api/v1/staffAuth/StaffDashboard')
          .then(res=>{
            if(res.data.stat === "Success"){
                setSuc("Successed ok")
                getUserDetails();
            }else{
                navigate('/stafflogin')
            }
          }).catch(err=>console.log(err))
      
    },[])

    return(
        <div className="flex">
            <Sidebar role={"staff"}/>
            <main className="flex-1 py-0 mx-auto max-w-8xl">
                <Navbar photo={staffPhoto} name={staffName}/>
                <Outlet/>
            </main>
        </div>
        
    );
}

export default StaffDashboard;