import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Current draft of the scholarship application
    current: {
        personal: {},
        family: {},
        course: {},
        bank: {}
    }
}
const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {

        // Resets the current application draft to its initial state
        setCurrent: (state) => {
            state.current = initialState.current;
        },

        // Updates personal information section
        setPersonal: (state, action) => {
            state.current.personal = action.payload
        },

        // Updates family background information
        setFamily: (state, action) => {
            state.current.family = action.payload
        },

        // Updates academic/course details
        setCourse: (state, action) => {
            state.current.course = action.payload
        },

        // Updates bank account details
        setBank: (state, action) => {
            state.current.bank = action.payload
        }
    }
}
)
export const { setPersonal, setFamily, setCourse, setBank, setCurrent } = requestSlice.actions
export default requestSlice.reducer
