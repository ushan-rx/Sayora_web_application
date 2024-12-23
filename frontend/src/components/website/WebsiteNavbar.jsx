import React from 'react'
import { useState } from "react";
import { NavLink } from 'react-router-dom'
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


const navigation = [
	{ name: "Home", href: "home" },
	{ name: "Appointments", href: "/appointment" },
	// { name: "Marketplace", href: "#" },
  { name: "Treatments", href: "/treatments" },
	{ name: "Services", href: "/service" },
  
];


function websiteNavbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 backdrop-blur-2xl bg-white/10">
    <nav
      className="flex items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div className="flex lg:flex-1">
        <a
          href="#"
          className="-m-1.5 p-1.5"
        >
          <span className="sr-only">sayora wellness center</span>
          <img
            className="w-auto h-14"
            src="https://sayora.lk/wp-content/uploads/2023/04/SAYORA-LOGO-NEW.png"
            alt=""
          />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon
            className="w-6 h-6"
            aria-hidden="true"
          />
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-base font-semibold leading-6 text-gray-900"
          >
            {item.name}
          </a>
        ))}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <button className="px-4 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500">
          <NavLink
            to="/login"
            className="text-sm font-semibold leading-9"
          >
            Login
          </NavLink>
        </button>
        <div></div>
      </div>
    </nav>
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="-m-1.5 p-1.5"
          >
            <span className="sr-only">
              sayora wellness center
            </span>
            <img
              className="w-auto h-14"
              src="https://sayora.lk/wp-content/uploads/2023/04/SAYORA-LOGO-NEW.png"
              alt=""
            />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon
              className="w-6 h-6"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="flow-root mt-6">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="py-6 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="py-6">
              <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                <NavLink to="/login">Login</NavLink>
              </button>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  </header>
  )
}

export default websiteNavbar
