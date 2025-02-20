import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosInstance";

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await API.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await API.post("/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => { state.user = null; });
  },
});

export default authSlice.reducer;
