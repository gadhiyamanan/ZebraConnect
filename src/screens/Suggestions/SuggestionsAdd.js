import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import auth from "../../services/authService";
import http from "../../services/httpService";
import apiHelper from "../apiHelper";
import { SCREENS } from "../../util/constants/Constants";
import { styles } from "./styles/AddSuggestionStyles";

export default class SuggestionsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      mySay: "",
      loggedInUser: {},
      checkAlert: "",
      isEdit: false,
      suggestionId: "",
    };
  }

  redirectUser(user) {
    if (user.emp_id === "" || user.emp_id === null) {
      this.props.navigation.navigate(SCREENS.LOGIN);
    }
  }

  componentDidMount() {
    auth
      .getCurrentUser()
      .then(user => {
        this.setState({ loggedInUser: user });
        this.redirectUser(user);
      })
      .catch({});

    const editSuggestion = this.props.route.params.suggestion;
    if (editSuggestion) {
      this.setState({
        mySay: editSuggestion.idea,
        subject: editSuggestion.subject,
        isEdit: true,
        suggestionId: editSuggestion.id,
      });
    }
  }

  saveMySay = async () => {
    const { loggedInUser, mySay, subject, isEdit, suggestionId } = this.state;
    const formData = new URLSearchParams();
    formData.append("empid", loggedInUser.emp_id);
    formData.append("idea", mySay);
    formData.append("subject", subject);
    formData.append("status", 0);
    formData.append("auto_id", isEdit ? suggestionId : 0);
    if (mySay === "") {
      const message = "Enter Your Suggestion";
      this.setState({ checkAlert: message });
    }
    if (subject === "") {
      const message1 = "Enter Your Subject";
      this.setState({ checkAlert: message1 });
    }
    if (mySay !== "" && subject !== "") {
      const addSuggestions = await http.post(
        apiHelper.insertIdeaSuggestionList,
        formData
      );
      if (addSuggestions.status == 200) {
        this.showMessage(addSuggestions.message);
        this.props.navigation.navigate(SCREENS.SUGGESTIONS, {
          refresh: true,
        });
      } else {
        this.showMessage(addSuggestions.message);
      }
      this.resetLoader();
    }
  };

  resetLoader = () => {
    this.setState({
      mySay: "",
      isLoading: false,
      subject: "",
    });
  };

  sendMySay = async () => {
    const { loggedInUser, mySay, subject, suggestionId, isEdit } = this.state;
    this.setState({ isLoading: true });
    const formData = new URLSearchParams();
    formData.append("empid", loggedInUser.emp_id);
    formData.append("idea", mySay);
    formData.append("subject", subject);
    formData.append("status", 1);
    formData.append("auto_id", isEdit ? suggestionId : 0);
    if (mySay === "") {
      const message = "Enter Your Suggestion";
      this.setState({ checkAlert: message });
    }
    if (subject === "") {
      const message1 = "Enter Your Subject";
      this.setState({ checkAlert: message1 });
    }
    if (mySay !== "" && subject !== "") {
      const sendSuggestions = await http.post(
        apiHelper.insertIdeaSuggestionList,
        formData
      );
      this.resetLoader();
      if (sendSuggestions.status == 200) {
        this.props.navigation.navigate(SCREENS.SUGGESTIONS, {
          refresh: true,
        });
      }
    }
  };

  componentWillUnmount() {
    const { route } = this.props;
    route.params?.callRefresh();
  }

  showMessage(message) {
    return <Text style={styles.errorText}>{message}</Text>;
  }

  setSubject = subject => {
    this.setState({ subject });
  };

  setSuggestion = mySay => {
    this.setState({ mySay });
  };

  render() {
    const { dataSource, checkAlert } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.fullWidth}
        >
          <Card style={styles.fullWidth}>
            <View>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={"Subject"}
                onChangeText={this.setSubject}
                value={this.state.subject}
                numberOfLines={4}
                multiline={true}
              />
              <TextInput
                onChangeText={this.setSuggestion}
                value={this.state.mySay}
                underlineColorAndroid="transparent"
                placeholder={"Suggestion"}
                numberOfLines={8}
                multiline={true}
                height={100}
              />
              <View style={styles.saveButtonContainer}>
                <View style={styles.buttonSubContainer}>
                  <TouchableHighlight
                    style={styles.openButton}
                    onPress={this.saveMySay}
                  >
                    <View style={styles.buttonWrapper}>
                      <FontAwesome
                        name="save"
                        size={20}
                        color="white"
                        title="save"
                        visible={false}
                      />
                      <Text style={styles.buttonText}> Save</Text>
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={styles.buttonSubContainer}>
                  <TouchableHighlight
                    style={styles.openButton}
                    onPress={this.sendMySay}
                  >
                    <View style={styles.buttonWrapper}>
                      <FontAwesome
                        name="send"
                        size={20}
                        color="white"
                        title="save"
                        visible={false}
                      />
                      <Text style={styles.buttonText}> Send</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              <Text style={styles.errorMessage}>
                {dataSource ? this.showMessage(dataSource.message) : ""}
                {checkAlert ? this.showMessage(checkAlert) : ""}
              </Text>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
