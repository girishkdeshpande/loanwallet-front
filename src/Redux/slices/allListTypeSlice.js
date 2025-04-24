import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const allCompanyTypes = createAsyncThunk(
  "company/getAllCompanyTypes/",
  async (list_type) => {
    const response = await api.get(`company/getAllCompanyTypes/${list_type}`);
    return response.data;
  }
);

export const foundryTypes = createAsyncThunk(
  "company/getAllFoundryTypes",
  async () => {
    const response = await api.get("company/getAllFoundryTypes");
    return response.data;
  }
);

export const furnaceTypes = createAsyncThunk(
  "company/getAllFurnaceTypes",
  async () => {
    const response = await api.get("company/getAllFurnaceTypes");
    return response.data;
  }
);

export const operationTypes = createAsyncThunk(
  "company/getAllOperationTypes",
  async () => {
    const response = await api.get("company/getAllOperationTypes");
    return response.data;
  }
);

export const chargeMedia = createAsyncThunk(
  "company/getAllChargeMedia",
  async () => {
    const response = await api.get("company/getAllChargeMedia");
    return response.data;
  }
);

export const ContactPersonDesignationList = createAsyncThunk(
  "company/all_contact_person_designation",
  async (thunkAPI) => {
    try {
      const response = await api.get("company/getAllContactDesignation");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const allListTypeSlice = createSlice({
  name: "all_list_type",
  initialState: {
    contactPersonDesignationListState: {
      contactPersonDesignationListData: null,
      contactPersonDesignationListLoading: false,
      contactPersonDesignationListError: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ContactPersonDesignationList.pending, (state) => {
        state.contactPersonDesignationListState.contactPersonDesignationListLoading = true;
      })
      .addCase(ContactPersonDesignationList.fulfilled, (state, action) => {
        state.contactPersonDesignationListState.contactPersonDesignationListLoading = false;
        state.contactPersonDesignationListState.contactPersonDesignationListData =
          action.payload;
      })
      .addCase(ContactPersonDesignationList.rejected, (state, action) => {
        state.contactPersonDesignationListState.contactPersonDesignationListLoading = false;
        state.contactPersonDesignationListState.contactPersonDesignationListError =
          action.payload.error;
      });
  },
});

export default allListTypeSlice.reducer;
