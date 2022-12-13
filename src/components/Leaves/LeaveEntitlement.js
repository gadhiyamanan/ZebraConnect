import { Text, View } from "native-base";
import React from "react";
import { styles } from "./LeaveRequestStyles";

export default function LeaveEntitlement({ leave }) {
  return (
    <View style={styles.leaveEntitlementContainer}>
      <View style={styles.leaveEntitlementSubContainer}>
        <Text style={styles.leaveTypeText}>
          {leave.leave_type} ({leave.total_leave})
        </Text>
      </View>
      <View style={styles.totalLeave}>
        <Text style={styles.textCenter}>
          {leave.taken} / {leave.remaining}
        </Text>
      </View>
    </View>
  );
}
