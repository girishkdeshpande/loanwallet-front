import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const RegisterEvent = createAsyncThunk(
  "event/registerEvent",
  async (event_data, thunkAPI) => {
    try {
      const response = await api.post("todo/add", event_data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const SingleEvent = createAsyncThunk(
  "event/single_event",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`todo/getOne/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const AllEvents = createAsyncThunk(
  "event/all_events",
  async (thunkAPI) => {
    try {
      const response = await api.get("todo/all");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const MonthlyEvents = createAsyncThunk(
  "event/monthly_events",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("todo/todobymonth", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    registerEventState: {
      registerEventData: null,
      registerEventLoading: false,
      registerEventError: null,
    },
    singleEventState: {
      singleEventData: null,
      singleEventLaoding: false,
      singleEventError: null,
    },
    allEventState: {
      allEventData: null,
      allEventLoading: false,
      allEventError: null,
    },
    monthlyEventState: {
      monthlyEventData: null,
      monthlyEventLoading: false,
      monthlyEventError: null,
    },
  },
  reducers: {
    resetRegisterEventState: (state) => {
      state.registerEventState = {
        registerEventData: null,
        registerEventLoading: false,
        registerEventError: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterEvent.pending, (state) => {
        state.registerEventState.registerEventLoading = true;
      })
      .addCase(RegisterEvent.fulfilled, (state, action) => {
        state.registerEventState.registerEventLoading = false;
        state.registerEventState.registerEventData = action.payload;
      })
      .addCase(RegisterEvent.rejected, (state, action) => {
        state.registerEventState.registerEventLoading = false;
        state.registerEventState.registerEventError = action.payload.error;
      })

      .addCase(SingleEvent.pending, (state) => {
        state.singleEventState.singleEventLaoding = true;
      })
      .addCase(SingleEvent.fulfilled, (state, action) => {
        state.singleEventState.singleEventLaoding = false;
        state.singleEventState.singleEventData = action.payload;
      })
      .addCase(SingleEvent.rejected, (state, action) => {
        state.singleEventState.singleEventLaoding = false;
        state.singleEventState.singleEventError = action.payload.error;
      })

      .addCase(AllEvents.pending, (state) => {
        state.allEventState.allEventLoading = true;
      })
      .addCase(AllEvents.fulfilled, (state, action) => {
        state.allEventState.allEventLoading = false;
        state.allEventState.allEventData = action.payload;
      })
      .addCase(AllEvents.rejected, (state, action) => {
        state.allEventState.allEventLoading = false;
        state.allEventState.allEventError = action.payload.error;
      })

      .addCase(MonthlyEvents.pending, (state) => {
        state.monthlyEventState.monthlyEventLoading = true;
      })
      .addCase(MonthlyEvents.fulfilled, (state, action) => {
        state.monthlyEventState.monthlyEventLoading = false;
        state.monthlyEventState.monthlyEventData = action.payload;
      })
      .addCase(MonthlyEvents.rejected, (state, action) => {
        state.monthlyEventState.monthlyEventLoading = false;
        state.monthlyEventState.monthlyEventError = action.payload.error;
      });
  },
});

export const { resetRegisterEventState } = todoSlice.actions;
export default todoSlice.reducer;
