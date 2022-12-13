import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import { dashboardStyles } from "../../util/styles/GlobalStyles";
import leaveIcon from "../../assets/images/leaveicon.png";
import groupIcon from "../../assets/images/groupicon.png";
import exceptionReportIcon from "../../assets/images/exceptionReportIcon.png";
import auth from "../../services/authService";
import http from "../../services/httpService";
import apiHelper from "../apiHelper";
import { SCREENS } from "../../util/constants/Constants";
import { styles } from "./DashBoardStyles";
import { CommonActions } from "@react-navigation/native";
import { Card, withTheme, Title, Surface } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {},
      nextShift: {},
      colors: props.theme.colors,
    };

    this.DASHBOARD_ITEMS = [
      {
        title: "Published Rosters",
        screenName: SCREENS.PUBLISHED_ROSTER,
        Icon: (
          <FontAwesome5
            name="clipboard-list"
            size={30}
            color={props.theme.colors.accent}
            title="Published Rosters"
          />
        ),
        id: 1,
      },
      {
        title: "My Diary",
        screenName: SCREENS.MY_DIARY,
        Icon: (
          <FontAwesome
            name="calendar"
            size={30}
            color={props.theme.colors.accent}
            title="My Diary"
          />
        ),
        id: 2,
      },
      {
        title: "My Leave",
        screenName: SCREENS.MY_LEAVE,
        Icon: (
          <Image
            source={leaveIcon}
            style={[styles.icon, { tintColor: props.theme.colors.accent }]}
          />
        ),
        id: 3,
      },
      {
        title: "Broadcasts",
        screenName: SCREENS.BROADCASTS,
        Icon: (
          <FontAwesome
            name="podcast"
            size={30}
            color={props.theme.colors.accent}
            title="Broadcasts"
          />
        ),
        id: 4,
      },
      {
        title: "Comms Group",
        screenName: SCREENS.COMMS_GROUP,
        Icon: (
          <Image
            source={groupIcon}
            style={[styles.icon, { tintColor: props.theme.colors.accent }]}
          />
        ),
        id: 5,
      },
      {
        title: "Suggestions",
        screenName: SCREENS.SUGGESTIONS,
        Icon: (
          <FontAwesome
            name="lightbulb-o"
            size={30}
            color={props.theme.colors.accent}
            title="Suggestions"
          />
        ),
        id: 6,
      },
      {
        title: "Survey",
        screenName: SCREENS.SURVEY,
        Icon: (
          <FontAwesome
            name="wpforms"
            size={30}
            color={props.theme.colors.accent}
            title="Survey"
          />
        ),
        id: 7,
      },
      {
        title: "Exception Report",
        screenName: SCREENS.EXCEPTIONS_REPORTING_LIST,
        Icon: (
          <Image
            source={exceptionReportIcon}
            style={[styles.icon, { tintColor: props.theme.colors.accent }]}
          />
        ),
        id: 8,
      },
      {
        title: "Publish Roster (Web View)",
        screenName: SCREENS.WEB_ROSTER,
        Icon: (
          <FontAwesome
            name="wpforms"
            size={30}
            color={props.theme.colors.accent}
            title="Publish Roster Web View"
          />
        ),
        id: 9,
      },
    ];
  }

  componentDidMount() {
    auth.getCurrentUser().then(user => {
      this.setState({ loggedInUser: user });

      AsyncStorage.getItem("token").then(token => {
        if (token) {
          http.setJwt(token);
          this.fetechData(user.emp_id);
        }
      });
    });
  }

  async fetechData(empid) {
    try {
      const result = await http.get(apiHelper.getEmpNextShift + `/` + empid);

      if (result.data && result.data.status === 400) {
        this.logOut();
      }
      this.setState({ nextShift: result.data });
    } catch (error) {
      console.log(error);
    }
  }

  getDashBoardItem = ({ item }) => {
    const { navigation } = this.props;
    const { colors } = this.state;
    return (
      <Card
        key={item.screenName}
        onPress={() => {
          if (item.screenName) {
            navigation.navigate(item.screenName);
          }
        }}
        style={styles.card}
      >
        <Card.Content style={styles.cardContent}>
          {item.Icon}
          <Title style={[styles.cardTitle, { color: colors.secondaryText }]}>
            {item.title}
          </Title>
        </Card.Content>
      </Card>
    );
  };

  getUserInfo = () => {
    const { loggedInUser, nextShift } = this.state;
    return (
      <React.Fragment>
        <View style={styles.usernameContainer}>
          <Text style={styles.name}>{loggedInUser?.emp_name}</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.leftLabelContainer}>
            <View style={styles.infoRowContainer}>
              <FontAwesome5
                name="info-circle"
                size={18}
                style={{ paddingRight: 5 }}
              />
              <Text style={styles.nextShift}>Next Shift</Text>
            </View>
          </View>
          <Surface>
            <View style={styles.leftLabelContainer}>
              <View style={styles.infoRowContainer}>
                <Text style={styles.shift}>{nextShift.shift}</Text>
                <Text style={styles.nextShift}>{nextShift.current_date}</Text>
              </View>
              <Text style={styles.shift}>{nextShift.location}</Text>
            </View>
          </Surface>
        </View>
      </React.Fragment>
    );
  };

  logOut = () => {
    const { navigation } = this.props;
    auth.logout();
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [{ name: "UnsecuredRoute" }],
    });
    navigation.dispatch(resetAction);
  };

  render() {
    return (
      <React.Fragment>
        <SafeAreaView
          style={[
            dashboardStyles.container,
            { backgroundColor: this.state.colors.background },
          ]}
        >
          <FlatList
            ListHeaderComponent={() => (
              <View>
                <View style={dashboardStyles.card}>{this.getUserInfo()}</View>
              </View>
            )}
            style={styles.cardContainer}
            numColumns={2}
            data={this.DASHBOARD_ITEMS}
            renderItem={this.getDashBoardItem}
            key={index => index + 1}
            keyExtractor={(_, index) => String(index)}
          />
        </SafeAreaView>
        <SafeAreaView style={dashboardStyles.bottomSafearea} />
      </React.Fragment>
    );
  }
}

export default withTheme(Dashboard);
