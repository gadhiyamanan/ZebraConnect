import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";

import auth from "../../services/authService";
import http from "../../services/httpService";
import apiHelper from "../apiHelper";
import { SCREENS } from "../../util/constants/Constants";
import BroadcastItem from "../../components/Broadcast/BroadcastItem";
import { styles } from "./styles/BroadcastStyles";
import { LOADER_COLOR } from "../../util/constants/Constants";

export default class Broadcasts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      broadcasts: [],
      isBroadcastEmpty: false,
      loggedInUser: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    auth.getCurrentUser().then(user => {
      this.setState({ loggedInUser: user });
      this.fetchBroadcastData(user);
    });
  }

  callRefresh() {
    const { loggedInUser } = this.state;
    this.fetchBroadcastData(loggedInUser);
  }

  redirectUser(user) {
    if (user.emp_id === "" || user.emp_id === null) {
      this.props.navigation.navigate(SCREENS.LOGIN);
    }
  }

  async fetchBroadcastData(user) {
    this.redirectUser(user);
    this.setState({ isLoading: true });
    const broadcastList = await http.get(
      apiHelper.brodcastList + `/` + user.emp_id
    );
    this.setState(
      {
        broadcasts: broadcastList.data ? broadcastList.data : [],
        isLoading: false,
      },
      () => {
        this.setState({
          isBroadcastEmpty: this.state.broadcasts.length <= 0 ? true : false,
        });
      }
    );
  }

  viewDetail() {
    this.props.navigation.navigate(SCREENS.BROADCAST_DETAILS, {
      callRefresh: this.callRefresh.bind(this),
    });
  }

  goToBroadCastDetails = broadCast => {
    const { navigation } = this.props;
    navigation.navigate(SCREENS.BROADCAST_DETAILS, {
      broadCast,
      callRefresh: this.callRefresh.bind(this),
    });
  };

  render() {
    const { isLoading, broadcasts, isBroadcastEmpty } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            style={styles.activityIndicator}
            size="large"
            color={LOADER_COLOR.COLOR}
          />
        ) : null}
        
        {isBroadcastEmpty && (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No broadcast to show</Text>
          </View>
        )}
        <View style={styles.fullWidth}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={broadcasts}
            renderItem={broadCast => {
              return (
                <BroadcastItem
                  goToBroadCastDetails={this.goToBroadCastDetails}
                  broadCast={broadCast.item}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
