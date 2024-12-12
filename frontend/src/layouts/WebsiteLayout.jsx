import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Outlet } from 'react-router-dom';

import Navbar from "../components/website/WebsiteNavbar"
import Footer from "../components/website/WebsiteFooter"

function WebsiteLayout(){


    return(
        <div className="flex">
            <main className="flex-1 py-0 mx-auto overflow-scroll h-screen max-w-8xl">
            <Navbar/>
            <Outlet/>
            <Footer/>
            </main>
        </div>
        
    );
}

export default WebsiteLayout;