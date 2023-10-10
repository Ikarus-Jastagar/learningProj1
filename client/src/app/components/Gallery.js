"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import Trial from "./Trial"
import { getImages } from "../server/server"
import { Provider } from "react-redux"
import store from "../contextStore/store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

function EachDisplayImage({src,delay}){
  return(
    <>
      <div data-aos="flip-right" data-aos-delay={delay} className="w-[33%]">
        <div className="hover:scale-90 transition-all">
            <Image className="aspect-square" width={200} height={200} src={src} alt="Display Pic" />
        </div>
      </div>
    </>
  )
}

export default function Gallery(){
  return(
    <Provider store={store}>
        <GalleryWithProvider />
    </Provider>
  )
}


function GalleryWithProvider(){
    const [images,setImages] = useState([])

    const state = useSelector((state) => state.imagePages)
    const action = useDispatch()
    console.log(state)
    useEffect(()=>{
      getImages(state).then((e)=>{
        console.log(e)
        setImages(e.detail.images)
      })
    },[])
    console.log(images)
    return(
        <>
          <section id="try" className="max-h-[93vh] flex flex-col-reverse md:flex-row items-center galleryBG">
              <div className="md:flex-[0.4]">
                  <Trial urls={images} setImages={setImages} />
              </div>
              <div className="">
                <div id="gallery" className='flex flex-wrap shadow-lg m-2'>
                  {images && images.map((e,i) =>(
                    <EachDisplayImage key={Date.now()+i} delay={i*100/2} src={e} />
                  ))}
                </div>
              </div>
          </section>
          
        </>
    )
}



