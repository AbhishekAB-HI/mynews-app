import {  createSlice } from "@reduxjs/toolkit";

type userstate = {
    userTocken: string,
    userDetils :string
}

const stateinfo: userstate = {
  userTocken: localStorage.getItem("usertocken") || "",
  userDetils: localStorage.getItem("userdetails") || "",
};


 const userTockeninfo = createSlice({
   name: "Tocken",
   initialState: stateinfo,
   reducers:{
    setUserAccessTocken:(state,action)=>{
      const Tocken = action.payload;
      state.userTocken = Tocken
      localStorage.setItem("usertocken", Tocken); 
    },
    setUserDatails:(state,action)=>{
      const userdetail =action.payload;
      state.userDetils=userdetail
      localStorage.setItem("userdetails",userdetail);
    },
    clearuserAccessTocken:(state)=>{
        state.userTocken=''
        localStorage.removeItem("usertocken");
    }
   } 

 });


  export const { setUserAccessTocken, setUserDatails, clearuserAccessTocken } =userTockeninfo.actions

  export const accesstockenSlice = userTockeninfo.reducer





