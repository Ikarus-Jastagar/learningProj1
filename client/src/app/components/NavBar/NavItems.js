import React from "react";
import Link from "next/link";

export default function NavLists({classes}){
    return(
        <>
            <li className={classes}>
                <Link className={"p-4 m-4 rounded-md hover:bg-slate-800 hover:text-white"} href={"#"}>
                Home
                </Link>
            </li>
            <li className={classes}>
                <Link className={"p-4 m-4 rounded-md hover:bg-slate-800 hover:text-white"} href={"#aboutus"}>
                AboutUs
                </Link>
            </li>
            <li className={classes}>
                <Link className={"p-4 m-4 rounded-md hover:bg-slate-800 hover:text-white"} href={"#blogs"}>
                OurBlogs
                </Link>
            </li>
            <li className={classes}>
                <Link className={"p-4 m-4 rounded-md hover:bg-slate-800 hover:text-white"} href={"#gallery"}>
                Gallery
                </Link>
            </li>
        </>
    )
}