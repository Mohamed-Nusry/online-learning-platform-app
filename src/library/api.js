import { baseUrl } from "./constant";
import axios from "axios";
import { getToken } from "./helper";

// api calls
export const getMethod = async (url) => {
  const token = getToken() || "";
  try {
    return axios
      .get(baseUrl + url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postMethod = async (url, data) => {
  const token = getToken() || "";
  
  let headers = {};
  
  if(token && token != "") {
    headers = {"Content-Type": "application/json", "Authorization": "Bearer " + token}
  }else{
    headers = {"Content-Type": "application/json"}
  }
  
  try {
    return axios({
      method: 'post',
      url: baseUrl + url,
      data: data,
      headers: headers
    })
    .then(function (response) {
      return response;
    })
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const putMethod = async (url, data) => {
  const token = getToken() || "";

  let headers = {};

  if(token && token != "") {
    headers = {"Content-Type": "application/json", "Authorization": "Bearer " + token}
  }else{
    headers = {"Content-Type": "application/json"}
  }

  try {
    return axios({
      method: 'put',
      url: baseUrl + url,
      data: data,
      headers: headers
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteMethod = async (url, data) => {
  const token = getToken() || "";

  let headers = {};

  if(token && token != "") {
    headers = {"Content-Type": "application/json", "Authorization": "Bearer " + token}
  }else{
    headers = {"Content-Type": "application/json"}
  }

  try {
    return axios({
      method: 'delete',
      url: baseUrl + url,
      data: data,
      headers: headers
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  } catch (error) {
    console.log(error);
    return error;
  }
};