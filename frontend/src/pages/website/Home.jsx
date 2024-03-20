import React from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <>
      <div className="w-screen h-80 bg-red-400">
        home
      <Button>Home</Button>
      </div>
    </> 
  );
}

export default Home
