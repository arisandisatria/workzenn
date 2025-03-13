"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = ({ closeSideNav, isSideNavOpen }) => {
  const path = usePathname();
  return (
    <>
      {isSideNavOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={closeSideNav}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 w-64 h-full p-5 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <Link href={"/"}>
          <h1 className="font-extrabold text-4xl text-primary">
            <strong>Workzenn</strong>
          </h1>
        </Link>
        <hr className="my-7 border" />
        <ul className="gap-2 flex flex-col">
          <Link href={"/dashboard"}>
            <li
              className={`hover:text-primary hover:font-bold hover:bg-gray-200 p-3 rounded-lg transition-all cursor-pointer ${
                path == "/dashboard" && "text-primary font-bold"
              }`}
            >
              Dashboard
            </li>
          </Link>
          <Link href={"/dashboard/upgrade"}>
            <li
              className={`hover:text-primary hover:font-bold hover:bg-gray-200 p-3 rounded-lg transition-all cursor-pointer ${
                path == "/dashboard/upgrade" && "text-primary font-bold"
              }`}
            >
              Upgrade
            </li>
          </Link>
          <Link href={"/dashboard/about-us"}>
            <li
              className={`hover:text-primary hover:font-bold hover:bg-gray-200 p-3 rounded-lg transition-all cursor-pointer ${
                path == "/dashboard/about-us" && "text-primary font-bold"
              }`}
            >
              About Us
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default SideNav;
