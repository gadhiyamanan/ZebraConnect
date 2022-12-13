import 'react-native-gesture-handler';
import React from "react";
import FlashMessage from "react-native-flash-message";
import * as Notifications from "expo-notifications";
import RouteNavigation from "./src/navigation/RouteNavigation";
import { Provider as PaperProvider } from "react-native-paper";
import Theme from "./src/config/Theme";
import { ThemeContext } from "./src/context/ThemeContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  return (
    <PaperProvider theme={Theme.default}>
      <ThemeContext.Provider>
        <RouteNavigation />
        <FlashMessage position="top" />
      </ThemeContext.Provider>
    </PaperProvider>
  );
};

export default App;
