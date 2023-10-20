import AboutUsBlocks from "./AboutUsBlocks"

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
export default function AboutUs(){
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
              return <AboutUsBlocks {...e} key={"ABOUT_US_BLOCKS_KEY"+i} />
            })}
        </div>
    </section>)
  }