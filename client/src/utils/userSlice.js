import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user", //name of state
    initialState:null,
    reducers:{
    addUser:(state,action)=>{
        return action.payload;

    },
    removeUser:()=>{    
        return null;
    }
}
        
});

export const {addUser,removeUser}=userSlice.actions;
export default userSlice.reducer;