"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header({ toggleSideNav }) {
  const path = usePathname();

  return (
    <nav className="flex py-4 px-5 md:px-20 lg:px-36 justify-between items-center shadow-sm">
      <Menu
        onClick={toggleSideNav}
        size={35}
        className="sm:hidden cursor-pointer"
      />
      <Link href={"/dashboard"}>
        <h1 className="font-extrabold text-4xl text-primary">
          <strong>Workzenn</strong>
        </h1>
      </Link>
      <ul className="gap-5 hidden md:flex">
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard" && "text-primary font-bold"
          }`}
        >
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/upgrade" && "text-primary font-bold"
          }`}
        >
          <Link href={"#"}>Upgrade</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/about-us" && "text-primary font-bold"
          }`}
        >
          <Link href={"/dashboard/about-us"}>About Workzenn</Link>
        </li>
      </ul>
      <UserButton />
    </nav>
  );
}

export default Header;
