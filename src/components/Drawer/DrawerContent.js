import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Alert, SafeAreaView, Linking } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Drawer,
  Text,
  Button,
} from "react-native-paper";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import auth from "../../services/authService";
import { SCREENS } from "../../util/constants/Constants";
import leaveIcon from "../../assets/images/leaveicon.png";
import groupIcon from "../../assets/images/groupicon.png";
import exceptionReportIcon from "../../assets/images/exceptionReportIcon.png";
import { color } from "react-native-reanimated";
import Constants from "expo-constants"
import httpService from "../../services/httpService";
import apiHelper from "../../screens/apiHelper";

export default DrawerContent = props => {
  const paperTheme = useTheme();
  let DASHBOARD_ITEMS = [
    {
      title: "Published Rosters",
      screenName: SCREENS.PUBLISHED_ROSTER,
      Icon: (
        <FontAwesome5
          name="clipboard-list"
          size={30}
          color={paperTheme.colors.accent}
          title="Published Rosters"
        />
      ),
    },
    {
      title: "My Diary",
      screenName: SCREENS.MY_DIARY,
      Icon: (
        <FontAwesome
          name="calendar"
          size={30}
          color={paperTheme.colors.accent}
          title="My Diary"
        />
      ),
    },
    {
      title: "My Leave",
      screenName: SCREENS.MY_LEAVE,
      Icon: (
        <Image
          source={leaveIcon}
          style={[styles.icon, { tintColor: paperTheme.colors.accent }]}
        />
      ),
    },
    {
      title: "Broadcasts",
      screenName: SCREENS.BROADCASTS,
      Icon: (
        <FontAwesome
          name="podcast"
          size={30}
          color={paperTheme.colors.accent}
          title="Broadcasts"
        />
      ),
    },
    {
      title: "Comms Group",
      screenName: SCREENS.COMMS_GROUP,
      Icon: (
        <Image
          source={groupIcon}
          style={[
            styles.icon,
            { tintColor: paperTheme.colors.accent, marginLeft: -4 },
          ]}
        />
      ),
    },
    {
      title: "Suggestions",
      screenName: SCREENS.SUGGESTIONS,
      Icon: (
        <FontAwesome
          name="lightbulb-o"
          size={30}
          color={paperTheme.colors.accent}
          title="Suggestions"
          style={{ paddingLeft: 6 }}
        />
      ),
    },
    {
      title: "Survey",
      screenName: SCREENS.SURVEY,
      Icon: (
        <FontAwesome
          name="wpforms"
          size={30}
          color={paperTheme.colors.accent}
          title="Survey"
          style={{ alignItems: "center" }}
        />
      ),
    },
    {
      title: "Exception Report",
      screenName: SCREENS.EXCEPTIONS_REPORTING_LIST,
      Icon: (
        <Image
          source={exceptionReportIcon}
          style={[styles.icon, { tintColor: paperTheme.colors.accent }]}
        />
      ),
    },
  ];
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [dashBoardItems, setDashBoardItems] = useState(DASHBOARD_ITEMS);
  

  useEffect(() => {
    auth
      .getCurrentUser()
      .then(user => {
        let splitName = user.emp_name.split(" ");
        setUserName(`${splitName[0].charAt(0)}${splitName[1].charAt(0)}`);
        setFullName(user.emp_name);
        // setEmpID(user.emp_id);
      })
      .catch();
      getHelpLinks()
  }, []);

  const getHelpLinks = () => {
    httpService
    .get(
        apiHelper.getHelpLinks 
        
    )
    .then((result) => {
      const data=result?.data[0]
      setDashBoardItems([...dashBoardItems,
        {
        title: data?.trust_support_link_caption,
        link : data?.trust_support_link,
        Icon: (
          <FontAwesome
            name="support"
            size={30}
            color={paperTheme.colors.accent}
            title={data?.trust_support_link_caption}
          />
        ),
      },
      {
        title: data?.help_video_link_caption,
        link : data?.help_video_link,
        Icon: (
          <Ionicons
            name="help-sharp"
            size={30}
            color={paperTheme.colors.accent}
            title={data?.help_video_link_caption}
          />
        ),
      }])
    })
    .catch((error) => {
        console.error(error)
    })
  };

  const getDashboardItems = (screenName, title, icon,link) => {
    return (
      <DrawerItem
        key={title}
        icon={({ drawercolor, size }) => icon}
        label={title}
        onPress={() => {
          if(link) return Linking.openURL(link)
          navigation.navigate(screenName);
        }}
        labelStyle={{ color: paperTheme.colors.primary }}
      />
    );
  };

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
        { text: "No" },
      ],
      { cancelable: false }
    );
  };

  const onPressProfile = () => {
    navigation.navigate(SCREENS.PROFILE);
  };

  const logOut = () => {
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
    <React.Fragment>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={styles.headerCloseSection}>
            <Button
              icon="close"
              labelStyle={[
                styles.closeButton,
                { color: paperTheme.colors.primary },
              ]}
              compact
              onPress={() => props.navigation.toggleDrawer()}
            />
          </View>
          <View style={styles.userInfoSection}>
            <Avatar.Text
              size={50}
              label={userName}
              style={{
                backgroundColor: paperTheme.colors.primary,
                marginLeft: 10,
              }}
              color={paperTheme.colors.text}
            />
            <Title style={[styles.title, { color: paperTheme.colors.primary }]}>
              {fullName}
            </Title>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            {dashBoardItems.map(item => {
              return getDashboardItems(item.screenName, item.title, item.Icon,item.link);
            })}
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ drawercolor, size }) => (
                <FontAwesome
                  name="user"
                  size={30}
                  color={paperTheme.colors.accent}
                  title="Profile"
                />
              )}
              label={"Profile"}
              onPress={onPressProfile}
              labelStyle={{ color: paperTheme.colors.primary }}
            />
            <DrawerItem
              icon={({ drawercolor, size }) => (
                <FontAwesome
                  name="sign-out"
                  size={30}
                  color={paperTheme.colors.accent}
                  title="Sign Out"
                />
              )}
              label={"Sign Out"}
              onPress={() => {
                onPresslogOut();
              }}
              labelStyle={{ color: paperTheme.colors.primary }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <View>
        <Text
          style={{
            color: "black",
            textAlign: "center",
            fontSize: 15,
            bottom: 0,
          }}
        >
          {`Version - ${Constants.manifest.version}`}
        </Text>
        <SafeAreaView/>
      </View>
     
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  headerCloseSection: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  closeButton: {
    fontSize: 40,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  icon: {
    width: 30,
    height: 30,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
