import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import PatientDashboard from '../layouts/PatientDashboard'
import DoctorDashboard from '../layouts/DoctorDashboard'
import StaffDashboard from '../layouts/StaffDashboard'
import WebsiteLayout from '../layouts/WebsiteLayout'
import LogIn from '../pages/LogIn'
import React from 'react'
import ProtectedRoutesUser from '../utils/ProtectedRoutesUser'
import RegistrationForm from '../pages/RegistrationForm'

//pages import
//doctor
import Overview from '../pages/doctor/overviewDoctor'
import ProfileDoctor from '../pages/doctor/profileDoctor'
import ExaminationList from '@/pages/doctor/examinationList'
import ExaminationContainer from '../pages/doctor/examinationContainer'
import AppointmentReport from '@/pages/doctor/appointmentReport'
import ServiceView from '@/pages/doctor/serviceView'
import EmailView from '@/pages/doctor/emailSend'

//patient
import ProfilePatient from '../pages/patient/overviewPatient'
import PrescriptionPatient from '../pages/patient/prescriptionPatient'
import ReportPatients from '../pages/patient/reportsPatient'
import DailyUploads from '../pages/patient/dailyUploads'
import UserProfilePatient from '../pages/patient/profilePatient'
import MyCareProfile  from '../pages/patient/myCare'
import PatientTreatment from '../pages/patient/treatmentHistoryPatient'
import Requesition from '../pages/patient/requesition'



//staff
import AwarnessPrograms from '../pages/staff/addServices';
import AddTreatment from '@/pages/Cashier/AddTreatment'
import Cashier from '@/pages/Cashier/Cashier'
import CashierTable from '@/pages/Cashier/CashierTable'
import EditTreatment from '@/pages/Cashier/EditTreatment'
import FetchTreatment from '@/pages/Cashier/FetchTreatment'
import UpdateCashier from '@/pages/Cashier/UpdateCashier'
import BookedServices from '@/pages/staff/servicesView'



//website
import Home from '../pages/website/Home'
import ServiceMgt from '../pages/website/OverviewService'
import AddStaff from '@/pages/staff/addStaff'
import ManageStaff from '@/pages/staff/manageStaff'
import ManagePatient from '@/pages/staff/managePatient'
import AddPatient from '@/pages/staff/addPatient'
import StaffLeaves from '@/pages/staff/manageStaffLeaves'
import ApplyLeave from '@/pages/staff/applyLeave'
import MyLeaves from '@/pages/staff/myLeaves'

import ServiceHome from '../pages/website/HomeNavService'
import AwarenessProgramHome from '../pages/website/awarnessPrograms_View';
import ManageDoctor from '@/pages/staff/manageDoctor'
import StaffLogIn from '@/pages/staff/StaffLogin'

import ProductHome from '@/pages/Product/ProductHome'
import AddProduct from '@/pages/Product/AddProduct'

import Cart from '@/pages/Product/Cart'
import ProductOrdersTable from '@/pages/Product/ProductOrdersTable'
import POrderDetails from '@/pages/Product/ProductOrderDetail'
import ViewProducts from '@/pages/Product/ViewProducts'
import UpdateProduct from '@/pages/Product/UpdateProduct'
import PatientPurchase from '@/pages/Product/PatientPurhase'

import UpdateSupplier from '@/pages/Inventry/UpdateSupplier'
import AddSupplier from '@/pages/Inventry/AddSupplier'
import AddItem from '@/pages/Inventry/AddItem'
import AddOrder from '@/pages/Inventry/AddOrder'
import ViewInventory from '@/pages/Inventry/ViewInventory'
import InventoryHome from '@/pages/Inventry/InventryHome'
import Supplier from '@/pages/Inventry/Supplier'
import OrdersTable from '@/pages/Inventry/OrderTable'

//set routing
const Router = createBrowserRouter(
  createRoutesFromElements(
    <>   
        <Route path = "/login" element ={<LogIn />}exact />
        <Route path = "/register/:tempId" element ={<RegistrationForm />}exact />
        <Route path="/stafflogin" element={<StaffLogIn/> } exact/>
        
        <Route path = "/" element ={<WebsiteLayout />}exact >
          <Route index element={<Home/> } exact/>
          {/*webiste routes here*/}
          <Route path="home" element={<Home/> } exact/>
          <Route path="serviceForm" element={<ServiceMgt/> } exact/>
          <Route path="service" element={<ServiceHome/> } exact/>
          <Route path="awarenessProgramHome" element={<AwarenessProgramHome/> } exact/>


        </Route>
        <Route path = "/staff" element ={<StaffDashboard />}exact >
          <Route path="service/viewBookedServices" element={<BookedServices/> } exact/>
          <Route path  = "addServices" element ={<AwarnessPrograms />}exact />
         
          {/*staff dashboard routes here*/}
                    {/*AROSHANA-START*/}
          ManageDoctor
            <Route path="ManageStaff/add" element={<AddStaff/> } exact/>
            <Route path="ManageStaff/overview" element={<ManageStaff/> } exact/>
            <Route path="ManagePatient/add" element={<AddStaff/> } exact/>
            <Route path="ManagePatients/overview" element={<ManagePatient/> } exact/>
            <Route path="ManagePatients/add" element={<AddPatient/> } exact/>
            <Route path="ManageLeaves/overview" element={<StaffLeaves/> } exact/>
            <Route path="StaffProfile/leaves/apply" element={<ApplyLeave/> } exact/>
            <Route path="StaffProfile/leaves/my" element={<MyLeaves/> } exact/>
            <Route path="ManageDoctor/overview" element={<ManageDoctor/> } exact/>
            
            
           {/*AROSHANA-END*/}
            {/* kaumal */}

            <Route path='treatment'>
                <Route index element={<FetchTreatment/> } exact/>
                <Route path="addTreat" element={<AddTreatment/> } exact/>
                <Route path="viewTreat" element={<FetchTreatment/> } exact/>
            </Route>
            <Route path='cashier'>
                <Route index element={<Cashier/>} exact/>
                <Route path="cashier" element={<Cashier/> } exact/>
                <Route path="viewCash" element={<CashierTable/> } exact/>

            </Route>
            {/* kaumal */}

           
          {/* kawmal paths  */}
          <Route path="updatex/:id" element={<EditTreatment />} />
          {/* <Route path="updateCash/:id" element={<UpdateCashier />} /> */}
          <Route path="Cashier/viewCash/staff/updateCash/:id" element={<UpdateCashier />} />
          <Route path="viewCash" element={<viewCash/> } exact/>
          {/* end */}

            <Route path = "product">
            <Route index element ={<ViewProducts/>}exact/>
            <Route path="viewProduct" element = {<ViewProducts/>}exact/>
            <Route path = "add" element ={<AddProduct/>}exact/>
            <Route path="adminOrder" element= {<ProductOrdersTable/>} exact/>
          <Route path="adminOrder/order-details/:id" element= {<POrderDetails/>} exact/>
          <Route path="update-product" element = {<UpdateProduct/>} exact/>
            </Route>

            <Route path = "inventory">
              <Route index element ={<InventoryHome/>}exact/>
              <Route path="overview" element = {<InventoryHome/>}exact/>
              <Route path = "view" element = {<ViewInventory/>}exact/>
              <Route path = "suppliers" element = {<Supplier/>}exact/>
              <Route path = "addSupplier" element = {<AddSupplier/>}exact/>
              <Route path = "updateSupplier" element = {<UpdateSupplier/>}exact/>
              <Route path = "orders" element = {<OrdersTable/>}exact/>
              <Route path = "addItem" element = {<AddItem/>}exact/>
              <Route path = "addOrder" element = {<AddOrder/>}exact/>
            </Route> 

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
            <Route path="myrecords/mycareprofile" element={<MyCareProfile/>} exact/>
            <Route path="treatments/mytretments" element={<PatientTreatment/>} exact/>
            <Route path="requesition" element={<Requesition/>} exact/>
            <Route path="purchase" element={<PatientPurchase/>} exact/>
          
            <Route path = "product">
            <Route index element ={<ProductHome/>}></Route>
            <Route path = "cart" element ={<Cart/>}exact/>
            </Route>

          </Route>

          <Route path="/doctor" element={<DoctorDashboard /> } exact>
            <Route index element={<Overview/> } exact/>
            {/*doctor dashboard routes here*/}
              <Route path="overview" element={<Overview/> } exact/>
              <Route path="profile" element={<ProfileDoctor/> } exact/>
              <Route path="serviceDoctorView" element={<ServiceView/> } exact/>
              <Route path = "emailView" element = {<EmailView/>} exact/>
              <Route path="examination">
                {/*examination routes here*/}
                <Route path=':id' element={<ExaminationContainer/>}></Route>
                <Route path='' element={<ExaminationList/>} exact></Route>
              </Route>
              {/* report routes here */}
              <Route path='reports'>
                <Route index element={<AppointmentReport/> } exact/>
                <Route path="appointmentReport" element={<AppointmentReport/>} exact/>
              </Route>
          </Route>

        </Route> 
    </>
  )

)

export default Router;