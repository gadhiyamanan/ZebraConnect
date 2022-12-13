import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import SendMessageFooter from "../../components/Footer/SendMessageFooter";
import auth from "../../services/authService";
import http from "../../services/httpService";
import { SCREENS } from "../../util/constants/Constants";
import apiHelper from "../apiHelper";
import { styles } from "./styles/CommsGroupDetailsStyles";
import { showMessage } from "react-native-flash-message";
import { LOADER_COLOR } from "../../util/constants/Constants";

export default class CommsGroupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commsMessages: [],
      datares: "",
      message: "",
      loggedInUser: {},
      isLoading: false,
    };
  }

  redirectUser(user) {
    if (user.emp_id === "" || user.emp_id === null) {
      this.props.navigation.navigate(SCREENS.LOGIN);
    }
  }

  componentDidMount() {
    const data = this.props.route.params.group;
    this.setState({ datares: data });
    auth.getCurrentUser().then(user => {
      this.setState({ loggedInUser: user });
      this.redirectUser(user);
    });
    this.fetechData(data.id);
  }
  //send Comms message
  sendCommsmessage = async () => {
    const { message, datares, loggedInUser } = this.state;
    if (message.trim() !== "") {
      this.setState({ isLoading: true });
      const formData = new URLSearchParams();
      formData.append("comms_group_id", datares.id);
      formData.append("msg", message);
      formData.append("sender_id", loggedInUser.emp_id);
      await http.post(apiHelper.commsGroupSend, formData);
      this.refs._scrollView.scrollToEnd();
      showMessage({
        message: "Message Sent!",
        type: "success",
        color: "#ffffff", // text color
      });
      this.fetechData(this.state.datares.id);
    }
  };
  ///Get Employees My Say Data and set in this.state.mySayList
  async fetechData(comms_id) {
    this.setState({ isLoading: true, message: " " });
    const commsGroupListMessage = await http.get(
      apiHelper.commsMessage + `/` + comms_id
    );
    this.setState({
      commsMessages: commsGroupListMessage.data,
      isLoading: false,
    });
  }

  getData(comment) {
    if (comment !== "" && comment !== undefined) {
      return comment.replace(/<[^>]+>/g, "");
    } else {
      return "";
    }
  }

  setMessage = message => {
    this.setState({
      message,
    });
  };

  render() {
    const { datares, message, loggedInUser } = this.state;
    const keyboardVerticalOffset = Platform.OS === "ios" ? 70 : 50;

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <SafeAreaView style={styles.container}>
          {this.state.isLoading ? (
            <View style={styles.activityContainer} accessibilityRole="button">
              <ActivityIndicator
                animating={true}
                style={styles.activityIndicator}
                size="large"
                color={LOADER_COLOR.COLOR}
              />
            </View>
          ) : null}
          <ScrollView
            style={styles.fullWidth}
            ref="_scrollView"
            nestedScrollEnabled
          >
            <Card style={styles.fullWidth}>
              <Card.Title>{datares.name}</Card.Title>
              <FlatList
                style={styles.list}
                data={this.state.commsMessages}
                keyExtractor={item => item.id}
                renderItem={messageItem => {
                  const item = messageItem.item;
                  let inMessage = item.sender_id == loggedInUser.emp_id;
                  let itemStyle = !inMessage ? styles.itemIn : styles.itemOut;
                  return (
                    <View style={[styles.item, itemStyle]}>
                      <View style={[styles.balloon]}>
                        <Text style={styles.senderText}>
                          {item.sender_name}
                        </Text>
                        <Text>{this.getData(item.comment)}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </Card>
            <View style={{ height: 60 }} />
          </ScrollView>

          <SendMessageFooter
            message={message}
            onChangeText={this.setMessage}
            sendBroadmessage={this.sendCommsmessage}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
