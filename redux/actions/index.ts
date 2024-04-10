import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {api} from "@/constants/api";

export const fetchMotorbikes = createAsyncThunk("data/fetchMotorbikes", async () => {
    try {
        const response = await axios.get(`${api.URL}`);
        return response.data
    } catch (error) {
        console.log(`Fetch list motorbikes errorr`)
        // @ts-ignore
        return error.response.data;
    }
})

export const fetchMotorbike = createAsyncThunk("data/fetchMotorbike", async (id: string, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${api.URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(`Fetch motorbike with id: ${id} error`);
        // @ts-ignore
        return rejectWithValue(error.response.data);
    }
})

export const createMotorbike = createAsyncThunk("data/createMotorbike", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${api.URL}`, data);
        return response.data;
    } catch (error) {
        console.log(`create motorbike error data: ${JSON.stringify(data)}`)
        // @ts-ignore
        return rejectWithValue(error.response.data);
    }
})

// @ts-ignore
export const updateMotorbike = createAsyncThunk("data/updateMotorbike", async ({data}, {rejectWithValue}) => {
    try {
        const response = await axios.put(`${api.URL}/${data?.id}`, data?.motorbike);
        return response.data;
    } catch (error) {
        console.log(`Update motorbike error data: id: ${data?.id} and data update: ${data?.motorbike}`);
        // @ts-ignore
        return rejectWithValue(error.response.data);
    }
})

export const deleteMotorbike = createAsyncThunk("data/deleteMotorbike", async (id: string, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`${api.URL}/${id}`);
        return response.data
    } catch (error) {
        console.log(`Delete motorbike with id: ${id} error`);
        // @ts-ignore
        return rejectWithValue(error.response.data);
    }
})
