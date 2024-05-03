import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { postMethod } from "../api";

import { loginUrl, registerUrl } from "../constant";

const initialState = {
  value: {
    isLoading: false,
    isLogged: false,
    loginData: null,
    isError: false,
    errorMessage: '',
  },
};

export const authenticateUser = createAsyncThunk(
  "authentication/user",
  async (data,  { rejectWithValue }) => {
    try{
      const response = await postMethod(loginUrl, data);
      return response;
    } catch(error){
      return rejectWithValue(error.response)
    }
  }
);

export const registerUser = createAsyncThunk(
  "authentication/register",
  async (data, thunkAPI) => {
    const response = await postMethod(registerUrl, data);
    return response;
  }
);

export const authenticationSlice = createSlice({ 
  name: "authentication",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value = {
        isLogged: action.payload.isLogged,
        loginData: action.payload,
      };
    },
  },
  extraReducers: {
    [authenticateUser.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.data.token != null) {
        localStorage.setItem("token", action.payload.data.data.token)
        localStorage.setItem("role", action.payload.data.data.user.type)
        localStorage.setItem("user_id", action.payload.data.data.user.id)
        state.isLogged = true;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = '';
        state.loginData = action.payload.data.data.user;
      }else{
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = 'Internal Server Error';
      }
      
    },
    [authenticateUser.rejected]: (state, action) => {
      state.isError = true;
      state.errorMessage = action.payload.data.message;
      state.isLogged = false;
      state.isLoading = false;
      state.loginData = null;
    },
    [authenticateUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = '';
      state.isLogged = false;
      state.loginData = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.data.token != null) {
        localStorage.setItem("token", action.payload.data.data.token)
        localStorage.setItem("role", action.payload.data.data.user.type)
        localStorage.setItem("user_id", action.payload.data.data.user.id)
        state.isLogged = true;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = '';
        state.loginData = action.payload.data.data.user;
      }else{
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = 'Internal Server Error';
      }
    },
  },
});

export const { updateUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;
