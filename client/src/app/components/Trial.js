"use client";
import React, { useEffect, useRef, useState } from "react";
import { getImages, uploadTrialData } from "../server/server";
import * as LR from "@uploadcare/blocks";
// or// import effects from 'uploadcare-widget-tab-effects/react-en'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  changeEmail,
  changeImages,
  changeName,
  changePhoneNumber,
  clearForm,
} from "../contextStore/trialFormSlice";
LR.registerBlocks(LR);

console.log(LR.Data)

function InputField({ id, val, setter, placeholder }) {
  return (
    <fieldset className="mb-4">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
        onChange={(e) => setter(e.target.value)}
        value={val}
        placeholder={placeholder}
        id={id}
      />
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {placeholder}
      </label>
    </fieldset>
  );
}

function UserForm({ startTrial, setStartTrial }) {
  const formState = useSelector((state) => state.trialForm);
  const action = useDispatch();

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (formState.images.length != 2) {
      toast.warn("Need to post exactly 2 images");
      return;
    }
    try {
      const res = await uploadTrialData({
        ...formState,
        phoneNumber: parseInt(formState.phoneNumber),
      });
    } catch (err) {
      console.log("Here we arre")
      toast.error("This user has already uploaded once");
      action(clearForm());
      console.log(formState)
      return
    }
    toast("Your Image has been submitted", { type: "success" });
    action(clearForm());
    setStartTrial(!startTrial);
  }

  return (
    <>
      <div className="w-full max-w-xs">
        <form
          className="bg-slate-500 bg-opacity-50 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleFormSubmit}
        >
          <InputField
            id={"UserTrialFormNameInput"}
            setter={(e) => {
              action(changeName(e));
            }}
            placeholder={"Your Name"}
            val={formState.name}
          />
          <InputField
            id={"UserTrialFormEmailInput"}
            setter={(e) => {
              action(changeEmail(e));
            }}
            placeholder={"Email"}
            val={formState.email}
          />
          <InputField
            id={"UserTrialFormNumberInput"}
            setter={(e) => {
              action(changePhoneNumber(e));
            }}
            placeholder={"Contact Number"}
            val={formState.phoneNumber}
          />
          <fieldset>
            <div className="mb-4 flex items-center">
              <label className="mx-3">Your Images:</label>
              <Uploader />
            </div>
          </fieldset>
          <button className="bg-slate-500 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </form>
        <div className="text-center">
          <button
            type="button"
            onClick={() => setStartTrial(false)}
            className="underline text-center text-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export function Uploader() {
  const outputRef = useRef(null);
  const formState = useSelector((state) => state.trialForm);
  const action = useDispatch();

  function setUrls(newUrls) {
    action(changeImages(newUrls));
  }
  useEffect(() => {
    const dataOutput = document.querySelector("lr-data-output");
    window.addEventListener("LR_REMOVE", () => {
      if (formState.images.length === 1) {
        setUrls([]);
      }
    });
    dataOutput?.addEventListener("lr-data-output", (e) => {
      const newUrls = e.detail?.data?.files.map((e) => e.cdnUrl);
      setUrls(newUrls);
    });
  }, []);

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
      ></lr-file-uploader-regular>
      <lr-data-output
        ref={outputRef}
        ctx-name="my-uploader"
        use-console=""
        use-input
        use-group
        use-event
      ></lr-data-output>
    </div>
  );
}

export default function Trial() {
  const [startTrial, setStartTrial] = useState(false);

  return (
    <>
      <div className="h-full flex-[0.4] flex justify-center items-center">
        <ToastContainer />

        {startTrial ? (
          <UserForm startTrial={startTrial} setStartTrial={setStartTrial} />
        ) : (
          <div className="">
            <button
              className="m-10 py-7 px-10 text-white rounded-md bg-slate-500 hover:pointer"
              type="button"
              onClick={() => {
                setStartTrial(true);
              }}
              >
              Wanna try?
            </button>
          </div>
        )}
      </div>
    </>
  );
}
