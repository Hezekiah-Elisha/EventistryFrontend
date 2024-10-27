import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
            localStorage.removeItem('user');
        },
        signupStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        signupSuccess: (state) => {
            state.loading = false;
            state.error = false;
        },
        signupFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, signupStart, signupSuccess, signupFailure } = userSlice.actions;
export default userSlice.reducer;
