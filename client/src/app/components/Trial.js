"use client";
import React, { useEffect, useRef, useState } from "react";
import { getImages, uploadTrialData } from "../server/server"
import * as LR from "@uploadcare/blocks";
// or// import effects from 'uploadcare-widget-tab-effects/react-en'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
LR.registerBlocks(LR);

function InputField({id,val,setter,placeholder}){
  return(
    <fieldset className="mb-4">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
        onChange={(e) => setter(e.target.value)}
        value={val}
        placeholder={placeholder}
        id={id}
      />
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>{placeholder}</label>
    </fieldset>
  )
}

function UserForm({startTrial,setStartTrial,setImages}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [urls,setUrls] = useState([])


  async function handleFormSubmit(e) {
    e.preventDefault();
    if(urls.length!=2){
      toast.warn("Need to post exactly 2 images")
      return
    }
    const dataToSend = {
      name: username,
      email,
      phoneNumber: parseInt(phone),
      images:urls,
    };
    const res = await uploadTrialData(dataToSend)
    console.log("Incomming Res",res)
    if(res.error){
      toast.error("This user has already uploaded once")
      return
    }
    const newData = await getImages(0)
    setImages(newData.detail.images)
    console.log("toast here")
    toast("Your Image has been submitted",{type:"success"})
    console.log("toast ends")
    setEmail("")
    setPhone("")
    setUsername("")
    setUrls([])
    setStartTrial(!startTrial)
  }

  return (
    <>
      <div className="w-full max-w-xs">
        <form className="bg-slate-500 bg-opacity-50 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
          <ToastContainer />
          <InputField id={"UserTrialFormNameInput"} setter={setUsername} placeholder={"Your Name"} val={username}/>
          <InputField id={"UserTrialFormEmailInput"} setter={setEmail} placeholder={"Email"} val={email}/>
          <InputField id={"UserTrialFormNumberInput"} setter={setPhone} placeholder={"Contact Number"} val={phone}/>
          <fieldset>
            <div className="mb-4 flex items-center">
                <label className="mx-3" >
                  Your Images:
                </label>
                <Uploader urls={urls} setUrls={setUrls} />
            </div>
          </fieldset>
          <button className="bg-slate-500 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </form>
        <div className="text-center">
          <button type="button" onClick={()=>setStartTrial(false)} className="underline text-center text-red-600">Cancel</button>
        </div>
      </div>
    </>
  );
}

export function Uploader({urls,setUrls}){

  const outputRef=useRef(null)
  console.log("LENGTH:",urls.length)
    useEffect(()=>{
      const dataOutput = document.querySelector('lr-data-output');
      
      console.log(outputRef.current.innerHTML)

      window.addEventListener('LR_DATA_OUTPUT',(e)=>{
        console.log("LR_DATA_OUTPUT",e)
      })
      window.addEventListener('LR_REMOVE',()=>{
        console.log("LR_REMOVE")
        if(urls.length===1){
          console.log("no urls should come")
          setUrls([])
        }
      })
      dataOutput?.addEventListener('lr-data-output', (e) => {
        console.log("fileDataEvent",e);
        const newUrls = e.detail?.data?.files.map(e=>e.cdnUrl)
        console.log("fileDataEvent",newUrls);
        setUrls(newUrls)
      });
    },[])

  function handleEvent(e){
    console.log("Data",e)
  }

    return (
      <div>
        <lr-config
            ctx-name="my-uploader"
            pubkey="3ae1332f6041f3de75f8"
            maxLocalFileSizeBytes={10000000}
            imgOnly={true}
            sourceList="local, url, camera, dropbox"
        ></lr-config>
        <lr-file-uploader-regular
            css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.25.0/web/lr-file-uploader-regular.min.css"
            ctx-name="my-uploader"
            class="my-config"
        >
        </lr-file-uploader-regular>
        <lr-data-output
          ref={outputRef}
          ctx-name="my-uploader"
          use-console=""
          use-input
          use-group
          use-event
        ></lr-data-output>
      </div>
    )
}

export default function Trial({urls,setImages}) {
  const [startTrial, setStartTrial] = useState(false);

  return (
    <>
        <div className="h-full flex justify-center items-center m-20">
          {startTrial ? (
            <UserForm urls={urls} setImages={setImages} startTrial={startTrial} setStartTrial={setStartTrial} />
          ) : (
            <button
              className="m-20 py-7 px-10 text-white rounded-md bg-slate-500 hover:pointer"
              type="button"
              onClick={() => {
                setStartTrial(true);
              }}
            >
              Wanna try?
            </button>
          )}
        </div>
    </>
  );
}
