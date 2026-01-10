import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const TallyCompanyNames = createAsyncThunk(
  "sales/tally_company_names",
  async (data, thunkAPI) => {
    try {
      const response = await api.get("tally/tally_company_names", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const TallyTransactions = createAsyncThunk(
  "sales/tally_transactions",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("tally/get_tally_transaction", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    tallyCompanyNamesState: {
      tallyCompanyNamesData: null,
      tallyCompanyNamesLoading: false,
      tallyCompanyNamesError: null,
    },
    tallyTransactionsState: {
      tallyTransactionsData: null,
      tallyTransactionsLoading: false,
      tallyTransactionsError: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TallyCompanyNames.pending, (state) => {
        state.tallyCompanyNamesState.tallyCompanyNamesLoading = true;
      })
      .addCase(TallyCompanyNames.fulfilled, (state, action) => {
        state.tallyCompanyNamesState.tallyCompanyNamesLoading = false;
        state.tallyCompanyNamesState.tallyCompanyNamesData = action.payload;
      })
      .addCase(TallyCompanyNames.rejected, (state, action) => {
        state.tallyCompanyNamesState.tallyCompanyNamesLoading = false;
        state.tallyCompanyNamesState.tallyCompanyNamesError =
          action.payload.error;
      })
      .addCase(TallyTransactions.pending, (state) => {
        state.tallyTransactionsState.tallyTransactionsLoading = true;
      })
      .addCase(TallyTransactions.fulfilled, (state, action) => {
        state.tallyTransactionsState.tallyTransactionsLoading = false;
        state.tallyTransactionsState.tallyTransactionsData = action.payload;
      })
      .addCase(TallyTransactions.rejected, (state, action) => {
        state.tallyTransactionsState.tallyTransactionsLoading = false;
        state.tallyTransactionsState.tallyTransactionsError =
          action.payload.error;
      });
  },
});
export default salesSlice.reducer;
