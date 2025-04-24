import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./slices/loginSlice.js";
import userReducer from "./slices/userSlice.js";
import companyReducer from "./slices/companySlice.js";
import otherReducer from "./slices/otherSlice.js";
import globalMessageReducer from "./slices/globalMessageSlice.js";
// import all_list_typeReducer from "./slices/allListTypeSlice.js";

const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    company: companyReducer,
    other: otherReducer,
    // all_list_type: all_list_typeReducer,
    globalMessage: globalMessageReducer,
  },
});

export default store;
