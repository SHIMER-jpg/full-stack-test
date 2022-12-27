import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "./errorSlice";

const initialState = {
  list: [],
};

const headers = {};

const URL = "http://localhost:4000";

export const fetchFiles = createAsyncThunk(
  "fetchFiles",
  async (_, { dispatch }) => {
    try {
      return await fetch(URL + "/files/data", {
        headers,
      }).then((res) => res.json());
    } catch (e) {
      dispatch(setError("There was an error fetching the files"));
    }
  }
);

export const searchFiles = createAsyncThunk(
  "searchFiles",
  async (fileName, { dispatch }) => {
    try {
      const data = await fetch(URL + "/files/data?fileName=" + fileName, {
        headers,
      }).then((res) => res.json());

      if (data.message) throw new Error(data.message);
      return data;
    } catch (e) {
      dispatch(
        setError("There was an error fetching the requested file: " + e.message)
      );
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
