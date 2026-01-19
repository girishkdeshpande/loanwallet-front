import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const SearchVisits = createAsyncThunk(
  "visits/search_visits",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("visits/dynamicSearchVisit", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const VisitReport = createAsyncThunk(
  "reports/visit_report",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("reports/getVisitsReports", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const visitSlice = createSlice({
  name: "visits",
  initialState: {
    searchVisitsState: {
      searchVisitsData: null,
      searchVisitsLoading: false,
      searchVisitsError: null,
    },
    visitReportState: {
      visitReportData: null,
      visitReportLoading: false,
      visitReportError: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SearchVisits.pending, (state) => {
        state.searchVisitsState.searchVisitsLoading = true;
      })
      .addCase(SearchVisits.fulfilled, (state, action) => {
        state.searchVisitsState.searchVisitsLoading = false;
        state.searchVisitsState.searchVisitsData = action.payload;
      })
      .addCase(SearchVisits.rejected, (state, action) => {
        state.searchVisitsState.searchVisitsLoading = false;
        state.searchVisitsState.searchVisitsError = action.payload.error;
      })

      .addCase(VisitReport.pending, (state) => {
        state.visitReportState.visitReportLoading = true;
      })
      .addCase(VisitReport.fulfilled, (state, action) => {
        state.visitReportState.visitReportLoading = false;
        state.visitReportState.visitReportData = action.payload;
      })
      .addCase(VisitReport.rejected, (state, action) => {
        state.visitReportState.visitReportLoading = false;
        state.visitReportState.visitReportError = action.payload.error;
      });
  },
});
export default visitSlice.reducer;
