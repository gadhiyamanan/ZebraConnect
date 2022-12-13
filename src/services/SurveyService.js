import apiHelper from "../screens/apiHelper";
import http from "./httpService";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";

export async function fetchSurveyDetailData(empId, id) {
  return http.get(apiHelper.getQuestionSurvey + `/` + id + `/` + empId);
}

async function getDataFun(
  submitparams,
  empId,
  SurveyDetail,
  surveyId,
  clickEvent
) {
  if (clickEvent === "True") {
    const formData = new URLSearchParams();
    formData.append("empid", empId);
    formData.append("submit_status", submitparams);
    formData.append("postdata", JSON.stringify(SurveyDetail));
    formData.append("survey_id", surveyId);
    return http.post(apiHelper.insertSurveyQuestionAnswer, formData);
  }
}
export async function saveSurvey(submitparams, empId, SurveyDetail, surveyId) {
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
          getDataFun(submitparams, empId, SurveyDetail, surveyId, "True")
            .then(response => {
              displayMessage(
                submitparams === "0" ? "Survey Saved" : "Survey Submitted"
              );
            })
            .catch(error => {});
        },
        style: "cancel",
      },
      { text: "Cancel" },
    ],
    { cancelable: false }
  );
}

const displayMessage = message => {
  showMessage({
    message: message,
    type: "success",
    color: "#ffffff", // text color
  });
};

export default {
  fetchSurveyDetailData,
  saveSurvey,
};
