import React, { Component } from "react";
import {
  FlatList,
  View,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from "react-native";

import auth from "../../services/authService";
import http from "../../services/httpService";
import apiHelper from "../apiHelper";
import { SCREENS } from "../../util/constants/Constants";
import CommsGroupItem from "../../components/CommsGroup/CommsGroupItem";
import { styles } from "./styles/CommsGroupStyles";
import { LOADER_COLOR } from "../../util/constants/Constants";

export default class CommsGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CommsGroupData: [],
      loggedInUser: {},
    };
  }
  redirectUser(user) {
    if (user.emp_id === "" || user.emp_id === null) {
      this.props.navigation.navigate(SCREENS.LOGIN);
    }
  }

  componentDidMount() {
    auth.getCurrentUser().then(user => {
      this.setState({ loggedInUser: user });
      this.redirectUser(user);
      this.fetechData(user.emp_id);
    });
  }

  ///Get Employees Commsgroup Data and set in this.state.CommsGroupData
  async fetechData(empid) {
    this.setState({ isLoading: true });
    const commsGroupList = await http.get(
      apiHelper.commsGroupList + `/` + empid
    );
    this.setState({ CommsGroupData: commsGroupList.data });
    this.setState({ isLoading: false });
  }

  callRefresh() {
    this.fetechData(this.state.loggedInUser.emp_id);
  }

  goToGroupMembers = group => {
    this.props.navigation.navigate(SCREENS.COMMON_GROUP_MEMBERS, {
      group,
      callRefresh: this.callRefresh.bind(this),
    });
  };

  goToGrouDetails = group => {
    this.props.navigation.navigate(SCREENS.COMMS_GROUP_DETAILS, {
      group,
      callRefresh: this.callRefresh.bind(this),
    });
  };

  render() {
    const { CommsGroupData, isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.activityContanier} accessibilityRole="button">
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              style={styles.activityContainer}
              size="large"
              color={LOADER_COLOR.COLOR}
            />
          ) : null}
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={CommsGroupData}
          ListEmptyComponent={() => (
            <>
              {!isLoading && (
                <View style={styles.emptyContainer}>
                  <Text>No record found</Text>
                </View>
              )}
            </>
          )}
          renderItem={commonGroup => {
            return (
              <CommsGroupItem
                item={commonGroup.item}
                goToGroupDetails={this.goToGrouDetails}
                goToGroupMembers={this.goToGroupMembers}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
}
