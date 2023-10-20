"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import GridDots from "@/app/icons/GridDots";
import BlogModal from "./BlogModal";
import Link from "next/link";
import {useSearchParams} from 'next/navigation'
import { useRef } from "react";
import { useRouter } from "next/navigation";

const image_size = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_SIZE || 200;

export default function EachBlogComp(props) {

    const queryParams = useSearchParams()
    const router = useRouter()
    const [showModal, setShowModal] = useState(props.uuid === queryParams.get('openBlog'));
    const modalRef = useRef()


    function redirectTo(){
      router.replace("/#blogs")
    }

    return (
      <>
        <Link
          ref={modalRef}
          href={"?openBlog="+props.uuid}
          className="transition-all rounded-md overflow-hidden flex-col md:flex-row flex w-[80%] md:mx-10 my-5 bg-slate-400 bg-opacity-75 hover:shadow-xl"
          data-aos="flip-up"
          data-aos-once="true"
          onClick={() => setShowModal(true)}
        >
          {/* <Image alt="featured_image" className="rounded-md" width={400} height={400} src={feature_image}/> */}
          <div className="flex-col md:flex-row flex">
            <Image
              alt="featured_image"
              priority
              className="rounded-md w-[20rem] h-[20rem] md:w-[30rem] md:h-[100%] "
              width={image_size}
              height={image_size}
              src={props?.feature_image}
            />
            <div className=" p-4 m-3">
              <h4 className="text-2xl font-bold">{props?.title}</h4>
              <p className="hidden md:block">{props?.custom_excerpt}</p>
            </div>
          </div>
          <div className=" hidden md:flex items-center justify-center">
            <div className="h-10 w-10 hover:cursor-move m-8">
              <GridDots />
            </div>
          </div>
        </Link>
        {showModal && <BlogModal redirectTo={redirectTo} {...props} showModal={showModal} setShowModal={setShowModal}  /> }
      </>
    );
  }