import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warningMessage: {
    show: false,
    message: "",
    loadingKey: null,
  },
};

const globalMessageSlice = createSlice({
  name: "globalMessage",
  initialState,
  reducers: {
    showWarningMessage: (state, action) => {
      const { message, loadingKey } = action.payload;
      state.show = true;
      state.message = message;
      state.loadingKey = loadingKey;
    },
    hideWarningMessage: (state) => {
      state.show = false;
      state.message = "";
      state.loadingKey = null;
    },
  },
});

export const { showWarningMessage, hideWarningMessage } =
  globalMessageSlice.actions;
export default globalMessageSlice.reducer;
