import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { deleteMethod, getMethod, postMethod, putMethod } from "../api";


const initialState = {
  value: {
    data: [],
    enrolledData: [],
    singleData: null,
    isLoading: false,
    isCreateSuccess: false,
    isDeleteSuccess: false,
    isError: false,
    errorMessage: '',
  },
};

export const getCourseDetails = createAsyncThunk(
  "course/getall",
  async (data, thunkAPI) => {
    const response = await getMethod('course', data);
    return response;
  }
);

export const getEnrolledCourseDetails = createAsyncThunk(
  "course/getenrolled",
  async (data, thunkAPI) => {
    const response = await postMethod('enrollment/enrolled', data);
    return response;
  }
);

export const loadOneCourse = createAsyncThunk(
  "course/show",
  async (data, thunkAPI) => {
    const response = await getMethod('course/find/'+data, data);
    return response;
  }
);

export const createNewCourse = createAsyncThunk(
  "course/create",
  async (data, thunkAPI) => {
    const response = await postMethod('course/store', data);
    return response;
  }
);

export const updateCourse = createAsyncThunk(
  "course/update",
  async (data, thunkAPI) => {
    const response = await putMethod('course/update/'+data.id, data);
    return response;
  }
);

export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (data, thunkAPI) => {
    const response = await deleteMethod('course/delete/'+data, data);
    return response;
  }
);


export const courseSlice = createSlice({ 
  name: "course",
  initialState,
  reducers: {},
  extraReducers: {
    [getCourseDetails.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.data = action.payload.data.data.courses;
        state.isLoading = false;
      }else{
        state.isError = true;
        state.errorMessage = action.payload.data.message;
      }
    },
    [getEnrolledCourseDetails.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.enrolledData = action.payload.data.data.enrolledcourses;
        state.isLoading = false;
      }else{
        state.isError = true;
        state.errorMessage = action.payload.data.message;
      }
    },
    [loadOneCourse.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.singleData = action.payload.data.data.course;
        state.isLoading = false;
      }else{
        state.isError = true;
        state.errorMessage = action.payload.data.message;
      }
    },
    [createNewCourse.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.isLoading = false;
        state.isCreateSuccess = true;
      }else{
        state.isError = true;
        state.errorMessage = action.payload.data.message;
      }
    },
    [updateCourse.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.isLoading = false;
        state.isCreateSuccess = true;
      }else{
        state.isError = true;
        state.errorMessage = action.payload.data.message;
      }
    },
    [deleteCourse.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.isLoading = false;
        state.isDeleteSuccess = true;
      }else{
        state.isError = true;
        state.errorMessage = action.payload.data.message;
      }
    },
    [getCourseDetails.rejected]: (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.enrolledData = [];
      state.singleData = null;
    },
    [getEnrolledCourseDetails.rejected]: (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.enrolledData = [];
      state.singleData = null;
    },
    [getCourseDetails.pending]: (state, action) => {
      state.isLoading = true;
      state.isCreateSuccess = false;
      state.isDeleteSuccess = false;
      state.data = [];
      state.enrolledData = [];
      state.singleData = null;
      state.isError = false;
      state.errorMessage = '';
    },
    [getEnrolledCourseDetails.pending]: (state, action) => {
      state.isLoading = true;
      state.isCreateSuccess = false;
      state.isDeleteSuccess = false;
      state.data = [];
      state.enrolledData = [];
      state.singleData = null;
      state.isError = false;
      state.errorMessage = '';
    },
    [loadOneCourse.pending]: (state, action) => {
      state.isLoading = true;
      state.isCreateSuccess = false;
      state.isDeleteSuccess = false;
      state.data = [];
      state.enrolledData = [];
      state.singleData = null;
      state.isError = false;
      state.errorMessage = '';
    },
    [deleteCourse.pending]: (state, action) => {
      state.isLoading = true;
      state.isDeleteSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
  },
});

export default courseSlice.reducer;
