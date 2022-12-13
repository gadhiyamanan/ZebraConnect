import Moment from "moment";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform, Dimensions } from "react-native";

export function caluclateDateHours(fromDate, toDate) {
  var date1 = new Date(fromDate);
  var date2 = new Date(toDate);
  const diffInDays = Moment(date2).diff(Moment(date1), "days");
  const days = parseInt(diffInDays) + 1;
  const thrs = days * 8;
  const minutes1 = thrs * 60;
  var hours = Math.floor(minutes1 / 60);
  var minutes = minutes1 % 60;
  var hours_Minutes = hours + " Hours " + minutes + " Minutes";
  return {
    days: days.toString(),
    dayshours: hours_Minutes,
  };
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export async function getPushNotificationToken() {
  let token;

  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (finalStatus !== "granted") {
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  }
  return token;
}

/**
 * Returns true if the screen is in portrait mode
 */
export const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

/**
 * Returns true of the screen is in landscape mode
 */
export const isLandscape = () => {
  const dim = Dimensions.get("screen");
  return dim.width >= dim.height;
};

/**
 * Returns the windowWidth 
 */
 export const windowWidth =Dimensions.get("window").width;
