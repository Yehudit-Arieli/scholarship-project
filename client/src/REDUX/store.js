import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UsersSlice'
import requestReducer from './RequestSlice'

const store = configureStore({
    reducer: {
        request: requestReducer,
        user: userReducer,
    }
})
export default store




