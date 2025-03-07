import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './slices/loginSlice.js';
import userReducer from './slices/userSlice.js';
import companyReducer from './slices/companySlice.js';
import otherReducer from './slices/otherSlice.js';

const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        company: companyReducer,
        other: otherReducer,
    },
});

export default store;