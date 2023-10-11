import { createSlice } from "@reduxjs/toolkit";

const imagesPagingSlice = createSlice({
    name:"imagePages",
    initialState:{
        page:1
    },
    reducers:{
        nextPage:(state)=>{
            state.page+=1
        },
        prevPage:(state)=>{
            state.page-=1
        }
    }
})

export const {nextPage,prevPage} = imagesPagingSlice.actions
export default imagesPagingSlice.reducer