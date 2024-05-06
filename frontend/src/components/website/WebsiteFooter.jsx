import React from "react";
import { Separator } from "@/components/ui/separator";

import { SiFacebook } from "react-icons/si";
import { FaFacebookMessenger } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { SiYoutube } from "react-icons/si";
import { MdAlternateEmail } from "react-icons/md";
import { FaInternetExplorer } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";

function WebsiteFooter() {

  const handleClickFb = () => {
    window.location.href = "https://www.facebook.com/SayoraWellnessHub";
  };
  const handleClickFbm = () => {
    window.location.href = "https://api.whatsapp.com/send?phone=%2B94719626625&context=ARAp2Ez12HKK3JVS01nqT-5rchamZa7kb2u_k4FBaWfFKAgLZeMseeXGF1I4PMVs5G4GdeTmeug4I7ITTNngTfqB6N8Ux7lp2dF2oLgEE8zaiJHiYxXiLXmJVbWZ7RxIUwrvZ0psGRitNjaR9pxE-lh64A&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwZXh0bgNhZW0CMTAAAR172XfLAJx4pKqp_fvA8OM82R8V_p_yWW0un4W56Zr3pdw5CZhJKbw6fFk_aem_AT4F6IwOl1yKY4CiVTfTwd3FKWST3q1GVFBFVuQDpSm4DyeXY0l1WWjdydCCJTvJpF_V5zV6m7kTmdflGzmKz7Db";
  };
  const handleClickTk = () => {
    window.location.href = "https://www.tiktok.com/@sayoralk";
  };
  const handleClickYt = () => {
    window.location.href = "https://www.youtube.com/@drsachiniaththanayaka578";
  };
  const handleClickMail = () => {
    window.location.href = "https://sayora.lk/";
  };
  return (
    <div className="flex flex-col w-screen h-60 bg-slate-200">
      <div className="z-50 flex justify-center gap-8 mt-8 text-3xl">
        <button onClick={handleClickFb}><SiFacebook/></button>
        <button onClick={handleClickFbm}><SiWhatsapp/></button>
        <button onClick={handleClickTk}><FaTiktok/></button>
        <button onClick={handleClickYt}><SiYoutube/></button>
        <button onClick={handleClickMail}><MdAlternateEmail/></button>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-center">
        <img
          className="w-20 h-20 "
          src="https://sayora.lk/wp-content/uploads/2023/04/SAYORA-LOGO-NEW.png"
          alt=""
        />
        <div className="px-8">
          <h1 className="flex px-4 ">Sayora Wellness center </h1>
          <div className="text-sm font-light">
            221 High Level Rd, Maharagama 10280
          </div>
          <div className="text-sm font-light text-center">
            info@sayora.lk / +94719626625
          </div>
        </div>
      </div>
      <br />
          <div className="flex justify-center text-sm font-light text-center">
          © 2020 Your Company, Inc. All rights reserved.
          </div>
    </div>
  );
}

export default WebsiteFooter;
