import { createSlice } from "@reduxjs/toolkit";

const trialFormSlice = createSlice({
    name:'TrialFormCreds',
    initialState:{
        name:"",
        email:"",
        images:[],
        phoneNumber:0
    },
    reducers:{
        changeName:(state,action)=>{
            state.name = action.payload
        },
        changeEmail:(state,action)=>{
            state.email = action.payload
        },
        changeImages:(state,action)=>{
            state.images = action.payload
        },
        changePhoneNumber:(state,action)=>{
            state.phoneNumber = parseInt(action.payload)
        },
        clearForm:(state)=>{
            state.name=""
            state.email=""
            state.images=[]
            state.phoneNumber=''
        }
    }
})

export const {changeEmail,changeName,changePhoneNumber,changeImages, clearForm} = trialFormSlice.actions

export default trialFormSlice.reducer