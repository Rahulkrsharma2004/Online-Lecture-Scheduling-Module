import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosInstance";

export const addCourse = createAsyncThunk("course/addCourse", async (courseData, { rejectWithValue }) => {
  try {
    const response = await API.post("/courses/add", courseData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const courseSlice = createSlice({
  name: "course",
  initialState: { courses: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCourse.pending, (state) => { state.loading = true; })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload);
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
