import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const LoginData = createAsyncThunk(
  "user/login",
  async (loginData, thunkAPI) => {
    try {
      const response = await api.post("user/login", loginData);
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.data.access);
        localStorage.setItem("refresh_token", response.data.data.refresh);
        localStorage.setItem("id", response.data.data.id);
        localStorage.setItem("isAdmin", response.data.data.isAdmin);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const LogoutData = createAsyncThunk(
  "user/logout",
  async (logoutData, thunkAPI) => {
    try {
      const response = await api.post("user/logout", logoutData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const ForgotPasswordData = createAsyncThunk(
  "user/forgot-password",
  async (forgotPasswordData, thunkAPI) => {
    try {
      const response = await api.post(
        "user/forgot-password",
        forgotPasswordData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verify_otp",
  async (otp, thunkAPI) => {
    try {
      const response = await api.post("user/verify_otp", otp);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const setForgotPassword = createAsyncThunk(
  "user/set-forgot-password",
  async (setPasswordData, thunkAPI) => {
    try {
      const response = await api.put(
        "user/set-forgot-password",
        setPasswordData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginState: {
      loginData: null,
      loginLoading: false,
      loginError: null,
      accessToken: localStorage.getItem("access_token") || null,
      resetLoginState: null,
    },

    logoutState: {
      logoutData: null,
      logoutLoading: false,
      logoutError: null,
      resetLogoutState: null,
    },

    forgotPasswordState: {
      forgotPasswordData: null,
      forgotPasswordLoading: false,
      forgotPasswordError: null,
      fpValues: {},
    },

    verifyOtpState: {
      verifyOtpData: null,
      verifyOtpLoading: false,
      verifyOtpError: null,
    },

    setPasswordState: {
      setPasswordData: null,
      setPasswordLoading: false,
      setPasswordError: null,
    },
  },

  reducers: {
    forgotPasswordValues: (state, action) => {
      state.forgotPasswordState.fpValues = action.payload;
    },
    resetLogoutState: (state) => {
      state.logoutState = {
        logoutData: null,
        logoutLoading: false,
        logoutError: null,
      };
    },
    resetLoginState: (state) => {
      state.loginState = {
        loginData: null,
        loginLoading: false,
        loginError: null,
        accessToken: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // Handles user login
      .addCase(LoginData.pending, (state) => {
        state.loginState.loginLoading = true;
        state.loginState.loginError = null;
      })
      .addCase(LoginData.fulfilled, (state, action) => {
        state.loginState.loginLoading = false;
        state.loginState.loginData = action.payload;
      })
      .addCase(LoginData.rejected, (state, action) => {
        state.loginState.loginLoading = false;
        state.loginState.loginError = action.payload.error;
      })

      // Handles user logout
      .addCase(LogoutData.pending, (state) => {
        state.logoutState.logoutLoading = true;
        state.logoutState.logoutError = null;
      })
      .addCase(LogoutData.fulfilled, (state, action) => {
        state.logoutState.logoutLoading = false;
        state.logoutState.logoutData = action.payload;
      })
      .addCase(LogoutData.rejected, (state, action) => {
        state.logoutState.logoutLoading = false;
        state.logoutState.logoutError = action.payload.error;
      })

      // Handles forgot password
      .addCase(ForgotPasswordData.pending, (state) => {
        state.forgotPasswordState.forgotPasswordLoading = true;
        state.forgotPasswordState.forgotPasswordError = null;
      })
      .addCase(ForgotPasswordData.fulfilled, (state, action) => {
        state.forgotPasswordState.forgotPasswordLoading = false;
        state.forgotPasswordState.forgotPasswordData = action.payload;
      })
      .addCase(ForgotPasswordData.rejected, (state, action) => {
        state.forgotPasswordState.forgotPasswordLoading = false;
        state.forgotPasswordState.forgotPasswordError = action.payload.error;
      })

      // Handles verify otp
      .addCase(verifyOtp.pending, (state) => {
        state.verifyOtpState.verifyOtpLoading = true;
        state.verifyOtpState.verifyOtpError = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.verifyOtpState.verifyOtpLoading = false;
        state.verifyOtpState.verifyOtpData = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifyOtpState.verifyOtpLoading = false;
        state.verifyOtpState.verifyOtpError = action.payload.error;
      })

      // Handle set password
      .addCase(setForgotPassword.pending, (state) => {
        state.setPasswordState.setPasswordLoading = true;
        state.setPasswordState.setPasswordError = null;
      })
      .addCase(setForgotPassword.fulfilled, (state, action) => {
        state.setPasswordState.setPasswordLoading = false;
        state.setPasswordState.setPasswordData = action.payload;
      })
      .addCase(setForgotPassword.rejected, (state, action) => {
        state.setPasswordState.setPasswordLoading = false;
        state.setPasswordState.setPasswordError = action.payload.error;
      });
  },
});

export const { forgotPasswordValues } = loginSlice.actions;
export const { resetLogoutState } = loginSlice.actions;
export const { resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;
