import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const EmailTemplateNames = createAsyncThunk(
  "emailTemplates/template_names",
  async (thunkAPI) => {
    try {
      const response = await api.get("email_template/templates");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const EmailPreview = createAsyncThunk(
  "emailTemplates/email_preview",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("email_template/email_preview", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const SaveEmailTemplate = createAsyncThunk(
  "emailTemplates/save_email_template",
  async (data, thunkAPI) => {
    try {
      const response = await api.post(
        "email_template/send_save_template",
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const emailTemplatesSlice = createSlice({
  name: "emailTemplates",
  initialState: {
    templateNameState: {
      templateNameData: null,
      templateNameLoading: false,
      templateNameError: null,
    },
    emailPreviewState: {
      emailPreviewData: null,
      emailPreviewLoading: false,
      emailPreviewError: null,
    },
    saveEmailTemplateState: {
      saveEmailTemplateData: null,
      saveEmailTemplateLoading: false,
      saveEmailTemplateError: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(EmailTemplateNames.pending, (state) => {
        state.templateNameState.templateNameLoading = true;
      })
      .addCase(EmailTemplateNames.fulfilled, (state, action) => {
        state.templateNameState.templateNameLoading = false;
        state.templateNameState.templateNameData = action.payload;
      })
      .addCase(EmailTemplateNames.rejected, (state, action) => {
        state.templateNameState.templateNameLoading = false;
        state.templateNameState.templateNameError = action.payload.error;
      })

      .addCase(EmailPreview.pending, (state) => {
        state.emailPreviewState.emailPreviewLoading = true;
      })
      .addCase(EmailPreview.fulfilled, (state, action) => {
        state.emailPreviewState.emailPreviewLoading = false;
        state.emailPreviewState.emailPreviewData = action.payload;
      })
      .addCase(EmailPreview.rejected, (state, action) => {
        state.emailPreviewState.emailPreviewLoading = false;
        state.emailPreviewState.emailPreviewError = action.payload.error;
      })

      .addCase(SaveEmailTemplate.pending, (state) => {
        state.saveEmailTemplateState.saveEmailTemplateLoading = true;
      })
      .addCase(SaveEmailTemplate.fulfilled, (state, action) => {
        state.saveEmailTemplateState.saveEmailTemplateLoading = false;
        state.saveEmailTemplateState.saveEmailTemplateData = action.payload;
      })
      .addCase(SaveEmailTemplate.rejected, (state, action) => {
        state.saveEmailTemplateState.saveEmailTemplateLoading = false;
        state.saveEmailTemplateState.saveEmailTemplateError =
          action.payload.error;
      });
  },
});
export default emailTemplatesSlice.reducer;
