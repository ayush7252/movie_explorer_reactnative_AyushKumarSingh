import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email : null,
    name : null,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.email = action.payload.email;
            state.name = action.payload.name;
        },
        clearUser: (state) =>{
            state.email = null;
            state.name = null;
        },
    },
});

export const{setUser , clearUser} = userSlice.actions;
export default userSlice.reducer;