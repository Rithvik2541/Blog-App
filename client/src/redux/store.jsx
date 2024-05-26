import {configureStore} from '@reduxjs/toolkit';
import userAuthorSlice from '../redux/slices/userAuthorSlice';

export const store = configureStore({
    reducer:{
        userAuthorLoginReducer : userAuthorSlice
    }
})