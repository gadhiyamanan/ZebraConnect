import { React } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const X_API_KEY = "GcuNWPVWuO44RaxfQEqRe2PsVI90ClyZUgjSiYxg";

SetHeader();
async function SetHeader() {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      axios.defaults.headers.common["checkauth"] = value;
    }
  } catch (error) {}
}
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (expectedError) {
    error.response.status === 401 && alert(error.response.data.message);
  }
  return Promise.reject(error);
});

axios.interceptors.request.use(
  async config => {
    if (config.headers.common["CheckAuth"]) {
      return config;
    }
    const token = await AsyncStorage.getItem("token");
    const auth = token ? `${token}` : "";
    config.headers.common["CheckAuth"] = auth;
    config.headers.common["X-Api-Key"] = X_API_KEY;
    return config;
  },
  error => Promise.reject(error)
);

function setJwt(jwt) {
  axios.defaults.headers.common["CheckAuth"] = jwt;
  axios.defaults.headers.common["X-Api-Key"] = X_API_KEY;
}

async function setBaseUrl(url) {
  if (url) return (axios.defaults.baseURL = url);
  const value = await AsyncStorage.getItem("baseURL");
  if (value !== null) {
    axios.defaults.baseURL = value;
  }
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt: setJwt,
  setBaseUrl: setBaseUrl,
};
