import React, { Component } from "react";
import {
  Alert,
  SafeAreaView,
  TouchableHighlight,
  FlatList,
  View,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import auth from "../../services/authService";
import http from "../../services/httpService";
import apiHelper from "../apiHelper";
import { LOADER_COLOR,SCREENS } from "../../util/constants/Constants";
import { SurveyItem } from "../../components/Survey/SurveyItem";
import { styles } from "./styles/SurveyStyles";
import { Text } from "react-native-elements";

export default class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      Surveys: [],
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
      this.fetchSurveyData(user);
    });
  }

  async fetchSurveyData(user) {
    this.setState({
      isLoading: true,
    });
    const SurveyList = await http.get(
      apiHelper.getPublishedSurvey + `/` + user.emp_id
    );
    this.setState({ Surveys: SurveyList.data, isLoading: false });
  }

  submitSurvey = submitRow => {
    const submitstatus = "2";
    const pdata = "";
    const sid = submitRow.id;
    this.saveSurvey(submitstatus, this.state.loggedInUser.emp_id, pdata, sid);
  };

  async getDataFun(submitparams, empId, SurveyDetail, surveyId, clickEvent) {
    if (clickEvent === "True") {
      const formData = new FormData();
      formData.append("empid", empId);
      formData.append("submit_status", submitparams);
      formData.append("postdata", JSON.stringify(SurveyDetail));
      formData.append("survey_id", surveyId);
      const response = await http.post(
        apiHelper.insertSurveyQuestionAnswer,
        formData
      );
      this.fetchSurveyData(this.state.loggedInUser);
      return response;
    }
  }

  async saveSurvey(submitparams, empId, SurveyDetail, surveyId) {
    let title = "";
    if (submitparams === "0") {
      title = "Your response will be saved";
    }
    if (submitparams === "1") {
      title = "Your response will be submitted";
    }
    if (submitparams === "2") {
      title = "Your response will be submitted";
    }
    Alert.alert(
      title,
      "",
      [
        {
          text: "Ok",
          onPress: () => {
            this.getDataFun(
              submitparams,
              empId,
              SurveyDetail,
              surveyId,
              "True"
            );
          },
          style: "cancel",
        },
        { text: "Cancel" },
      ],
      { cancelable: false }
    );
  }

  getSendButton = survey => {
    if (survey.submit === "Saved") {
      return (
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.submitSurvey(survey);
          }}
        >
          <FontAwesome
            name="send"
            size={20}
            color="white"
            title="Submit Survey"
          />
        </TouchableHighlight>
      );
    }
  };

  callRefresh() {
    this.fetchSurveyData(this.state.loggedInUser);
  }

  onPressViewButton = survey => {
    this.props.navigation.navigate(SCREENS.SURVEY_DETAILS, {
      survey,
      callRefresh: this.callRefresh.bind(this),
    });
  };

  getNoSurveyMessage = () => {
    const { isLoading } = this.state;
    if (!isLoading) {
      return (
        <View style={styles.noSurveyContainer}>
          <Text>No survey is available for you!</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    const { Surveys, isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            style={styles.activityContainer}
            size="large"
            color={LOADER_COLOR.COLOR}
          />
        ) : null}
        <View style={styles.fullWidth}>
          <FlatList
            data={Surveys}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={this.getNoSurveyMessage}
            renderItem={survey => {
              return (
                <SurveyItem
                  survey={survey.item}
                  getSendButton={this.getSendButton}
                  onPressViewButton={this.onPressViewButton}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
