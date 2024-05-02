import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { postMethod } from "../api";

import { loginUrl, registerUrl } from "../constant";

const initialState = {
  value: {
    isLogged: false,
    loginData: null,
    isError: false,
    errorMessage: '',
  },
};

export const authenticateUser = createAsyncThunk(
  "authentication/user",
  async (data, thunkAPI) => {
    const response = await postMethod(loginUrl, data);
    return response;
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
        state.loginData = action.payload.data.data.user;
      }else{
        //show error message
      }
      
    },
    [authenticateUser.rejected]: (state, action) => {
      state.isLogged = false;
      state.loginData = null;
    },
    [authenticateUser.pending]: (state, action) => {
      state.isLogged = false;
      state.loginData = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      if(action.payload.data && action.payload.data.data.token != null) {
        localStorage.setItem("token", action.payload.data.data.token)
        localStorage.setItem("role", action.payload.data.data.user.type)
        localStorage.setItem("user_id", action.payload.data.data.user.id)
        state.isLogged = true;
        state.loginData = action.payload.data.data.user;
      }else{
        //show error message
      }
    },
  },
});

export const { updateUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;
