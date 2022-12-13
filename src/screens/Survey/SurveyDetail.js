import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { Card, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import service from "../../services/SurveyService";
import { surveyDetailStyles } from "../../util/styles/GlobalStyles";
import auth from "../../services/authService";
import { LOADER_COLOR, SCREENS } from "../../util/constants/Constants";
import { styles } from "./styles/SurveyDetailsStyles";
import { showMessage } from "react-native-flash-message";

export default class SurveyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SurveyDetail: [],
      checkedId: -1,
      loggedInUser: {},
      subject: "",
      isLoading: true,
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
      this.getAllData(user);
    });
  }

  async getAllData(user) {
    const result = await service.fetchSurveyDetailData(
      user.emp_id,
      this.props.route.params.survey.id
    );
    if (result.data != null) {
      this.setState({
        SurveyDetail: result.data,
        isLoading: false,
      });
    }
  }

  checkSurvey(submitstatus) {
    var surveyId = "";
    service.saveSurvey(
      submitstatus,
      this.state.loggedInUser.emp_id,
      this.state.SurveyDetail,
      surveyId
    );
  }

  componentWillUnmount() {
    const { route } = this.props;
    route.params.callRefresh();
  }

  handleCheck = (type, opt, sques, value) => {
    const orginalSurvey = [...this.state.SurveyDetail];
    if (
      type.question_type !== "MultiQuestion" &&
      type.question_type !== "Opinion"
    ) {
      const selectedQuestion = orginalSurvey.filter(x => x.id === type.id);
      const selectedQuestionIndex = orginalSurvey.indexOf(selectedQuestion[0]);
      const selectedAnswer = selectedQuestion[0].possible_answer.filter(
        x => x.id === opt.id
      );
      const selectedAnswerIndex = selectedQuestion[0].possible_answer.indexOf(
        selectedAnswer[0]
      );
      selectedQuestion[0].possible_answer.map(item => (item.checked = false));
      selectedQuestion[0].possible_answer[selectedAnswerIndex].checked = true;
      orginalSurvey[selectedQuestionIndex] = selectedQuestion[0];
    } else if (type.question_type === "MultiQuestion") {
      const selectedQuestion = orginalSurvey.filter(x => x.id === type.id);
      const selectedQuestionIndex = orginalSurvey.indexOf(selectedQuestion[0]);
      const selectedSubQuestion = selectedQuestion[0].sub_question.filter(
        x => x.id === sques.id
      );
      const selectedAnswer = selectedSubQuestion[0].option.filter(
        x => x.id === opt.id
      );

      const selectedAnswerIndex = selectedSubQuestion[0].option.indexOf(
        selectedAnswer[0]
      );
      selectedSubQuestion[0].option.map(item => (item.checked = false));
      selectedSubQuestion[0].option[selectedAnswerIndex].checked = true;
      orginalSurvey[selectedQuestionIndex] = selectedQuestion[0];
    }
    this.setState({ SurveyDetail: orginalSurvey });
  };

  getOpinionOption(type, index) {
    return (
      <Card style={styles.opinitonCard}>
        <Card.Title style={styles.textAlignLeft}>
          {parseInt(index + 1) + ". " + type.question}
        </Card.Title>
        <View style={surveyDetailStyles.user}>
          <TextInput
            style={surveyDetailStyles.input}
            placeholder={"Write here"}
            placeholderTextColor={"#9E9E9E"}
            onChangeText={value => this.changeOpinion(type, value)}
            value={type.opinion}
            numberOfLines={4}
            multiline={true}
          />
        </View>
      </Card>
    );
  }

  getPossibleAnsOption(type, disabled, index) {
    return (
      <Card style={styles.fullWidth}>
        <Card.Title style={styles.textAlignLeft}>
          {parseInt(index + 1) + ". " + type.question}
        </Card.Title>
        {type.possible_answer.length < 1 ? (
          <Text />
        ) : (
          type.possible_answer.map(opt => {
            return (
              <View style={surveyDetailStyles.inputContainer}>
                <CheckBox
                  style={styles.heavyFonts}
                  disabled={disabled}
                  key={opt.id}
                  title={opt.label}
                  checked={opt.checked}
                  onPress={() => this.handleCheck(type, opt)}
                />
              </View>
            );
          })
        )}
      </Card>
    );
  }

  getMCQOption(type, disabled, index) {
    return (
      <Card style={styles.fullWidth}>
        <Card.Title style={styles.textAlignLeft}>
          {parseInt(index + 1) + ". " + type.question}
        </Card.Title>
        {type.sub_question.map(sques => (
          <Card style={styles.fullWidth}>
            <Card.Title style={styles.textAlignLeft}>
              {sques.sub_question}
            </Card.Title>
            {sques.option.map(opt => (
              <View style={surveyDetailStyles.inputContainer}>
                <CheckBox
                  style={styles.heavyFonts}
                  disabled={disabled}
                  key={opt.id}
                  title={opt.label}
                  checked={opt.checked}
                  onPress={() => this.handleCheck(type, opt, sques)}
                />
              </View>
            ))}
          </Card>
        ))}
      </Card>
    );
  }

  changeOpinion(type, value) {
    const orginalSurvey = [...this.state.SurveyDetail];
    const selectedQuestion = orginalSurvey.filter(x => x.id === type.id);
    const selectedQuestionIndex = orginalSurvey.indexOf(selectedQuestion[0]);
    selectedQuestion[0].opinion = value;
    orginalSurvey[selectedQuestionIndex] = selectedQuestion[0];
    this.setState({ SurveyDetail: orginalSurvey });
  }

  onPressSave = () => {
    this.checkSurvey("0");
  };

  onPressView = () => {
    this.checkSurvey("1");
  };

  getQuestions = (type, disabled, index) => {
    if (type.question_type === "MultiQuestion") {
      return this.getMCQOption(type, disabled, index);
    } else if (type.question_type === "Opinion") {
      return this.getOpinionOption(type, index);
    }
    return this.getPossibleAnsOption(type, disabled, index);
  };

  render() {
    const { isLoading } = this.state;
    const { route } = this.props;
    const survey_name = route.params.survey.survey_name;
    let disabled = false;
    return (
      <SafeAreaView style={surveyDetailStyles.container}>
        {isLoading ? (
          <View
            style={styles.activityIndicatorContainer}
            accessibilityRole="button"
          >
            <ActivityIndicator
              animating={true}
              style={styles.activityContainer}
              size="large"
              color={LOADER_COLOR.COLOR}
            />
          </View>
        ) : null}
        <ScrollView style={styles.fullWidth}>
          <Card style={styles.fullWidth}>
            <Card.Title>{survey_name}</Card.Title>
            {route.params.survey.wrap === "Survey Closed" && (
              <Text style={styles.closedSurvey}>Closed Survey</Text>
            )}
          </Card>
          {this.state.SurveyDetail.length > 0 &&
            this.state.SurveyDetail.map((type, index) => {
              disabled =
                type.survey_status === "2" ||
                route.params.survey.submit === "Submitted"
                  ? true
                  : false;
              return this.getQuestions(type, disabled, index);
            })}
          {route.params.survey.wrap === "Survey Closed" ||
          route.params.survey.submit === "Submitted" ? null : (
            <Card style={styles.fullWidth}>
              <View style={styles.buttonsContainer}>
                <View style={styles.buttonsSubcontainer}>
                  <TouchableHighlight
                    style={styles.openButton}
                    onPress={this.onPressSave}
                  >
                    <View style={styles.buttonWrapper}>
                      <FontAwesome
                        name="save"
                        size={20}
                        color="white"
                        title="View Detail"
                      />
                      <Text style={styles.buttonText}> {"  Save"}</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.openButton}
                    onPress={this.onPressView}
                  >
                    <View style={styles.buttonWrapper}>
                      <FontAwesome
                        name="send"
                        size={20}
                        color="white"
                        title="View Detail"
                      />
                      <Text style={styles.buttonText}> {"  Submit"}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </Card>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
