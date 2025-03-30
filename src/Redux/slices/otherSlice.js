import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const CustomSetting = createAsyncThunk(
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

export const UpdateCustomSetting = createAsyncThunk(
  "user/update-custom-setting",
  async (updateData, thunkAPI) => {
    try {
      const response = await api.put("user/custom-setting", updateData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const Notification = createAsyncThunk(
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
    updateCustomSettingState: {
      updateCustomSettingData: null,
      updateCustomSettingLoading: false,
      updateCustomSettingError: null,
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
    },
    // resetCustomSettingUpdateState: (state) => {
    //   state.customSettingState.isCustomSettingUpdated = false;
    // },
  },
  extraReducers: (builder) => {
    builder
    
      // handles get custom settings
      .addCase(CustomSetting.pending, (state) => {
        state.customSettingState.customSettingLoading = true;
      })
      .addCase(CustomSetting.fulfilled, (state, action) => {
        state.customSettingState.customSettingLoading = false;
        state.customSettingState.customSettingData = action.payload;
      })
      .addCase(CustomSetting.rejected, (state, action) => {
        state.customSettingState.customSettingLoading = false;
        state.customSettingState.customSettingError = action.payload.error;
      })
      
      // handles update custom settings
      .addCase(UpdateCustomSetting.pending, (state) => {
        state.updateCustomSettingState.updateCustomSettingLoading = true;
      })
      .addCase(UpdateCustomSetting.fulfilled, (state, action) => {
        state.updateCustomSettingState.updateCustomSettingLoading = false;
        state.updateCustomSettingState.updateCustomSettingData = action.payload;
      })
      .addCase(UpdateCustomSetting.rejected, (state, action) => {
        state.updateCustomSettingState.updateCustomSettingLoading = false;
        state.updateCustomSettingState.updateCustomSettingError = action.payload.error;
      })

      // handles notifications
      .addCase(Notification.pending, (state) => {
        state.notificationState.notificationLoading = true;
      })
      .addCase(Notification.fulfilled, (state, action) => {
        state.notificationState.notificationLoading = false;
        state.notificationState.notificationData = action.payload;
      })
      .addCase(Notification.rejected, (state, action) => {
        state.notificationState.notificationLoading = false;
        state.notificationState.notificationError = action.payload.error;
      });
  },
});

export const {resetCustomSettingState} = otherSlice.actions;
export const {resetNotificationState} = otherSlice.actions;
// export const {resetCustomSettingUpdateState} = otherSlice.actions;
export default otherSlice.reducer;
