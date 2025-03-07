import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api.js'

export const registerContactPerson = createAsyncThunk('company/registerContactPerson', async(contact_person_data) => {
    const response = await api.post('company/registerContactPerson', contact_person_data);
    return response.data;
})

export const contactPerson = createAsyncThunk('company/getAllContactPerson', async() => {
    const response = await api.get('company/getAllContactPerson');
    return response.data;
})

export const contactPersonPerCompany = createAsyncThunk('company/getContactPersonPerCompany', async(contact_person_data) => {
    const response = await api.post('company/getContactPersonPerCompany', contact_person_data);
    return response.data
})

export const contactPersonByDesignation = createAsyncThunk('company/getAllContactDesignation', async(designation) => {
    const response = await api.post('company/getAllContactDesignation', designation);
    return response.data;
})

export const updateContactPerson = createAsyncThunk('company/updateContactPerson/', async(id, contact_person_data) => {
    const response = await api.put(`company/updateContactPerson/${id}`, contact_person_data);
    return response.data
})

export const deleteContactPerson = createAsyncThunk('company/deleteContactPerson/', async(id) => {
    const response = await api.delete(`company/deleteContactPerson/${id}`);
    return response.data
})
