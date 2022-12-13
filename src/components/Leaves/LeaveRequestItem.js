import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "./LeaveRequestStyles";
import moment from "moment";

function getColorStatus(status) {
  switch (status) {
    case "Pending":
      return (
        <FontAwesome name="stop" size={20} color="#FFD600" title="Pending" />
      );
    case "Approved":
      return (
        <FontAwesome name="stop" size={20} color="#00C853" title="Approved" />
      );
    case "Declined":
      return (
        <FontAwesome name="stop" size={20} color="#FF3D00" title="Declined" />
      );
    case "Cancelled":
      return (
        <FontAwesome name="stop" size={20} color="#FF8F00" title="Cancelled" />
      );
  }
}

export default function LeaveRequestItem({ leaverequest }) {
  return (
    <React.Fragment>
      <View style={styles.itemContainer}>
        <View style={styles.leaveStyleContainer}>
          <Text style={styles.leaveType}>{leaverequest.leave_type}</Text>
        </View>
      </View>
      {/* <View style={styles.leaveFromContainer}>
        <View style={styles.leaveFromSubContainer}>
          <Text style={styles.from}>From</Text>
        </View>
        <View style={styles.toLeaveSubContainer}>
          <Text style={styles.todate}>To </Text>
        </View>
      </View> */}

      <View style={styles.leaveFromContainer}>
        <View style={styles.leaveFromSubContainer}>
          <Text style={styles.from}>
            {leaverequest.from_date} to {leaverequest.to_date} (
            {moment(moment(leaverequest.to_date).format("YYYY-MM-DD")).diff(
              moment(leaverequest.from_date).format("YYYY-MM-DD"),
              "days"
            ) + 1}{" "}
            day(s))
          </Text>
        </View>
        {/* <View style={styles.toLeaveSubContainer}>
          <Text style={styles.todate}>{leaverequest.to_date}</Text>
        </View> */}
      </View>
      <View style={styles.leaveStatusContainer}>
        <View style={styles.leaveStatusSubcontainer}>
          <Text style={styles.from}>
            {getColorStatus(leaverequest.status)}
            &nbsp;{leaverequest.status}
          </Text>
        </View>
      </View>
    </React.Fragment>
  );
}
