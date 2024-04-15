import { configureStore } from '@reduxjs/toolkit'
import loginReducers from './AuthSlice'
const store = configureStore({
    reducer : loginReducers
});

export default store;