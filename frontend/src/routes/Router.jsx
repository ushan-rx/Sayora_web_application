import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import PatientDashboard from '../layouts/PatientDashboard'
import DoctorDashboard from '../layouts/DoctorDashboard'
import StaffDashboard from '../layouts/StaffDashboard'
import WebsiteLayout from '../layouts/WebsiteLayout'
import LogIn from '../pages/LogIn'
import React from 'react'
import ProtectedRoutesUser from '../utils/ProtectedRoutesUser'

//pages import
//doctor
import Overview from '../pages/doctor/overviewDoctor'
import ProfileDoctor from '../pages/doctor/profileDoctor'

//patient




//staff




//website
import Home from '../pages/website/Home'


//set routing
const Router = createBrowserRouter(
  createRoutesFromElements(
    <>   
        <Route path = "/login" element ={<LogIn />}exact />
        
        <Route path = "/" element ={<WebsiteLayout />}exact >
          <Route index element={<Home/> } exact/>
          // webiste routes here
          <Route path="home" element={<Home/> } exact/>


        </Route>
        <Route path = "/staff" element ={<StaffDashboard />}exact >
          //staff dashboard routes here


        </Route>

          //protected routes
        <Route element ={<ProtectedRoutesUser />}>
          <Route path="/patient" element={<PatientDashboard /> } exact >
            //patient dashboard routes here
          

          </Route>

          <Route path="/doctor" element={<DoctorDashboard /> } exact>
            <Route index element={<Overview/> } exact/>
          //doctor dashboard routes here
              <Route path="overview" element={<Overview/> } exact/>
              <Route path="profile" element={<ProfileDoctor/> } exact/>
          </Route>

          
          
        </Route> 
    </>
  )

)

export default Router;