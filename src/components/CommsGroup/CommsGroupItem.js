import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import Moment from "moment";
import { DATE_FORMATS } from "../../util/constants/Constants";
import { styles } from "./styles/CommsGroupItemStyles";
import { useTheme, Button } from "react-native-paper";

export default function CommsGroupItem({
  item,
  goToGroupMembers,
  goToGroupDetails,
}) {
  const { colors } = useTheme();

  return (
    <Card style={styles.fullWidth}>
      <Card.Title>{item.name}</Card.Title>
      <View>
        <Text style={styles.name}>
          {Moment(item.created_date).format(
            DATE_FORMATS.BASIC_DATE_TIME_FORMAT
          )}
        </Text>
        <View style={styles.groupIconContainer}>
          <Button
            compact
            mode="contained"
            style={[styles.openButton, { backgroundColor: colors.accent }]}
            icon={() => (
              <FontAwesome
                name="group"
                size={20}
                color={colors.surface}
                title="View Detail"
              />
            )}
            onPress={() => goToGroupMembers(item)}
          />
          <Button
            compact
            mode="contained"
            style={[styles.openButton, { backgroundColor: colors.accent }]}
            icon={() => (
              <FontAwesome
                name="wechat"
                size={20}
                color={colors.surface}
                title="View Detail"
              />
            )}
            onPress={() => goToGroupDetails(item)}
          />
        </View>
      </View>
    </Card>
  );
}
