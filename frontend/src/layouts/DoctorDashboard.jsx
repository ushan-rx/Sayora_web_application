import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Sidebar from './sidebar'
import Navbar from "../components/shared/NavbarTop";
import { Outlet } from 'react-router-dom';
import Cookies from "js-cookie";


function DoctorDashboard(){
    const doctorId = Cookies.get("roleId")
    const [doctorName, setDoctorName] = useState("")
    const [doctorPhoto, setDoctorPhoto] = useState("")

    const[suc, setSuc] =  useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const  getUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1/doctor/${doctorId}`);
          console.log(response.data)
          if(response.data){
            setDoctorName(response.data.doctor.fName + " " + response.data.doctor.lName)
            setDoctorPhoto(response.data.doctor.profilePic)
          }
        } catch (error) {
          console.error(error);
        }
    }


    useEffect(()=>{
        axios.get('http://localhost:5000/api/v1/auth/DoctorDashboard')
          .then(res=>{
            if(res.data.stat === "Success"){
                setSuc("Successed ok")
                getUserDetails();
            }else{
                navigate('/login')
            }
          }).catch(err=>console.log(err))

    },[])

    return(
        <div className="flex ">
            <Sidebar role={"doc"}/>
            <main className="flex-1 py-0 mx-auto max-w-8xl">
                <Navbar photo={doctorPhoto} name={doctorName}/>
                <Outlet/>
            </main>
        </div>
        
    );
}

export default DoctorDashboard;