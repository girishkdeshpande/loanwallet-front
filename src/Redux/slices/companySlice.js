import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const RegisterCompany = createAsyncThunk(
  "company/registerCompany",
  async (company_data, thunkAPI) => {
    try {
      const response = await api.post("company/register_company", company_data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const SingleCompany = createAsyncThunk(
  "company/single_company",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`company/getOneCompany/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const AllCompanies = createAsyncThunk(
  "company/all_companies",
  async (data, thunkAPI) => {
    try {
      const response = await api.get("company/getAllCompany", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const UpdateCompany = createAsyncThunk(
  "company/update_company",
  async (id, update_data, thunkAPI) => {
    try {
      const response = await api.put(
        `company/updateCompany/${id}`,
        update_data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const SearchCompany = createAsyncThunk(
  "company/search_company",
  async (company_name, thunkAPI) => {
    try {
      const response = await api.post(
        "company/searchCompanyWithName",
        company_name
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const DeleteCompany = createAsyncThunk(
  "company/delete_company",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`company/deleteCompany/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    registerCompanyState: {
      registerCompanyData: null,
      registerCompanyLoading: false,
      registerCompanyError: null,
    },
    singleCompanyState: {
      singleCompanyData: null,
      singleCompanyLaoding: false,
      singleCompanyError: null,
    },
    allCompanyState: {
      allCompanyData: null,
      allCompanyLoading: false,
      allCompanyError: null,
    },
    updateCompanyState: {
      updateCompanyData: null,
      updateCompanyLoading: false,
      updateCompanyError: null,
    },
    deleteCompanyState: {
      deleteCompanyData: null,
      deleteCompanyLoading: false,
      deleteCompanyError: null,
    },
    searchCompanyState: {
      searchCompanyData: null,
      searchCompanyLoading: false,
      searchCompanyError: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RegisterCompany.pending, (state) => {
        state.registerCompanyState.registerCompanyLoading = true;
      })
      .addCase(RegisterCompany.fulfilled, (state, action) => {
        state.registerCompanyState.registerCompanyLoading = false;
        state.registerCompanyState.registerCompanyData = action.payload;
      })
      .addCase(RegisterCompany.rejected, (state, action) => {
        state.registerCompanyState.registerCompanyLoading = false;
        state.registerCompanyState.registerCompanyError = action.payload.error;
      })

      .addCase(SingleCompany.pending, (state) => {
        state.singleCompanyState.singleCompanyLaoding = true;
      })
      .addCase(SingleCompany.fulfilled, (state, action) => {
        state.singleCompanyState.singleCompanyLaoding = false;
        state.singleCompanyState.singleCompanyData = action.payload;
      })
      .addCase(SingleCompany.rejected, (state, action) => {
        state.singleCompanyState.singleCompanyLaoding = false;
        state.singleCompanyState.singleCompanyError = action.payload.error;
      })

      .addCase(AllCompanies.pending, (state) => {
        state.allCompanyState.allCompanyLoading = true;
      })
      .addCase(AllCompanies.fulfilled, (state, action) => {
        state.allCompanyState.allCompanyLoading = false;
        state.allCompanyState.allCompanyData = action.payload;
      })
      .addCase(AllCompanies.rejected, (state, action) => {
        state.allCompanyState.allCompanyLoading = false;
        state.allCompanyState.allCompanyError = action.payload.error;
      })

      .addCase(UpdateCompany.pending, (state) => {
        state.updateCompanyState.updateCompanyLoading = true;
      })
      .addCase(UpdateCompany.fulfilled, (state, action) => {
        state.updateCompanyState.updateCompanyLoading = false;
        state.updateCompanyState.updateCompanyData = action.payload;
      })
      .addCase(UpdateCompany.rejected, (state, action) => {
        state.updateCompanyState.updateCompanyLoading = false;
        state.updateCompanyState.updateCompanyError = action.payload.error;
      })

      .addCase(SearchCompany.pending, (state) => {
        state.searchCompanyState.searchCompanyLoading = true;
      })
      .addCase(SearchCompany.fulfilled, (state, action) => {
        state.searchCompanyState.searchCompanyLoading = false;
        state.searchCompanyState.searchCompanyData = action.payload;
      })
      .addCase(SearchCompany.rejected, (state, action) => {
        state.searchCompanyState.searchCompanyLoading = false;
        state.searchCompanyState.searchCompanyError = action.payload.error;
      })

      .addCase(DeleteCompany.pending, (state) => {
        state.deleteCompanyState.deleteCompanyLoading = true;
      })
      .addCase(DeleteCompany.fulfilled, (state, action) => {
        state.deleteCompanyState.deleteCompanyLoading = false;
        state.deleteCompanyState.deleteCompanyData = action.payload;
      })
      .addCase(DeleteCompany.rejected, (state, action) => {
        state.deleteCompanyState.deleteCompanyLoading = false;
        state.deleteCompanyState.deleteCompanyError = action.payload.error;
      });
  },
});

export default companySlice.reducer;
