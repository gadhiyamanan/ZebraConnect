import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";
import Moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { DATE_FORMATS, SCREENS } from "../../util/constants/Constants";
import { styles } from "./styles/SurveyItemStyles";
import { useTheme, Button } from "react-native-paper";

export default function SuggestionItem({
  suggestion,
  navigation,
  getSendButton,
}) {
  const { colors } = useTheme();

  const goToDetailsScreen = () => {
    navigation.navigate(SCREENS.SUGGESTIONS_DETAILS, {
      suggestion,
    });
  };

  const checkStatus = status => {
    if (status === "1") {
      return "Submitted";
    }
    return "Saved";
  };

  return (
    <Card>
      <View>
        <Text>{suggestion.subject}</Text>
        <Text style={styles.status}>{checkStatus(suggestion.status)}</Text>
        <Text>
          {Moment(suggestion.updated_date).format(
            DATE_FORMATS.BASIC_DATE_TIME_FORMAT
          )}
        </Text>
        <View style={styles.sugesstionDetails}>
          {getSendButton(suggestion)}
          <Button
            compact
            mode="contained"
            style={[styles.openButton, { backgroundColor: colors.accent }]}
            icon={() => (
              <FontAwesome
                name="eye"
                size={20}
                color={colors.surface}
                title="View Details"
              />
            )}
            onPress={goToDetailsScreen}
          />
        </View>
      </View>
    </Card>
  );
}
