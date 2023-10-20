import React from 'react'
import NavLists from '../NavBar/NavItems'

const someText = `Picture Narrate is a harmonious blend of storytellers, visionaries, AI aficionados, and image lovers. We've interwoven the art of storytelling with cutting-edge AI to translate the beauty of images into captivating tales.
Every image is a silent echo of stories untold. Our aspiration is to be the voice for these images, crafting narratives that resonate, inspire, and captivate the soul.
Harnessing advanced AI algorithms, Picture Narrate deciphers the subtleties, emotions, and hidden motifs within every image. These insights fuel our AI's creativity, spinning tales that are as unique as the image they're derived from.
We're redefining the boundaries of narrative creativity by merging the visual and verbal realms.`

export default function Footer() {
  return (
    <footer className='bg-slate-500 w-full'>
        <div className='h-[30dvh] text-white'>
            <div className='h-full flex mx-10 gap-6'>
                <div className='flex justify-center items-center p-6'>
                    <h2 className='text-3xl text-white font-bold'>
                        Picture Narrate
                    </h2>
                </div>


                <div className='p-10 flex flex-col justify-center'>
                    <h3 className='text-2xl font-bold'>
                        Go To:
                    </h3>
                    <ul>
                        <NavLists classes={"m-4 "} innerClass={"text-white text-lg hover:underline"} />
                    </ul>
                </div>

                <div className='flex items-center p-8'>
                    {someText}
                </div>
            </div>
        </div>
    </footer>
  )
}
