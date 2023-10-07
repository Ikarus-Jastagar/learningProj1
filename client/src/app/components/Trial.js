"use client";
import React, { useEffect, useRef, useState } from "react";
import { uploadTrialData } from "../server/server"
import * as LR from "@uploadcare/blocks";
// or// import effects from 'uploadcare-widget-tab-effects/react-en'

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

function UserForm() {
   // DEFAULT VALUES
  const DValues={
    name:"jastagar",
    password:"123",
    cPassword:"123",
    email:"1@2.3",
    phone:"1234567890",
  }

  const [username, setUsername] = useState(DValues.name);
  const [password, setPassword] = useState(DValues.password);
  const [cPassword, setCPassword] = useState(DValues.cPassword);
  const [email, setEmail] = useState(DValues.email);
  const [phone, setPhone] = useState(DValues.phone);
  const [urls,setUrls] = useState([])


  async function handleFormSubmit(e) {
    e.preventDefault();

    if(cPassword!==password) {
      alert("Passwords don't match")
      return
    }

    const dataToSend = {
      name: username,
      password,
      email,
      phoneNumber: parseInt(phone),
      images:urls,
    };
    const res = await uploadTrialData(dataToSend)
    console.log("Incomming Res",res)
    console.log(dataToSend);
  }
/*
<div >
  <form>
    <div className="flex items-center justify-between">
      
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
  </form>
  <p className="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div>
*/
  return (
    <>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
          <InputField id={"UserTrialFormNameInput"} setter={setUsername} placeholder={"Your Name"} val={username}/>
          <InputField id={"UserTrialFormEmailInput"} setter={setEmail} placeholder={"Email"} val={email}/>
          <InputField id={"UserTrialFormNumberInput"} setter={setPhone} placeholder={"Contact Number"} val={phone}/>
          <InputField id={"UserTrialFormPassowrdInput"} setter={setPassword} placeholder={"New Password"} val={password}/>
          <InputField id={"UserTrialFormConfirmPassInput"} setter={setCPassword} placeholder={"Confirm Pass"} val={cPassword}/>   
          <fieldset>
            <div className="mb-4 flex items-center">
                <label className="mx-3" >
                  Your Images:
                </label>
                <Uploader urls={urls} setUrls={setUrls} />
            </div>
          </fieldset>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export function Uploader({setUrls}){

    useEffect(()=>{
      const dataOutput = document.querySelector('lr-data-output');
      dataOutput?.addEventListener('lr-data-output', (e) => {
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
        {/* <Widget publicKey="3ae1332f6041f3de75f8" customTabs={{ preview:effects,effects:"all" }} /> */}
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
          ctx-name="my-uploader"
          use-console
          use-input
          use-group
          use-event
          onEvent={(e)=>{handleEvent(e)}}
          // onSubmit={handleEvent}
        ></lr-data-output>
      </div>
    )
}

export default function Trial() {
  const [startTrial, setStartTrial] = useState(false);

  return (
    <>
      <section id="try">
        <div className="h-full flex justify-center items-center">
          {startTrial ? (
            <UserForm />
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
      </section>
    </>
  );
}
