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
import ProfilePatient from '../pages/patient/overviewPatient'
import PrescriptionPatient from '../pages/patient/prescriptionPatient'
import ReportPatients from '../pages/patient/reportsPatient'
import DailyUploads from '../pages/patient/dailyUploads'
import UserProfilePatient from '../pages/patient/profilePatient'



//staff
import BookedServices from '../pages/staff/servicesView'



//website
import Home from '../pages/website/Home'
import ServiceMgt from '../pages/website/OverviewService'

//set routing
const Router = createBrowserRouter(
  createRoutesFromElements(
    <>   
        <Route path = "/login" element ={<LogIn />}exact />
        
        <Route path = "/" element ={<WebsiteLayout />}exact >
          <Route index element={<Home/> } exact/>
          {/*webiste routes here*/}
          <Route path="home" element={<Home/> } exact/>
          <Route path="service" element={<ServiceMgt/> } exact/>


        </Route>
        <Route path = "/staff" element ={<StaffDashboard />}exact >
          <Route path="viewBookedServices" element={<BookedServices/> } exact/>
          {/*staff dashboard routes here*/}


        </Route>

          {/*protected routes*/}
        <Route element ={<ProtectedRoutesUser />}>
          <Route path="/patient" element={<PatientDashboard /> } exact >

        {/* patient dashboard routes here */}
            <Route path="overview" element={<ProfilePatient/> } exact/>
            <Route path="prescription" element={<PrescriptionPatient/> } exact/>
            <Route path="myrecords/reportpatient" element={<ReportPatients/> } exact/>
            <Route path="myrecords/dailyuploads" element={<DailyUploads/> } exact/>
            <Route path="profile" element={<UserProfilePatient/> } exact/>
          


          </Route>

          <Route path="/doctor" element={<DoctorDashboard /> } exact>
            <Route index element={<Overview/> } exact/>
          {/*doctor dashboard routes here*/}
              <Route path="overview" element={<Overview/> } exact/>
              <Route path="profile" element={<ProfileDoctor/> } exact/>
          </Route>

          
          
        </Route> 
    </>
  )

)

export default Router;