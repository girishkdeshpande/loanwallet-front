import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api.js'

export const allCompanyTypes = createAsyncThunk('company/getAllCompanyTypes/', async(list_type) => {
    const response = await api.get(`company/getAllCompanyTypes/${list_type}`);
    return response.data;
})


export const foundryTypes = createAsyncThunk('company/getAllFoundryTypes', async() => {
    const response = await api.get('company/getAllFoundryTypes');
    return response.data;
})

export const furnaceTypes = createAsyncThunk('company/getAllFurnaceTypes', async() => {
    const response = await api.get('company/getAllFurnaceTypes');
    return response.data;
})

export const operationTypes = createAsyncThunk('company/getAllOperationTypes', async() => {
    const response = await api.get('company/getAllOperationTypes');
    return response.data;
})

export const chargeMedia = createAsyncThunk('company/getAllChargeMedia', async() => {
    const response = await api.get('company/getAllChargeMedia');
    return response.data;
})

