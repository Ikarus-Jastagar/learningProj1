import Image from "next/image";
import landingImage from "@/app/assets/HeroVector.svg";

export default function Banner() {
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
  