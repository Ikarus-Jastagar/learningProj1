"use client"
import Link from "next/link";
import React from "react";
import { useState } from "react";

export default function NavBar() {
  const [dropDown,setDropdown] = useState(false)

  function handleDropDown(){
    setDropdown(!dropDown)
  }

  const style_listItem = "text-center";
  const style_listItem_nav = "text-center m-5";
  const style_listLink =
    "p-4 m-4 rounded-md hover:bg-slate-800 hover:text-white";
  return (
    <>
      <header className="md:flex h-[7dvh] z-10 hidden justify-around items-center sticky top-0 shadow-md bg-slate-400">
        <div className="logo">
          <h3 className="text-xl font-bold">PictureNarrate</h3>
        </div>
        <nav className=" flex-[0.7]">
          <ui className="flex list-none items-center justify-around">
            <li className={style_listItem}>
              <Link className={style_listLink} href={"#"}>
                Home
              </Link>
            </li>
            <li className={style_listItem}>
              <Link className={style_listLink} href={"#aboutus"}>
                AboutUs
              </Link>
            </li>
            <li className={style_listItem}>
              <Link className={style_listLink} href={"#blogs"}>
                OurBlogs
              </Link>
            </li>
            <li className={style_listItem}>
              <Link className={style_listLink} href={"#gallery"}>
                Gallery
              </Link>
            </li>
          </ui>
        </nav>
      </header>
      <header className="flex md:hidden transition-all min-h-[7dvh] flex-col z-10 overflow-hidden justify-around sticky top-0 shadow-md bg-slate-400">
        <div className="logo p-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">PictureNarrate</h3>
            <div className="text-5xl" onClick={handleDropDown}>=</div>
        </div>
        <nav className={` max-h-${!dropDown? "0":"[60dvh]"}`}>
          <ui className="flex flex-col list-none items-start">
            <li className={style_listItem_nav}>
              <Link className={style_listLink} href={"#"}>
                Home
              </Link>
            </li>
            <li className={style_listItem_nav}>
              <Link className={style_listLink} href={"#aboutus"}>
                AboutUs
              </Link>
            </li>
            <li className={style_listItem_nav}>
              <Link className={style_listLink} href={"#blogs"}>
                OurBlogs
              </Link>
            </li>
            <li className={style_listItem_nav}>
              <Link className={style_listLink} href={"#gallery"}>
                Gallery
              </Link>
            </li>
          </ui>
        </nav>
      </header>
    </>
  );
}