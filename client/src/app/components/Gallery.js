"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import Trial from "./Trial"
import { getImages } from "../server/server"
import { Provider } from "react-redux"
import store from "../contextStore/store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { nextPage, prevPage } from "../contextStore/imagesPageation"

function EachDisplayImage({src,delay}){
  const imageSize = 350
  return(
    <>
      <div data-aos="flip-right" data-aos-delay={delay} className="w-[33%]">
        <div className="hover:scale-90 transition-all">
            <Image className="aspect-square" width={imageSize} height={imageSize} src={src} alt="Display Pic" />
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

    const [maxReached,setMaxReached] = useState(false)
    const [firstPage,setFirstPage] = useState(true)
    const [images,setImages] = useState([])

    const[loading, setloading] = useState(false)

    const state = useSelector((state) => state.imagePages)
    const action = useDispatch()


    function showNext(){
      action(nextPage())
      setFirstPage(false)
      getImages(state.page+1).then((e)=>{
        setImages(e.images)
        setMaxReached(e.maxReached)
        setloading(false)})
    }
    function showPrev(){
      action(prevPage())
      if(state.page==2){
        setFirstPage(true)
      }
      getImages(state.page-1).then((e)=>{
        setImages(e.images)
        setMaxReached(e.maxReached)
        setloading(false)})
    }

    useEffect(()=>{
      setloading(true)
      getImages(state.page).then((e)=>{
        setImages(e.images)
        setMaxReached(e.maxReached)
        setloading(false)
      })
    },[])
    return(
        <>
          <section id="try" className="max-h-[93dvh] flex flex-col-reverse md:flex-row items-center justify-center galleryBG">
                <Trial/>
                <div className="flex-[0.5] flex flex-col justify-center items-center m-5">
                  <div id="gallery" style={{aspectRatio:"3/2"}} className='flex max-h-[80dvh] w-[99%] flex-wrap shadow-lg m-2'>
                    {images && images.map((e,i) =>(
                      <EachDisplayImage key={Date.now()+i} delay={i*300/2} src={e} />
                    ))}
                  </div>
                    {!loading && <div className="flex justify-center">
                        {!firstPage && <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={showPrev} >prev</button>}
                        {!maxReached && <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={showNext} >Next</button>}
                    </div>}
                </div>
          </section>
          
        </>
    )
}



