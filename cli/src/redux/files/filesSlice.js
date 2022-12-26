import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "./errorSlice";

const initialState = {
  list: [],
};
const headers = {
  "Content-Type": "application/json",
};

export const fetchFiles = createAsyncThunk(
  "fetchFiles",
  async (_, { dispatch }) => {
    try {
      return await fetch("/files/data", {
        headers,
      }).then((res) => res.json());
    } catch (e) {
      console.log("🚀 ~ file: filesSlice.js:19 ~ e", e);
      dispatch(setError("There was an error fetching the files"));
    }
  }
);

export const searchFiles = createAsyncThunk(
  "searchFiles",
  async (fileName, { dispatch }) => {
    try {
      return await fetch("/files/data?fileName=" + fileName, {
        headers,
      }).then((res) => res.json());
    } catch (e) {
      dispatch(setError("There was an error fetching the requested file"));
    }
  }
);

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFiles.fulfilled, (state, action) => {
      state.list = [...action.payload];
    });
    builder.addCase(searchFiles.fulfilled, (state, action) => {
      if (action.payload) state.list = [action.payload];
    });
  },
});
