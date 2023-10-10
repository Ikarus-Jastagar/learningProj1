"use client"
import { configureStore } from "@reduxjs/toolkit";
import imagesPageation from "./imagesPageation";

const store = configureStore({
    reducer:{
        imagePages:imagesPageation
    }
})

export default store