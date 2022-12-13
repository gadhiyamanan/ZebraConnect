import React, { Component } from "react";
import { Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import auth from "../../services/authService";
import http from "../../services/httpService";
import apiHelper from "../apiHelper";
import { SCREENS } from "../../util/constants/Constants";
import LeaveRequestItem from "../../components/Leaves/LeaveRequestItem";
import { styles } from "./styles/LeaveStyles";
import LeaveEntitlement from "../../components/Leaves/LeaveEntitlement";
import { withTheme, Button } from "react-native-paper";
import { globalStyles } from "../../util/styles/GlobalStyles";
import { LOADER_COLOR } from "../../util/constants/Constants";
class MyLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      getLeaveEntitlement: [],
      getLeaveRequest: [],
      loggedInUser: {},
      colors: props.theme.colors,
      loading:true
    };
  }
  async redirectUser(user) {
    if (user.emp_id === "" || user.emp_id === null) {
      this.props.navigation.navigate(SCREENS.LOGIN);
    }
  }
  callRefresh() {
    this.fetchLeaveRequest(this.state.loggedInUser);
  }

  async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.redirectUser(user);
    this.setState({ loggedInUser: user });
    this.fetchLeaveRequest(user);
  }

  async fetchLeaveRequest(user) {
    const result = await http.get(apiHelper.leaveRequest + `/` + user.emp_id);
    this.setState({ getLeaveRequest: result.data ,loading:false});
    const leaveEntitlement = await http.get(
      apiHelper.leaveEntitlement + `/` + user.emp_id
    );
    this.setState({ getLeaveEntitlement: leaveEntitlement.data });
    this.setState({ isLoading: false });
  }

  getLeaveSummaryData() {
    return (
      <React.Fragment>
        {this.state.getLeaveEntitlement?.length < 1&&!this.state.isLoading  ? (
          <Text style={styles.textCenter}>No Leave Entitlement Found</Text>
        ) : (
          this.state.getLeaveEntitlement?.map((leave, index) => {
            return <LeaveEntitlement key={index} leave={leave} />;
          })
        )}
      </React.Fragment>
    );
  }

  onPressLeaveRequest = () => {
    this.props.navigation.navigate(SCREENS.NEW_LEAVE_REQUEST, {
      callRefresh: this.callRefresh.bind(this),
    });
  };

  onPressBankHoliday = () => {
    this.props.navigation.navigate(SCREENS.BANK_HOLIDAY, {
      callRefresh: this.callRefresh.bind(this),
    });
  };

  getLeaveRequest() {
    const { getLeaveRequest } = this.state;
    if (getLeaveRequest && getLeaveRequest.length < 1&&!this.state.isLoading ) {
      return <Text style={styles.textCenter}>No record found</Text>;
    }
    return (
      <React.Fragment>
        {this.state.getLeaveRequest?.map((leaverequest, index) => {
          return <LeaveRequestItem key={index} leaverequest={leaverequest} />;
        })}
      </React.Fragment>
    );
  }
  calendarIcon = colors => {
    return (
      <FontAwesome
        name="calendar"
        size={18}
        color={colors.surface}
        title="Bank Holidays"
        visible={false}
      />
    );
  };
  render() {
    const { isLoading, colors } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            style={styles.indicator}
            size="large"
            color={LOADER_COLOR.COLOR}
          />
        ) : null}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContentContainer}
        >
          <View style={styles.topBarContainer}>
            <View style={styles.myLeaveButton}>
              <Button
                style={[styles.openButton, { backgroundColor: colors.accent }]}
                labelStyle={{ letterSpacing: 0 }}
                icon={this.calendarIcon(colors)}
                uppercase={false}
                mode="contained"
                onPress={this.onPressLeaveRequest}
              >
                New Leave Request
              </Button>
            </View>
            <View style={styles.myLeaveButton}>
              <Button
                style={[styles.openButton, { backgroundColor: colors.accent }]}
                labelStyle={{ letterSpacing: 0 }}
                icon={this.calendarIcon(colors)}
                uppercase={false}
                mode="contained"
                onPress={this.onPressBankHoliday}
              >
                Bank Holidays
              </Button>
            </View>
          </View>
          <Card>
            <Text
              style={[
                globalStyles.titleTextStyle,
                { color: colors.secondaryText },
              ]}
            >
              Leave Summary
            </Text>
            <View style={styles.leaveSummaryBox}>
              <View style={styles.tableHeaderConatiner}>
                <View style={styles.tableHeaderItem}>
                  <Text style={styles.tableHeader}>Leave Type</Text>
                </View>
                <View style={styles.tableHeaderItem}>
                  <Text style={styles.tableHeader}>Taken/Remaining</Text>
                </View>
              </View>
              {this.getLeaveSummaryData()}
            </View>
          </Card>
          <View style={styles.leaveSummaryBox}>
            <Card>
              <Text
                style={[
                  globalStyles.titleTextStyle,
                  { color: colors.secondaryText },
                ]}
              >
                Leave Requests
              </Text>
              {this.getLeaveRequest()}
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withTheme(MyLeave);
