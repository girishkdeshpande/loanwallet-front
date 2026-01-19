import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const SearchQuotations = createAsyncThunk(
  "quotation/search_quotations",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("quotation/all_quotations_new", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const ChangeQuotationStatus = createAsyncThunk(
  "quotation/change_status",
  async ({ id, remark }, thunkAPI) => {
    try {
      const response = await api.post(`quotation/quotation_status/${id}`, {
        remark,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const SendAddQuotation = createAsyncThunk(
  "quotation/add_quotation",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("quotation/add", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

const quotationSlice = createSlice({
  name: "quotations",
  initialState: {
    searchQuotationsState: {
      searchQuotationsData: null,
      searchQuotationsLoading: false,
      searchQuotationsError: null,
    },
    quotationStatusState: {
      quotationStatusData: null,
      quotationStatusLoading: false,
      quotationStatusError: null,
    },
    sendAddQuotationState: {
      sendAddQuotationData: null,
      sendAddQuotationLoading: false,
      sendAddQuotationError: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SearchQuotations.pending, (state) => {
        state.searchQuotationsState.searchQuotationsLoading = true;
      })
      .addCase(SearchQuotations.fulfilled, (state, action) => {
        state.searchQuotationsState.searchQuotationsLoading = false;
        state.searchQuotationsState.searchQuotationsData = action.payload;
      })
      .addCase(SearchQuotations.rejected, (state, action) => {
        state.searchQuotationsState.searchQuotationsLoading = false;
        state.searchQuotationsState.searchQuotationsError =
          action.payload.error;
      })

      .addCase(ChangeQuotationStatus.pending, (state) => {
        state.quotationStatusState.quotationStatusLoading = true;
      })
      .addCase(ChangeQuotationStatus.fulfilled, (state, action) => {
        state.quotationStatusState.quotationStatusLoading = false;
        state.quotationStatusState.quotationStatusData = action.payload;
      })
      .addCase(ChangeQuotationStatus.rejected, (state, action) => {
        state.quotationStatusState.quotationStatusLoading = false;
        state.quotationStatusState.quotationStatusError = action.payload.error;
      })

      .addCase(SendAddQuotation.pending, (state) => {
        state.sendAddQuotationState.sendAddQuotationLoading = true;
      })
      .addCase(SendAddQuotation.fulfilled, (state, action) => {
        state.sendAddQuotationState.sendAddQuotationLoading = false;
        state.sendAddQuotationState.sendAddQuotationData = action.payload;
      })
      .addCase(SendAddQuotation.rejected, (state, action) => {
        state.sendAddQuotationState.sendAddQuotationLoading = false;
        state.sendAddQuotationState.sendAddQuotationError =
          action.payload.error;
      });
  },
});

export default quotationSlice.reducer;
