import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        email:'',
        password:'',
    },
    isLoggedIn: false,
    isAdmin: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logoutSuccess: (state) => {
            state.isLoggedIn = false;
        },
    }
})
export const {login, logoutSuccess} = userSlice.actions;
export default userSlice.reducer;