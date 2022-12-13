import React, { useEffect, useState } from "react";
import { Appbar, Avatar, Menu, useTheme } from "react-native-paper";
import auth from "../../services/authService";
import { FontAwesome } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { SCREENS } from "../../util/constants/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default NavigationBar = ({ scene, previous, navigation }) => {

  const [visible, setVisible] = React.useState(false);
  const [trustName, setTrustName] = React.useState(false);
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
  const paperTheme = useTheme();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("trustName").then(trustName => {
      if (trustName) setTrustName(trustName);
    });
  }, []);

  
  auth
    .getCurrentUser()
    .then(user => {
      let splitName = user.emp_name.split(" ");
      setUserName(`${splitName[0].charAt(0)}${splitName[1].charAt(0)}`);
    })
    .catch();

  const onPresslogOut = () => {
    Alert.alert(
      "Are you sure ?",
      "You want to logout",
      [
        {
          text: "Yes",
          onPress: logOut,
          style: "cancel",
        },
        { text: "No", onPress: () => setVisible(false) },
      ],
      { cancelable: false }
    );
  };

  const logOut = () => {
    setVisible(false);
    auth.removeToken();
    setTimeout(() => {
      auth.logout();
      const resetAction = CommonActions.reset({
        index: 1,
        routes: [{ name: SCREENS.UNSECURE_ROUTE }],
      });
      navigation.dispatch(resetAction);
    }, 1000);
  };

  return (
    <Appbar.Header style={{ backgroundColor: paperTheme.colors.primary }}>
      {previous ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Avatar.Text
            size={30}
            label={userName}
            style={{
              backgroundColor: paperTheme.colors.surface,
              marginLeft: 10,
            }}
            color={paperTheme.colors.secondaryText}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={previous ? title : trustName}
      />
      {!previous ? (
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Appbar.Action
              icon={"dots-vertical"}
              onPress={() => setVisible(true)}
              color={paperTheme.colors.surface}
            />
          }
        >
          <Menu.Item
            icon={() => (
              <FontAwesome
                name="sign-out"
                size={30}
                color={paperTheme.colors.accent}
                title="Sign Out"
              />
            )}
            onPress={() => onPresslogOut()}
            title="Sign Out"
            titleStyle={{ color: paperTheme.colors.secondaryText }}
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
};
