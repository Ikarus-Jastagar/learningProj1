// import landingImage from "@/app/assets/landing.jpg";
import landingImage from "@/app/assets/HeroVector.svg";
import Image from "next/image";
import BlogsComp from "./components/Blogs";
import Trial from "./components/Trial";
import Gallery from "./components/Gallery";
import Script from "next/script";
import NavBar from "./components/NavBar/NavComp";


function Banner() {
  return (
    <>
      <div className="w-full h-[70dvh] heroBG flex flex-col md:flex-row">
        <div data-aos="fade-right" className="flex h-full flex-1 items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold p-16">
            Transforming <span className="font-bold text-slate-400">Images</span><br/> Into Enthralling<br/> <span className="font-bold text-slate-400">Stories!</span>
          </h1>
        </div>
        <div data-aos="fade-left" className="flex-1 flex justify-center">
          <Image priority src={landingImage} alt="pic"/>
        </div>
      </div>
    </>
  );
}

function AboutUsBlocks({heading,text}){
  return(
    <div data-aos="fade-up" className="w-full md:w-[45%] p-4 m-4 border rounded-md transition-all bg-white bg-opacity-40 shadow-md hover:bg-slate-200 hover:bg-opacity-100 hover:scale-105 hover:shadow-xl">
      <h3 className="text-lg md:text-2xl font-bold">
        {heading}
      </h3>
      <p className="p-3 md:p-9">
        {text}
      </p>
    </div>
  )
}

function AboutUs(){
  const content  = [
    {
      heading:"Who We Are:",
      text:"Picture Narrate is a harmonious blend of storytellers, visionaries, AI aficionados, and image lovers. We've interwoven the art of storytelling with cutting-edge AI to translate the beauty of images into captivating tales."
    },
    {
      heading:"Our Vision:",
      text:"Every image is a silent echo of stories untold. Our aspiration is to be the voice for these images, crafting narratives that resonate, inspire, and captivate the soul."
    },
    {
      heading:"How We Operate:",
      text:"Harnessing advanced AI algorithms, Picture Narrate deciphers the subtleties, emotions, and hidden motifs within every image. These insights fuel our AI's creativity, spinning tales that are as unique as the image they're derived from."
    },
    {
      heading:"Why Picture Narrate?",
      text:"We're redefining the boundaries of narrative creativity by merging the visual and verbal realms."
    },
  ]
  return(
  <section id='aboutus' className="p-10 flex-col galleryBG">
        <div>
          <h2 className="text-4xl font-bold text-center">
            About Us
          </h2>
        </div>
        <div className="flex flex-wrap flex-1 py-20">
          {/* Picture Narrate: Illuminating Images with Stories

          At the intersection of art and technology, where every pixel holds a tale and every frame narrates an emotion, lies Picture Narrate. We believe that every snapshot, whether a fleeting moment or a cherished memory, conceals a deeper narrative. Our mission? To bring those narratives to light. */}
          {content && content.map((e,i)=>{
            return <AboutUsBlocks {...e} key={Date.now()+i} />
          })}
      </div>
  </section>)
}

function MainBody() {
  return (
    <>
      <main className="relative flex flex-col items-center justify-between font-mono overflow-hidden">
        <Banner />
        <div className="w-full top-[93dvh]">
          <AboutUs />
          <BlogsComp />
          <section id="try" className="flex flex-col-reverse md:flex-row items-center galleryBG" >
              <div className="md:flex-[0.4]">
                <Trial />
              </div>
              <div className="md:flex-[0.6]">
                <Gallery />
              </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default async function Home() {
  return (
    <div>
      <NavBar />
      <MainBody />
      <Script>
        {'AOS.init()'}
      </Script>
    </div>
  );
}
