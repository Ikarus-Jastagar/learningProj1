"use client"
import { createSlice } from "@reduxjs/toolkit";

const imagesPagingSlice = createSlice({
    name:"imagePages",
    initialState:{
        page:1
    },
    actions:{
        nextPage:(state)=>{
            const newState = {
                page:state.page+6,
            }
            return newState
        },
        prevPage:(state)=>{
            const newState = {
                page:state.page-6,
            }
            return newState
        }
    }
})

export const {nextPage,prevPage} = imagesPagingSlice.actions
export default imagesPagingSlice.reducer