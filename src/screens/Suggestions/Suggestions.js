import React, { Component } from "react";

import {
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Alert,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import auth from "../../services/authService";
import http from "../../services/httpService";
import apiHelper from "../apiHelper";
import { LOADER_COLOR, SCREENS } from "../../util/constants/Constants";
import SuggestionItem from "../../components/Suggestions/SuggestionItem";
import { styles } from "./styles/SuggestionStyles";
import { withTheme, Button } from "react-native-paper";

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      Suggestions: [],
      loggedInUser: {},
      colors: props.theme.colors,
      refresh: false,
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
        this.fetchSuggestionData(user);
      })
      .catch({});
  }

  async fetchSuggestionData(user) {
    const suggestionList = await http.get(
      apiHelper.getIdeaSuggestionList + `/` + user.emp_id
    );
    this.setState({
      Suggestions: Array.isArray(suggestionList.data)
        ? suggestionList.data
        : [],
      isLoading: false,
    });
  }

  sendMySugges(suggestion) {
    let title = "Your suggestion will be submitted";
    Alert.alert(
      title,
      "",
      [
        {
          text: "Ok",
          onPress: () => {
            this.sendMySuggestion(suggestion);
          },
          style: "cancel",
        },
        { text: "Cancel" },
      ],
      { cancelable: false }
    );
  }

  async sendMySuggestion(suggestion) {
    this.setState({ isLoading: true });
    const formData = new URLSearchParams();
    formData.append("empid", this.state.loggedInUser.emp_id);
    formData.append("idea", suggestion.idea);
    formData.append("subject", suggestion.subject);
    formData.append("status", 1);
    formData.append("auto_id", suggestion.id);
    await http.post(apiHelper.insertIdeaSuggestionList, formData);
    this.setState({ isLoading: false });
    this.fetchSuggestionData(this.state.loggedInUser);
  }

  getSendButton = suggestion => {
    const { colors } = this.state;
    if (suggestion && suggestion.status !== "1")
      return (
        <Button
          compact
          mode="contained"
          style={[styles.openButton, { backgroundColor: colors.accent }]}
          icon={() => (
            <FontAwesome
              name="send"
              size={20}
              color={colors.surface}
              title="Send"
            />
          )}
          onPress={() => {
            this.sendMySuggestion(suggestion);
          }}
        />
      );
  };

  goToDetailsScreen = suggestion => {
    this.props.navigation.navigate(SCREENS.SUGGESTIONS_DETAILS, {
      suggestion,
      callRefresh: this.callRefresh.bind(this),
    });
  };

  callRefresh() {
    this.fetchSuggestionData(this.state.loggedInUser);
  }

  addNewSugesstion = () => {
    this.props.navigation.navigate(SCREENS.SUGGESTIONS_ADD, {
      callRefresh: this.callRefresh.bind(this),
    });
  };

  render() {
    if (
      this.props.route?.params?.refresh &&
      this.props.route?.params?.refresh === true
    ) {
      this.props.route.params.refresh = false;
      this.fetchSuggestionData(this.state.loggedInUser);
    }

    const { navigation } = this.props;
    const { isLoading, colors } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.fullWidth}>
          {isLoading ? (
            <View
              style={styles.activityIndicatorContainer}
              accessibilityRole="button"
            >
              <ActivityIndicator
                animating={true}
                style={styles.activityIndicator}
                size="large"
                color={LOADER_COLOR.COLOR}
              />
            </View>
          ) : null}
          <View style={styles.buttonContainer}>
            <Button
              style={[styles.openButton, { backgroundColor: colors.accent }]}
              uppercase={false}
              mode="contained"
              onPress={this.addNewSugesstion}
            >
              Add New
            </Button>
          </View>
          {this.state.Suggestions.map((suggestion, index) => {
            return (
              <SuggestionItem
                key={index}
                suggestion={suggestion}
                navigation={navigation}
                getSendButton={this.getSendButton}
                goToDetailsScreen={this.goToDetailsScreen}
              />
            );
          })}
          {!isLoading && this.state.Suggestions?.length == 0 && (
            <View style={styles.emptyContainer}>
              <Text>No record found</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withTheme(Suggestions);
