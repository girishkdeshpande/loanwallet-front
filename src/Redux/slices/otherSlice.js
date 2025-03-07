import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const customSetting = createAsyncThunk(
  "user/custom-setting",
  async (thunkAPI) => {
    try {
      const response = await api.get("user/custom-setting");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const notification = createAsyncThunk(
  "notification",
  async (thunkAPI) => {
    try {
      const response = await api.get("notification");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const otherSlice = createSlice({
  name: "other",
  initialState: {
    customSettingState: {
      customSettingData: null,
      customSettingLoading: false,
      customSettingError: null,
    },
    notificationState: {
        notificationData: null,
        notificationLoading: false,
        notificationError: null,
      },
  },
  reducers: {
    resetCustomSettingState: (state) => {
      state.customSettingState = {
        customSettingData: null,
        customSettingLoading: false,
        customSettingError: null,
      };
    },
    resetNotificationState: (state) => {
      state.notificationState = {
        notificationData: null,
        notificationLoading: false,
        notificationError: null,
      }
    }
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(customSetting.pending, (state) => {
        state.customSettingState.customSettingLoading = true;
      })
      .addCase(customSetting.fulfilled, (state, action) => {
        state.customSettingState.customSettingLoading = false;
        state.customSettingState.customSettingData = action.payload;
      })
      .addCase(customSetting.rejected, (state, action) => {
        state.customSettingState.customSettingLoading = false;
        state.customSettingState.customSettingError = action.payload.error;
      })
      
      .addCase(notification.pending, (state) => {
        state.notificationState.notificationLoading = true;
      })
      .addCase(notification.fulfilled, (state, action) => {
        state.notificationState.notificationLoading = false;
        state.notificationState.notificationData = action.payload;
      })
      .addCase(notification.rejected, (state, action) => {
        state.notificationState.notificationLoading = false;
        state.notificationState.notificationError = action.payload.error;
      });
  },
});

export const {resetCustomSettingState} = otherSlice.actions;
export const {resetNotificationState} = otherSlice.actions;
export default otherSlice.reducer;
