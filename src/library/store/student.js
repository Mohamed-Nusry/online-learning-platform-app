import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { deleteMethod, getMethod, postMethod, putMethod } from "../api";


const initialState = {
  value: {
    data: [],
    singleData: null,
    isLoading: false,
    isCreateSuccess: false,
    isDeleteSuccess: false,
  },
};

export const getStudentDetails = createAsyncThunk(
  "student/getall",
  async (data, thunkAPI) => {
    const response = await getMethod('student', data);
    return response;
  }
);

export const loadOneStudent = createAsyncThunk(
  "student/show",
  async (data, thunkAPI) => {
    const response = await getMethod('student/find/'+data, data);
    return response;
  }
);

export const createNewStudent = createAsyncThunk(
  "student/create",
  async (data, thunkAPI) => {
    const response = await postMethod('student/store', data);
    return response;
  }
);

export const updateStudent = createAsyncThunk(
  "student/update",
  async (data, thunkAPI) => {
    const response = await putMethod('student/update/'+data.id, data);
    return response;
  }
);

export const deleteStudent = createAsyncThunk(
  "student/delete",
  async (data, thunkAPI) => {
    const response = await deleteMethod('student/delete/'+data, data);
    return response;
  }
);


export const studentSlice = createSlice({ 
  name: "student",
  initialState,
  reducers: {},
  extraReducers: {
    [getStudentDetails.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.data = action.payload.data.data.students;
        state.isLoading = false;
      }else{
        //show error message
      }
    },
    [loadOneStudent.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.singleData = action.payload.data.data.student;
        state.isLoading = false;
      }else{
        //show error message
      }
    },
    [createNewStudent.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.isLoading = false;
        state.isCreateSuccess = true;
      }else{
        //show error message
      }
    },
    [updateStudent.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.isLoading = false;
        state.isCreateSuccess = true;
      }else{
        //show error message
      }
    },
    [deleteStudent.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.status === true) {
        state.isLoading = false;
        state.isDeleteSuccess = true;
      }else{
        //show error message
      }
    },
    [getStudentDetails.rejected]: (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.singleData = null;
    },
    [getStudentDetails.pending]: (state, action) => {
      state.isLoading = true;
      state.isCreateSuccess = false;
      state.isDeleteSuccess = false;
      state.data = [];
      state.singleData = null;
    },
    [deleteStudent.pending]: (state, action) => {
      state.isLoading = true;
      state.isDeleteSuccess = false;
    },
  },
});

export default studentSlice.reducer;
