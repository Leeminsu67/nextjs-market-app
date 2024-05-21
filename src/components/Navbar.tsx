"use client";

import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import { User } from "@prisma/client";

interface NavbarProps {
  currentUser?: User | null;
}

function Navbar({ currentUser }: NavbarProps) {
  const [menu, setMenu] = useState(false);

  // console.log("currentUser", currentUser);

  const handleMent = () => {
    setMenu(!menu);
  };

  return (
    <nav className="relative z-10 w-full bg-orange-500 text-white">
      <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
        <div className="flex items-center text-2xl h-14">
          <Link href="/">Logo</Link>
        </div>

        <div className="text-2xl sm:hidden">
          {menu === false ? (
            <button onClick={handleMent}>+</button>
          ) : (
            <button onClick={handleMent}>-</button>
          )}
        </div>

        <div className="hidden sm:block">
          <NavItem currentUser={currentUser} />
        </div>
      </div>
      <div className="block sm:hidden">
        {menu === false ? null : <NavItem mobile currentUser={currentUser} />}
      </div>
    </nav>
  );
}

export default Navbar;
