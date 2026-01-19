import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./slices/loginSlice.js";
import userReducer from "./slices/userSlice.js";
import companyReducer from "./slices/companySlice.js";
import productReducer from "./slices/productSlice.js";
import otherReducer from "./slices/otherSlice.js";
import globalMessageReducer from "./slices/globalMessageSlice.js";
import todoReducer from "./slices/todoSlices.js";
// import all_list_typeReducer from "./slices/allListTypeSlice.js";
import emailTemplateReducer from "./slices/emailTemplatesSlices.js";
import salesReducer from "./slices/salesSlices.js";
import visitReducer from "./slices/visitSlices.js";
import expenseReducer from "./slices/expenseSlices.js";
import quotationReducer from "./slices/quotationSlices.js";

const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    company: companyReducer,
    product: productReducer,
    todo: todoReducer,
    other: otherReducer,
    emailTemplates: emailTemplateReducer,
    // all_list_type: all_list_typeReducer,
    globalMessage: globalMessageReducer,
    sales: salesReducer,
    visits: visitReducer,
    expense: expenseReducer,
    quotation: quotationReducer,
  },
});

export default store;
