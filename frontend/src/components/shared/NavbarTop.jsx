import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavLink } from "react-router-dom";

const navbar = () => {
  const path = window.location.pathname;
  return (
    <div >
        <div className="bg-[#e0eff1]">
          <div className="flex flex-col">
            <div className="w-full border-b-2 border-gray-200">
              <div className="flex items-center justify-between h-16 px-0 mx-4">
                
                {/* nav search bar */}
                <div className="relative hidden max-w-xs  mr-auto md:block">
                  <p className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="flex items-center justify-center">
                      <span className="flex items-center justify-center">
                        <span className="flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-400" fill="none" viewbox="0 0 24 24" stroke="currentColor"
                            stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0
                        11-14 0 7 7 0 0114 0z"/></svg>
                        </span>
                      </span>
                    </span>
                  </p>
                  <input placeholder="Type to search" type="search" className="w-full px-3 py-2 pt-2 pb-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"/>
                </div>

                <div className="flex items-center justify-end ml-auto space-x-3 md:space-x-6">
                  {/* <div className="relative">
                    <p className="pt-1 pb-1 pl-1 pr-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100">
                      <span className="flex items-center justify-center">
                        <span className="flex items-center justify-center">
                          <span className="flex items-center justify-center">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24"
                              stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4
                          0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6
                          0H9"/></svg>
                          </span>
                        </span>
                      </span>
                    </p>
                    <p className="px-1.5 py-0.5 font-semibold text-xs items-center bg-indigo-600 text-white rounded-full inline-flex
                  absolute -top-px -right-1">2</p>
                  </div> */}
                  <div className="relative flex items-center justify-center">
                  <DropdownMenu className="p-0">
                      <DropdownMenuTrigger asChild>
                        <img src="https://firebasestorage.googleapis.com/v0/b/sayora-web-app0.appspot.com/o/images%2F96199f5c-ab9f-4856-86b4-4cd7f890cc46.png?alt=media&token=0bac3897-7ae7-4d4e-924d-bdcc487eb369"
                      className="object-cover  bg-gray-300 rounded-full btn- h-9 w-9" alt="" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><NavLink to={"profile"}>Profile</NavLink></DropdownMenuItem>
                        {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
                        {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
                        {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                      </DropdownMenuContent>
                  </DropdownMenu>
  
                    <p className="text-sm font-semibold ml-4">Ushan Senarathna</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
  );
};

export default navbar;
