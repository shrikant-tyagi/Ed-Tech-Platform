import { createSlice } from "@reduxjs/toolkit";
import { Toast } from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems")  ? JSON.parse(localStorage.getItem("totalItems")) : null
};

const profileSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers: {
        setTotalItems(state,value) {
            state.token = value.payload;
        }
    }
})

export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;