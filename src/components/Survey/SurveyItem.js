import React from "react";
import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import Moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { DATE_FORMATS } from "../../util/constants/Constants";

export function SurveyItem({ survey, getSendButton, onPressViewButton }) {
  const setColor = type => {
    if (type === "Saved") {
      return "blue";
    } else if (type === "Submitted") {
      return "green";
    } else if (type === "Survey Closed") {
      return "red";
    }
    return undefined;
  };

  return (
    <Card style={styles.fullWidth}>
      <Card.Title>{survey.survey_name}</Card.Title>
      <View>
        <Text style={{ color: setColor(survey.submit) }}>{survey.submit}</Text>
        <Text style={{ color: setColor(survey.wrap) }}>{survey.wrap}</Text>
        {survey.create_date ? (
          <Text>
            {Moment(survey.create_date).format(DATE_FORMATS.BASIC_DATE_FORMAT)}
          </Text>
        ) : null}
        <View style={styles.sendButtonContainer}>
          {getSendButton(survey)}
          <TouchableHighlight
            style={styles.openButton}
            onPress={() => onPressViewButton(survey)}
          >
            <FontAwesome
              name="eye"
              size={20}
              color="white"
              title="View Members"
            />
          </TouchableHighlight>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  fullWidth: { width: "100%" },
  sendButtonContainer: {
    alignContent: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  openButton: {
    backgroundColor: "#a6cfd8",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    textAlign: "right",
    marginLeft: 20,
  },
});
