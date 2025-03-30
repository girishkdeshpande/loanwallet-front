import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const AllUsers = createAsyncThunk("user", async (thunkAPI) => {
  try {
    const response = await api.get("user/");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const RegisterUser = createAsyncThunk(
  "user/signup",
  async (userData, thunkAPI) => {
    console.log("user payload", userData);
    try {
      const response = await api.post("user/signup", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const SearchUser = createAsyncThunk(
  "user/search_user",
  async (searchData, thunkAPI) => {
    try {
      const response = await api.post("user/search_user", searchData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const singleUser = createAsyncThunk("user/", async (id, thunkAPI) => {
  try {
    const response = await api.get(`user/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const updateUser = createAsyncThunk(
  "user/update/",
  async ({updateData, id}, thunkAPI) => {
    try {
      const response = await api.put(`user/update/${id}`, updateData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsersState: {
      allUsersData: null,
      allUsersLoading: false,
      allUsersError: null,
    },
    registerUserState: {
      registerUserData: null,
      registerUserLoading: false,
      registerUserError: null,
    },
    searchUserState: {
      searchUserData: null,
      searchUserLoading: false,
      searchUserError: null,
    },
    singleUserState: {
      singleUserData: {},
      singleUserLoading: false,
      singleUserError: null,
    },
    updateUserState: {
      updateUserData: null,
      updateUserLoading: false,
      updateUserError: null,
    },
  },
  reducers: {
    resetUpdateUserState: (state) => {
      state.updateUserState = {
        updateUserData: null,
        updateUserLoading: false,
        updateUserError: null,
      }
    },

    resetRegisterUserState: (state) => {
      state.registerUserState = {
        registerUserData: null,
        registerUserLoading: false,
        registerUserError: null,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handles update user
      .addCase(updateUser.pending, (state) => {
        state.updateUserState.updateUserLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserState.updateUserLoading = false;
        state.updateUserState.updateUserData = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserState.updateUserLoading = false;
        state.updateUserState.updateUserError = action.payload.error;
      })

      // Handles single user
      .addCase(singleUser.pending, (state) => {
        state.singleUserState.singleUserLoading = true;
      })
      .addCase(singleUser.fulfilled, (state, action) => {
        state.singleUserState.singleUserLoading = false;
        state.singleUserState.singleUserData = action.payload;
      })
      .addCase(singleUser.rejected, (state, action) => {
        state.singleUserState.singleUserLoading = false;
        state.singleUserState.singleUserError = action.payload.error;
      })

      // Handle search user
      .addCase(SearchUser.pending, (state) => {
        state.searchUserState.searchUserLoading = true;
      })
      .addCase(SearchUser.fulfilled, (state, action) => {
        state.searchUserState.searchUserLoading = false;
        state.searchUserState.searchUserData = action.payload;
      })
      .addCase(SearchUser.rejected, (state, action) => {
        state.searchUserState.searchUserLoading = false;
        state.searchUserState.searchUserError = action.payload.error;
      })

      // Handle register user
      .addCase(RegisterUser.pending, (state) => {
        state.registerUserState.registerUserLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.registerUserState.registerUserLoading = false;
        state.registerUserState.registerUserData = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.registerUserState.registerUserLoading = false;
        state.registerUserState.registerUserError = action.payload.error;
      })

      // Handle all users
      .addCase(AllUsers.pending, (state) => {
        state.allUsersState.allUsersLoading = true;
      })
      .addCase(AllUsers.fulfilled, (state, action) => {
        state.allUsersState.allUsersLoading = false;
        state.allUsersState.allUsersData = action.payload;
      })
      .addCase(AllUsers.rejected, (state, action) => {
        state.allUsersState.allUsersLoading = false;
        state.allUsersState.allUsersError = action.payload.error;
      })
  },
});

export const { resetLogoutState } = userSlice.actions;
export const {resetUpdateUserState} = userSlice.actions;
export const {resetRegisterUserState} = userSlice.actions;
export default userSlice.reducer;
