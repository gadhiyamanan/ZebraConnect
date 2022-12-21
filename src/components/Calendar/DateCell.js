import React, { Component } from "react";
import { Text, View, Alert, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Moment from "moment";
import { styles } from "./styles/CalenderStyles";
import { DATE_FORMATS } from "../../util/constants/Constants";
import CustomAlertModal from "../CustomAlertModal/CustomAlertModal";

export default class DateCell extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalData: [],
  };

  getDayOff(dayOff) {
    if (dayOff && dayOff.length > 0) {
      return (
        <Text
          accessibilityHint="Day Off"
          // onPress={() => {
          //   this.detailPopup("Day Off", "Day Off", dayOff[0].shift_date);
          // }}
          style={styles.textLabelFontSize}
        >
          <FontAwesome
            name="ban"
            size={20}
            color="black"
            accessibilityHint="Day Off"
          />
        </Text>
      );
    }
  }

  getLeave(leave) {
    if (leave && leave.length > 0) {
      return (
        <Text
          style={[styles.leaveTypeText, styles.textLabelFontSize]}
          accessibilityHint="Leave"
          // onPress={() => {
          //   this.detailPopup("Leave", leave[0].leave_type, leave[0].leave_date);
          // }}
        >
          {leave[0].leave_type}
        </Text>
      );
    }
  }

  getTraining(training) {
    return (
      <Text
        style={[styles.trainingTypeText, styles.textLabelFontSize]}
        accessibilityHint="Training"
        // onPress={() => {
        //   this.detailPopup(
        //     "Training",
        //     training[0].name + " Training ",
        //     training[0].fromToDate,
        //     training[0].fromToDate,
        //     training[0]
        //   );
        // }}
      >
        {training[0].name + " Training"}
      </Text>
    );
  }

  getUnavailability(unavailability) {
    return (
      <Text
        style={[styles.unavailabilityTypeText, styles.textLabelFontSize]}
        accessibilityHint="Unavailability"
        // onPress={() => {
        //   this.detailPopup(
        //     "Unavailability",
        //     "Unavailability",
        //     unavailability[0].fromToDate,
        //     unavailability[0].fromToDate,
        //     unavailability[0]
        //   );
        // }}
      >
        {"Unavailability"}
      </Text>
    );
  }

  getZeroDay(zeroDay) {
    return (
      <Text
        accessibilityHint="Leave"
        // onPress={() => {
        //   this.detailPopup("Zero Day", "Zero Day", zeroDay[0].shiftDate);
        // }}
        style={styles.textLabelFontSize}
      >
        Zero Day
      </Text>
    );
  }

  getAssignment(assignment) {
    return (
      <Text
        style={[
          styles.shiftNameText,
          styles.textLabelFontSize,
          { backgroundColor: assignment?.shift_bg_color },
        ]}
        accessibilityHint="Leave"
        // onPress={() => {
        //   this.detailPopup(
        //     "Assignment",
        // assignment?.type +
        //   "\n" +
        //   assignment.locationName +
        //   "/" +
        //   assignment.shift_name,
        //     assignment.shift_from_time,
        //     assignment.shift_to_time,
        //     assignment
        //   );
        // }}
      >
        {assignment.shift_name}
      </Text>
    );
  }

  detailPopup(type, header, date, tdate, details) {
    let title = "";
    let body = "";
    if (type === "Leave") {
      title = header;
      body = "Date : " + Moment(date).format(DATE_FORMATS.BASIC_DATE_FORMAT);
    }
    if (type === "Training") {
      title = header;
      body =
        `\nVenue : ${details.venue} \nDate : ` +
        date +
        `\nTime : ${details.time}`;
    }
    if (type === "Assignment") {
      title = header;
      var flexi_location = "";
      if (details.flexi_location.length > 0) {
        flexi_location = `\nFlexi Location : ${details.flexi_location}`;
      }
      body = `(${Moment(date).format(DATE_FORMATS.DATE_ONLY_FORMAT)})
Shift Time : ${Moment(date).format(
        DATE_FORMATS.TIME_ONLY_12_HOUR_FORMAT
      )} To ${Moment(tdate).format(
        DATE_FORMATS.TIME_ONLY_12_HOUR_FORMAT
      )}${flexi_location}`;
    }
    if (type === "Day Off") {
      title = header;
      body = "Date : " + Moment(date).format(DATE_FORMATS.BASIC_DATE_FORMAT);
    }
    if (type === "Zero Day") {
      title = header;
      body = "Date : " + Moment(date).format(DATE_FORMATS.BASIC_DATE_FORMAT);
    }
    if (type === "Unavailability") {
      title = header;
      body = "Date : " + Moment(date).format(DATE_FORMATS.BASIC_DATE_FORMAT);
    }
    Alert.alert(
      title,
      body,
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  getCellData = () => {
    var dataArray = [];
    if (this.props.leave && this.props.leave.length > 0) {
      this.props.leave.map(row => {
        dataArray.push({
          title: "",
          subTitle: row?.leave_type,
          message:
            "Date : " +
            Moment(row.leave_date).format(DATE_FORMATS.BASIC_DATE_FORMAT),
        });
      });
    }
    if (this.props.dayOff && this.props.dayOff.length > 0) {
      this.props.dayOff.map(row => {
        dataArray.push({
          title: "",
          subTitle: "Day Off",
          message:
            "Date : " +
            Moment(row?.shift_from_time).format(DATE_FORMATS.BASIC_DATE_FORMAT),
        });
      });
    }
    if (this.props.assignment && this.props.assignment.length > 0) {
      this.props.assignment.map(row => {
        var flexi_location = "";
        if (row.flexi_location.length > 0) {
          flexi_location = `\nFlexi Location : ${row.flexi_location}`;
        }

        dataArray.push({
          title: row?.type,
          subTitle: `${row.locationName} ${row?.shift_name}`,
          message: `(${Moment(row.shift_from_time).format(
            DATE_FORMATS.DATE_ONLY_FORMAT
          )}) Shift Time : ${Moment(row.shift_from_time).format(
            DATE_FORMATS.TIME_ONLY_12_HOUR_FORMAT
          )} To ${Moment(row.shift_to_time).format(
            DATE_FORMATS.TIME_ONLY_12_HOUR_FORMAT
          )}${flexi_location}`,
        });
      });
    }
    if (this.props.zeroDay && this.props.zeroDay.length > 0) {
      this.props.zeroDay.slice(0, 1).map(row => {
        dataArray.push({
          title: "",
          subTitle: "Zero Day",
          message:
            "Date : " +
            Moment(row.shift_from_time).format(DATE_FORMATS.BASIC_DATE_FORMAT),
        });
      });
    }
    if (this.props.training && this.props.training.length > 0) {
      this.props.training.map(row => {
        dataArray.push({
          title: "",
          subTitle: "Training",
          message:
            `\nVenue : ${row?.venue} \nDate : ` +
            row?.shift_from_time +
            `\nTime : ${row?.time}`,
        });
      });
    }
    if (this.props.unavailability && this.props.unavailability.length > 0) {
      this.props.unavailability.map(row => {
        dataArray.push({
          title: "",
          subTitle: "Unavailability",
          message:
            "Date : " +
            Moment(row.shift_from_time).format(DATE_FORMATS.BASIC_DATE_FORMAT),
        });
      });
    }
    if (dataArray.length > 0) {
      return dataArray;
    }

    return [];
  };

  getCellDataInformation = () => {
    var dataArray = [];
    if (this.props.leave && this.props.leave.length > 0) {
      dataArray.push(this.getLeave(this.props.leave));
    }
    if (this.props.dayOff && this.props.dayOff.length > 0) {
      dataArray.push(this.getDayOff(this.props.dayOff));
    }
    if (this.props.assignment && this.props.assignment.length > 0) {
      this.props.assignment.map(row => {
        dataArray.push(this.getAssignment(row));
      });
    }
    if (this.props.zeroDay && this.props.zeroDay.length > 0) {
      dataArray.push(this.getZeroDay(this.props.zeroDay));
    }
    if (this.props.training && this.props.training.length > 0) {
      dataArray.push(this.getTraining(this.props.training));
    }
    if (this.props.unavailability && this.props.unavailability.length > 0) {
      dataArray.push(this.getUnavailability(this.props.unavailability));
    }
    if (dataArray.length > 0) {
      return dataArray;
    }

    return null;
  };

  getDateCellValue() {
    if (this.props.rowIndex > 0 && this.props.date != -1) {
      return this.getCellDataInformation();
    }
  }

  getCellColor() {
    if (this.props.rowIndex > 0 && this.props.date != -1) {
      if (this.props.leave && this.props.leave.length > 0) {
        return "pink";
      } else if (this.props.dayOff && this.props.dayOff.length > 0) {
        return "white";
      } else if (this.props.assignment && this.props.assignment.length > 0) {
        return "transparent";
      } else if (this.props.training && this.props.training.length > 0) {
        return "dodgerblue";
      } else if (this.props.zeroDay && this.props.zeroDay.length > 0) {
        return "#ededed";
      } else if (
        this.props.unavailability &&
        this.props.unavailability.length > 0
      ) {
        return "orange";
      } else {
        return "0";
      }
    } else {
      return "0";
    }
  }

  render() {
    let colorIn =
      this.props.colIndex === 5 || this.props.colIndex === 6 ? "gray" : "";

    return (
      <>
        <CustomAlertModal
          isVisible={!!this.state.modalData?.length}
          onRequestClose={() => this.setState({ modalData: [] })}
          data={this.state.modalData}
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({ modalData: this.getCellData() });
          }}
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            minHeight: 50,
            backgroundColor:
              `${this.getCellColor()}` === "0"
                ? colorIn
                : `${this.getCellColor()}`,
          }}
        >
          <Text>{this.props.date === -1 ? "" : this.props.date}</Text>
          {this.getDateCellValue()}
        </TouchableOpacity>
      </>
    );
  }
}
