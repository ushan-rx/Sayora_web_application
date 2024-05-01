import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Sidebar from './sidebar'
import Navbar from "../components/shared/NavbarTop";
import { Outlet } from 'react-router-dom';
import Cookies from "js-cookie";

function PatientDashboard(){
    const patientId = Cookies.get("roleId")
    const [patientName, setPatientName] = useState("")
    const [patientPhoto, setPatientPhoto] = useState("")

    const[suc, setSuc] =  useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const  getUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1/patient/${patientId}`);
          console.log(response.data)
          if(response.data){
            setPatientName(response.data.patient.fName + " " + response.data.patient.lName)
            setPatientPhoto(response.data.patient.profilePic)
          }
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/api/v1/auth/PatientDashboard')
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
        <div className="flex">
            <Sidebar role={"patient"}/>
            <main className="flex-1 py-0 mx-auto max-w-8xl">
                <Navbar photo={patientPhoto} name={patientName}/>
                <Outlet/>
            </main>
        </div>
        
    );
}

export default PatientDashboard;