import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SECURE_SCREENS_INFO } from "./RouteScreens";
import Login from "../screens/Login/Login";
import SplashScreen from "../screens/Splash/SplashScreen";
import { SCREENS } from "../util/constants/Constants";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import DrawerContent from "../components/Drawer/DrawerContent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TermsAndConditions from "../screens/TermsConditions/TermsAndConditions";
import QrCodeScanner from "../screens/QrCodeScanner/QrCodeScanner";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const SCREENS_OPTION = {
  headerStyle: {
    backgroundColor: "#061f5d",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const getScreens = () => {
  let screens = Object.keys(SECURE_SCREENS_INFO);
  let screenOptions = Object.values(SECURE_SCREENS_INFO);
  return screens.map((screenName, index) => {
    return (
      <Stack.Screen
        key={String(index)}
        name={screenName}
        component={screenOptions[index].component}
        options={screenOptions[index].options}
      />
    );
  });
};

const RouteNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          key={SCREENS.SPLASH_ROUTE}
          name={SCREENS.SPLASH_ROUTE}
          component={SplashRouteNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          key={SCREENS.UNSECURE_ROUTE}
          name={SCREENS.UNSECURE_ROUTE}
          component={UnsecuredRouteNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          key={SCREENS.SECURE_ROUTE}
          name={SCREENS.SECURE_ROUTE}
          component={SecuredRouteNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const SecuredRouteNavigation = () => {
  return (
    <>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name={"DashboardRoute"} component={DashboardRoute} />
      </Drawer.Navigator>
    </>
  );
};

const DashboardRoute = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <NavigationBar
            scene={scene}
            previous={previous}
            navigation={navigation}
          />
        ),
      }}
    >
      {getScreens()}
    </Stack.Navigator>
  );
};

const UnsecuredRouteNavigation = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          key={"Login"}
          name={"Login"}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          key={"QrCodeScanner"}
          name={"QrCodeScanner"}
          component={QrCodeScanner}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          key={"TermsAndConditions"}
          name={"TermsAndConditions"}
          component={TermsAndConditions}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

const SplashRouteNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        key={"SplashScreen"}
        name={"SplashScreen"}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        key={"TermsAndConditions"}
        name={"TermsAndConditions"}
        component={TermsAndConditions}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RouteNavigation;
