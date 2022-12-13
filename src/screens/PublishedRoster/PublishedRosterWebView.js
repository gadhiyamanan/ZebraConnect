import React, { Component } from "react";
import { View, SafeAreaView, StatusBar, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { LOADER_COLOR } from "../../util/constants/Constants";
import { styles } from "./PublishRoasterStyles";
import auth from "../../services/authService";
import apiHelper from "../apiHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";

class PublishedRosterWebView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {},
      baseurl: "",
    };
  }
  redirectUser(user) {
    if (user.emp_id === "" || user.emp_id === null) {
      this.props.navigation.navigate(SCREENS.LOGIN);
    }
  }
  componentDidMount() {
    auth.getCurrentUser().then(user => {
      this.setState({
        loggedInUser: user,
        baseurl:
          apiHelper.webViewRoster + user.emp_id,
      });
      this.redirectUser(user);
      console.log(AsyncStorage.getItem("webUrl"));
      AsyncStorage.getItem("webUrl").then(webUrl => {
      if (webUrl) {
        this.setState({ baseurl: webUrl +  apiHelper.webViewRoster + user.emp_id });
      }
      });
      console.log(this.state.baseurl);
    });
  }
  ActivityIndicatorElement = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          animating={true}
          style={styles.activityIndicator}
          size="large"
          color={LOADER_COLOR.COLOR}
        />
      </View>
    );
  };
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            renderLoading={this.ActivityIndicatorElement}
            //Want to show the view or not
            startInLoadingState={true}
            source={{
              uri: this.state.baseurl,
            }}
          />
        </SafeAreaView>
      </>
    );
  }
}

export default PublishedRosterWebView;
