import axios from "axios";
import { api } from "../api";

export const authAxios = axios.create();

// Created own instance of axios which will always
// be authenticated wich then removes the need to constantly grab the token from local storage and set it as a header in axios request
authAxios.interceptors.request.use((config) => {
  const newConfig = config;
  const token = localStorage.getItem("token");
  newConfig.headers = {
    Authorization: `Token ${token}`,
  };
  return newConfig;
});

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null && token !== undefined;
};

const signup = (username, email, password1, password2) => {
  return axios
    .post(api.auth.register, {
      username,
      email,
      password1,
      password2,
    })
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("token", response.data.key);
      return response;
    });
};

const login = (username, email, password) => {
  return axios
    .post(api.auth.login, {
      username,
      email,
      password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.key);
      return response;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

export const authenticationService = {
  isAuthenticated: isAuthenticated(),
  signup,
  login,
  logout,
};
