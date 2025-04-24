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

export const SingleUser = createAsyncThunk("user/", async (id, thunkAPI) => {
  try {
    const response = await api.get(`user/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const UpdateUser = createAsyncThunk(
  "user/update/",
  async ({ updateData, id }, thunkAPI) => {
    try {
      const response = await api.put(`user/update/${id}`, updateData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const DeleteUser = createAsyncThunk(
  "user/delete",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`user/delete/${id}`);
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
    deleteUserState: {
      deleteUserData: null,
      deleteUserLoading: false,
      deleteUserError: null,
    },
  },
  reducers: {
    resetUpdateUserState: (state) => {
      state.updateUserState = {
        updateUserData: null,
        updateUserLoading: false,
        updateUserError: null,
      };
    },

    resetRegisterUserState: (state) => {
      state.registerUserState = {
        registerUserData: null,
        registerUserLoading: false,
        registerUserError: null,
      };
    },

    resetDeleteUserState: (state) => {
      state.deleteUserState = {
        deleteUserData: null,
        deleteUserLoading: false,
        deleteUserError: null,
      };
    },

    updateUserRecordState: (state, action) => {
      const updateUser = action.payload;
      if (Array.isArray(state.allUsersState.allUsersData)) {
        const index = state.allUsersState.allUsersData.findIndex(
          (user) => user.id === updateUser.id
        );

        if (index !== -1) {
          state.allUsersState.allUsersData[index] = {
            ...state.allUsersState.allUsersData[index],
            ...updateUser,
          };
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Handles update user
      .addCase(UpdateUser.pending, (state) => {
        state.updateUserState.updateUserLoading = true;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.updateUserState.updateUserLoading = false;
        state.updateUserState.updateUserData = action.payload;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.updateUserState.updateUserLoading = false;
        state.updateUserState.updateUserError = action.payload.error;
      })

      // Handles single user
      .addCase(SingleUser.pending, (state) => {
        state.singleUserState.singleUserLoading = true;
      })
      .addCase(SingleUser.fulfilled, (state, action) => {
        state.singleUserState.singleUserLoading = false;
        state.singleUserState.singleUserData = action.payload;
      })
      .addCase(SingleUser.rejected, (state, action) => {
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

      // Handle delete user
      .addCase(DeleteUser.pending, (state) => {
        state.deleteUserState.deleteUserLoading = true;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.deleteUserState.deleteUserLoading = false;
        state.deleteUserState.deleteUserData = action.payload;
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.deleteUserState.deleteUserLoading = false;
        state.deleteUserState.deleteUserError = action.payload.error;
      });
  },
});

export const { resetLogoutState } = userSlice.actions;
export const { resetUpdateUserState, updateUserRecordState } =
  userSlice.actions;
export const { resetRegisterUserState, resetDeleteUserState } =
  userSlice.actions;
export default userSlice.reducer;
