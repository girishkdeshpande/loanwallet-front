import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api.js'

export const addCompany = createAsyncThunk('company/registerCompany', async(company_data) => {
    const response = await api.post('company/registerCompany', company_data);
    return response.data;
})

export const singleCompany = createAsyncThunk('company/getOneCompany/', async(id) => {
    const response = await api.get(`company/getOneCompany/${id}`);
    return response.data;
})

export const allCompanies = createAsyncThunk('company/getAllCompany', async() => {
    const response = await api.get('company/getAllCompany');
    return response.data;
})

export const updateCompany = createAsyncThunk('company/updateCompany/', async(id, update_data) => {
    const response = await api.put(`company/updateCompany/${id}`, update_data);
    return response.data;
})

export const searchCompany = createAsyncThunk('company/searchCompanyWithName', async(company_name) => {
    const response = await api.post('company/searchCompanyWithName', company_name);
    return response.data;
})

export const deleteCompany = createAsyncThunk('company/deleteCompany/', async(id) => {
    const response = await api.delete(`company/deleteCompany/${id}`);
    return response.data;
})


const companySlice = createSlice({
    name: 'company',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addCompany.pending, (state) => {state.loading = true;})
        .addCase(addCompany.fulfilled, (state,action) => {
            state.loading = false;
            state.register = action.payload;
        })
        .addCase(addCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(singleCompany.pending, (state) => {state.loading = true;})
        .addCase(singleCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.single = action.payload;
        })
        .addCase(singleCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(allCompanies.pending, (state) => {state.loading = true;})
        .addCase(allCompanies.fulfilled, (state, action) => {
            state.loading = false;
            state.all = action.payload;
        })
        .addCase(allCompanies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(updateCompany.pending, (state) => {state.loading = true;})
        .addCase(updateCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.update = {...state.update, ...action.payload};
        })
        .addCase(updateCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(searchCompany.pending, (state) => {state.loading = true;})
        .addCase(searchCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.search = action.payload;
        })
        .addCase(searchCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(deleteCompany.pending, (state) => {state.loading = true;})
        .addCase(deleteCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.delete = action.payload;
        })
        .addCase(deleteCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default companySlice.reducer;





