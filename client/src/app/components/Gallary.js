"use Server"
import Image from 'next/image';
import UploadcareImage from '@uploadcare/nextjs-loader';
// import axios from "axios"

export default async function Gallary(){

    // const images = await axios.get()
    
    return(<UploadcareImage
        alt="A test image"
        src="https://ucarecdn.com/"
        width="400"
        height="300"
        quality="80"
      />)
}


