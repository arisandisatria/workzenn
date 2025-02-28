"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const path = usePathname();

  return (
    <nav className="flex py-4 px-5 md:px-20 lg:px-36 justify-between items-center bg-secondary shadow-sm">
      <Link href={"/"}>
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
            path == "/upgrade" && "text-primary font-bold"
          }`}
        >
          <Link href={"/upgrade"}>Upgrade</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/about-us" && "text-primary font-bold"
          }`}
        >
          <Link href={"/about-us"}>About Us</Link>
        </li>
      </ul>
      <UserButton />
    </nav>
  );
}

export default Header;
