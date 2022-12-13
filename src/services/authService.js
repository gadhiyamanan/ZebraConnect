import http from "./httpService";
import JwtDecode from "jwt-decode";
import apiHelper from "../screens/apiHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  registerForPushNotificationsAsync,
  getPushNotificationToken,
} from "../util/util";
import { Platform } from "react-native";

const apiEndPoint = apiHelper.employeeLogin;
const tokenKey = "token";
let device_token = null;
export async function login(username, password) {
  if (Platform.OS != "web") {
    device_token = await registerForPushNotificationsAsync();
  }
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("device_token", device_token);
  const data = await http.post(apiEndPoint, formData);
  await setAsyncStorage(data.data.data.user_token);
  return data.data;
}

async function setAsyncStorage(token) {
  try {
    await AsyncStorage.setItem(tokenKey, token);
  } catch (error) {}
}

export function logout() {
  AsyncStorage.removeItem(tokenKey);
}

export async function getCurrentUser() {
  try {
    const value = await AsyncStorage.getItem(tokenKey);
    if (value !== null) {
      const user = JwtDecode(value);
      return user;
    }
  } catch (error) {}
}

export async function getJwt() {
  try {
    const value = await AsyncStorage.getItem(tokenKey);
    if (value !== null) {
      return value;
    }
  } catch (error) {}
}

export async function removeToken(username, password) {
  getCurrentUser()
    .then(user => {
      getPushNotificationToken()
        .then(token => {
          const formData = new URLSearchParams();
          formData.append("emp_id", user.emp_id);

          const data = http.post(apiHelper.removeToken, formData);

          return data.data;
        })
        .catch();
    })
    .catch();
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
  setAsyncStorage,
  removeToken,
};
