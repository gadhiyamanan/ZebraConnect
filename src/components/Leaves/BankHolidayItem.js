import React from "react";
import Moment from "moment";
import { View, Text } from "react-native";
import { styles } from "./BankHolidayItemStyles";
import { DATE_FORMATS } from "../../util/constants/Constants";

export default function BankHolidayItem({ item, index }) {
  return (
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff" },
      ]}
    >
      <View style={styles.leftCellContainer}>
        <Text style={[styles.leftCell]}>{item.day}</Text>
      </View>
      <View style={styles.centerCellContainer}>
        <Text style={styles.centerCell}>{item.holiday_name}</Text>
      </View>
      <View style={styles.rightCellContaier}>
        <Text style={styles.rightCell}>
          {Moment(item.date).format(DATE_FORMATS.BASIC_DATE_FORMAT)}
        </Text>
      </View>
    </View>
  );
}
