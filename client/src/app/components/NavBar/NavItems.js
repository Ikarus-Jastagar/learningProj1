import React from "react";
import Link from "next/link";

export default function NavLists({classes,innerClass}){
    return(
        <>
            <li className={classes}>
                <Link className={innerClass} href={"#"}>
                Home
                </Link>
            </li>
            <li className={classes}>
                <Link className={innerClass} href={"#aboutus"}>
                AboutUs
                </Link>
            </li>
            <li className={classes}>
                <Link className={innerClass} href={"#blogs"}>
                OurBlogs
                </Link>
            </li>
            <li className={classes}>
                <Link className={innerClass} href={"#gallery"}>
                Gallery
                </Link>
            </li>
        </>
    )
}