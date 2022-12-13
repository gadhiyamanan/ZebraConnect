import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "./BroadCastItemStyles";
import { useTheme, Button } from "react-native-paper";
import Moment from "moment";
import { DATE_FORMATS } from "../../util/constants/Constants";

export default function BroadcastItem({ broadCast, goToBroadCastDetails }) {
  const { colors } = useTheme();

  const goToDetails = () => {
    goToBroadCastDetails(broadCast);
  };

  return (
    <Card>
      <Card.Title>{broadCast.title_name}</Card.Title>
      <View>
        <Text numberOfLines={5}>{broadCast.description}</Text>
        <Text style={styles.senderName}>{broadCast.sender_name}</Text>
        <Text style={styles.sendDate}>
          {Moment(broadCast.created_date).format(
            DATE_FORMATS.BASIC_DATE_TIME_FORMAT
          )}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            compact
            mode="contained"
            style={[styles.openButton, { backgroundColor: colors.accent }]}
            icon={() => (
              <FontAwesome
                name="eye"
                size={20}
                color={colors.surface}
                title="View Members"
              />
            )}
            onPress={goToDetails}
          />
        </View>
      </View>
    </Card>
  );
}
