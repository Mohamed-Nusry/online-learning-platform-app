import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { deleteMethod, getMethod, postMethod, putMethod } from "../api";


const initialState = {
  value: {
    data: [],
    isUserEnrolled: false,
    singleData: null,
    isLoading: false,
    isCheckLoading: false,
    isCreateSuccess: false,
    isDeleteSuccess: false,
    isError: false,
    errorMessage: '',
  },
};

export const getEnrollmentDetails = createAsyncThunk(
  "enrollment/getall",
  async (data, thunkAPI) => {
    const response = await getMethod('enrollment', data);
    return response;
  }
);

export const loadOneEnrollment = createAsyncThunk(
  "enrollment/show",
  async (data, thunkAPI) => {
    const response = await getMethod('enrollment/find/'+data, data);
    return response;
  }
);

export const createNewEnrollment = createAsyncThunk(
  "enrollment/create",
  async (data, thunkAPI) => {
    const response = await postMethod('enrollment/store', data);
    return response;
  }
);

export const isAlreadyEnrolled = createAsyncThunk(
  "enrollment/check",
  async (data, thunkAPI) => {
    const response = await postMethod('enrollment/check', data);
    return response;
  }
);

export const updateEnrollment = createAsyncThunk(
  "enrollment/update",
  async (data, thunkAPI) => {
    const response = await putMethod('enrollment/update/'+data.id, data);
    return response;
  }
);

export const deleteEnrollment = createAsyncThunk(
  "enrollment/delete",
  async (data, thunkAPI) => {
    const response = await deleteMethod('enrollment/delete/'+data, data);
    return response;
  }
);


export const enrollmentSlice = createSlice({ 
  name: "enrollment",
  initialState,
  reducers: {
    setEnrollmentSuccessFalse: (state) => {
      state.isCreateSuccess = false;
    },
  },
  extraReducers: {
    [getEnrollmentDetails.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.data = action.payload.data.data.enrolledcourses;
        state.isLoading = false;
      }else{
        //show error message
        state.isError = true;
        state.errorMessage = action.payload.data.message;
      }
    },
    [isAlreadyEnrolled.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.isUserEnrolled = action.payload.data.data.data;
        state.isCheckLoading = false;
      }else{
        //show error message
        state.isError = true;
        state.errorMessage = action.payload.data.message;
      }
    },
    [loadOneEnrollment.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.singleData = action.payload.data.data.enrolledcourse;
        state.isLoading = false;
      }else{
        //show error message
        state.isError = true;
        state.errorMessage = action.payload.data.message;
      }
    },
    [createNewEnrollment.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.isLoading = false;
        state.isCreateSuccess = true;
      }else{
        //show error message
        state.isLoading = false;
        state.isCreateSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload.data.message;
      }
    },
    [updateEnrollment.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.isLoading = false;
        state.isCreateSuccess = true;
      }else{
         //show error message
        state.isLoading = false;
        state.isCreateSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload.data.message;
      }
    },
    [deleteEnrollment.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.isLoading = false;
        state.isDeleteSuccess = true;
      }else{
         //show error message
        state.isError = true;
        state.errorMessage = action.payload.data.message;
      }
    },
    [getEnrollmentDetails.rejected]: (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.singleData = null;
    },
    [getEnrollmentDetails.pending]: (state, action) => {
      state.isLoading = true;
      state.isCreateSuccess = false;
      state.isDeleteSuccess = false;
      state.data = [];
      state.singleData = null;
      state.isError = false;
      state.errorMessage = '';
    },
    [deleteEnrollment.pending]: (state, action) => {
      state.isLoading = true;
      state.isDeleteSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
    [createNewEnrollment.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [isAlreadyEnrolled.pending]: (state, action) => {
      state.isCheckLoading = true;
      state.isCreateSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
    [loadOneEnrollment.pending]: (state, action) => {
      state.isCreateSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
  },
});

export const { setEnrollmentSuccessFalse } = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
