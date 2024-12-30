import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userAuth",
    initialState:{
        user:null,
        token:null,
        isAdmin:false,
        isAuthenticate:false,
        loading:false,
        error:null,
    },
    reducers:{
        login:(state,action)=>{
            const {user,token} = action.payload;
            state.user = user;
            if(user.isAdmin===true)
            {
                state.isAdmin=true;
            }
            state.isAuthenticate=true;
            state.token =token;
        },
        logout:(state)=>{
            state.user=null;
            state.isAdmin=false;
            state.isAuthenticate=false;
            state.token=null;
        },
        setError:(state,action)=>{
            state.error = action.payload;
        },
        setLoading:(state,action)=>{
            state.loading = action.payload;
        }
        

    }
});

export const {login,logout,setError,setLoading} = userSlice.actions;
export default userSlice.reducer;