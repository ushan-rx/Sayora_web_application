import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Sidebar from './sidebar'
import Navbar from "../components/shared/NavbarTop";
import { Outlet } from 'react-router-dom';


function PatientDashboard(){

    const[suc, setSuc] =  useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    useEffect(()=>{
        axios.get('http://localhost:5000/api/v1/auth/PatientDashboard')
          .then(res=>{
            if(res.data.stat === "Success"){
                setSuc("Successed ok")
            }else{
                navigate('/login')
            }
          }).catch(err=>console.log(err))
      
    },[])

    return(
        <div className="flex">
            <Sidebar role={"patient"}/>
            <main className="flex-1 py-0 mx-auto max-w-8xl">
                <Navbar />
                <Outlet/>
            </main>
        </div>
        
    );
}

export default PatientDashboard;