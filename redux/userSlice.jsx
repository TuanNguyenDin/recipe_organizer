import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        email: '',
        password: '',
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
            if (state.user.email === 'admin') state.isAdmin = true;
            state.isLoggedIn = true;
        },
        logoutSuccess: (state) => {
            state.isLoggedIn = false;
            state.isAdmin = false;
        },
    }
})
export const { login, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;