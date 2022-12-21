import React, { Component } from "react"
import { View, SafeAreaView, StatusBar, ActivityIndicator } from "react-native"
import { WebView } from "react-native-webview"
import { LOADER_COLOR } from "../../util/constants/Constants"
import { styles } from "./PublishRoasterStyles"
import auth from "../../services/authService"
import apiHelper from "../apiHelper"
import AsyncStorage from "@react-native-async-storage/async-storage"

class PublishedRosterWebView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: {},
      baseurl: "",
      showWebView: false
    }
  }
  redirectUser(user) {
    if (user.emp_id === "" || user.emp_id === null) {
      this.props.navigation.navigate(SCREENS.LOGIN)
    }
  }
  componentDidMount() {
    auth.getCurrentUser().then((user) => {
      this.setState({
        loggedInUser: user,
        baseurl: apiHelper.webViewRoster + user.emp_id
      })
      this.redirectUser(user)
      AsyncStorage.getItem("webUrl").then((webUrl) => {
        if (webUrl) {
          this.setState({
            baseurl: webUrl + apiHelper.webViewRoster + user.emp_id,
            showWebView: true
          })
        }
      })
    })
  }
  ActivityIndicatorElement = () => {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size="large" color={LOADER_COLOR.COLOR} />
      </View>
    )
  }
  render() {
    const { showWebView } = this.state
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {showWebView ? (
              <WebView
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                renderLoading={this.ActivityIndicatorElement}
                startInLoadingState={true}
                source={{
                  uri: this.state.baseurl
                }}
              />
            ) : (
              <ActivityIndicator
                animating={true}
                style={{ alignSelf: "center", flex: 1 }}
                size="large"
                color={LOADER_COLOR.COLOR}
              />
            )}
          </View>
        </SafeAreaView>
      </>
    )
  }
}

export default PublishedRosterWebView
