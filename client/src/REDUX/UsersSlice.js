import { createSlice } from '@reduxjs/toolkit'
const savedUser = localStorage.getItem('user');

/**
 * Safely retrieves the user from localStorage.
 * Handles cases where data is missing, "undefined", or invalid JSON.
 */
const getInitialUser = () => {
    try {
        if (savedUser && savedUser !== "undefined") {
            return JSON.parse(savedUser);
        }
    }
    catch (e) {
        console.error("Failed to parse user from localStorage", e);
    }
    return {}; 
};
const initialState = {
    current: getInitialUser(),
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.current = action.payload
        },
        logout: (state) => {
            state.current = {}
            localStorage.removeItem('user');
        }
    }
})

export const { setCurrent, logout } = userSlice.actions
export default userSlice.reducer
