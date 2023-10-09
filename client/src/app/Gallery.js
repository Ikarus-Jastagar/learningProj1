"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

function EachDisplayImage({src,delay}){
  return(
    <>
      <div data-aos="flip-right" data-aos-delay={delay} className="w-[33%]">
      <div className="hover:scale-90 transition-all">
          <Image className="aspect-square" width={800} height={800} src={src} alt="Display Pic" />
      </div>
      </div>
    </>
  )
}

async function getData(numberOfImages){
  const link = "http://127.0.0.1:8000/api/all_users_images/"+numberOfImages
  console.log(link)
  const images = await fetch(link,{ next: { revalidate: 30 } })
  return await images.json()
}


export default function Gallery(){

    const loadRangeMin=0
    const [data,setData] = useState([])
    useEffect(()=>{
      getData(loadRangeMin).then((e)=>{
        console.log(e)
        setData(e.data)
      })
    },[])
    console.log(data)
    return(
        <>
          <div id="gallery" className='flex flex-wrap shadow-lg'>
            {data && data.map((e,i) =>(
              <EachDisplayImage key={Date.now()+i} delay={i*100/2} src={e} />
            ))}
          </div>
        </>
    )
}


