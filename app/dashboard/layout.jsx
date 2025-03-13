"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import SideNav from "@/components/SideNav";

function DashboardLayout({ children }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-64 absolute">
        <SideNav closeSideNav={toggleSideNav} isSideNavOpen={isSideNavOpen} />
      </div>
      <Header toggleSideNav={toggleSideNav} />
      <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
    </div>
  );
}

export default DashboardLayout;
