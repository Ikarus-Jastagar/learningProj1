"use client"
import React from "react";
import { useState } from "react";
import NavLists from "./NavItems";

export default function NavBar() {
  const [dropDown,setDropdown] = useState(false)

  return (
    <>
      <header className="md:flex h-[7dvh] z-10 hidden justify-around items-center sticky top-0 shadow-md bg-slate-400">
        <div className="logo">
          <h3 className="text-xl font-bold">PictureNarrate</h3>
        </div>
        <nav className=" flex-[0.7]">
          <ui className="flex list-none items-center justify-around">
            <NavLists classes={"text-center"} />
          </ui>
        </nav>
      </header>
      <header className="flex md:hidden transition-all min-h-[7dvh] flex-col z-10 overflow-hidden justify-around sticky top-0 shadow-md bg-slate-400">
        <div className="logo p-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">PictureNarrate</h3>
            <div className="text-5xl" onClick={()=>setDropdown(!dropDown)}>=</div>
        </div>
        <nav style={{maxHeight:(!dropDown? "0px":"60dvh")}} className="overflow-hidden transition-all">
          <ui className="flex flex-col list-none items-start">
            <NavLists classes={"text-center m-5"} />
          </ui>
        </nav>
      </header>
    </>
  );
}