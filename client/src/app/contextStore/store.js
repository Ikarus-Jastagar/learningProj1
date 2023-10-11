import { configureStore } from "@reduxjs/toolkit";
import imagesPageation from "./imagesPageation";
import trialFormSlice from "./trialFormSlice";

const store = configureStore({
    reducer:{
        imagePages:imagesPageation,
        trialForm:trialFormSlice
    }
})

export default store