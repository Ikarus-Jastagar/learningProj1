import Image from "next/image"

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
  const images = await fetch(link,{ next: { revalidate: 1000 } })
  return await images.json()
}


export default async function Gallery(){

    const loadRangeMin=0

    const {data} = await getData(loadRangeMin)
    console.log(data)
    return(
        <>
          <div id="gallery" className='flex flex-wrap shadow-lg'>
            {data.map((e,i) =>(
              <EachDisplayImage key={Date.now()+i} delay={i*100/2} src={e} />
            ))}
          </div>
        </>
    )
}


