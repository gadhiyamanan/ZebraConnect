import React, { Component } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  TouchableHighlight,
  Modal,
  Alert,
} from "react-native";
import DateCell from "./DateCell";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import http from "../../services/httpService";
import apiHelper from "../../screens/apiHelper";
import { styles } from "./styles/CalenderStyles";
import { withTheme, Button } from "react-native-paper";
import auth from "../../services/authService";

class Calendar extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    activeDate: new Date(),
    leaves: [],
    trainings: [],
    dayoffs: [],
    assignments: [],
    modalVisible: false,
    checkActivate: "",
    zeroDay: [],
    unavailability: [],
    colors: this.props.theme.colors,
    loggedInUser: {},
  };

  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  changeMonth = (n, month, year) => {
    if (month === 11 && n == 1) {
      month = 0;
      year = parseInt(year) + 1;
    } else if (month < 11 && n === 1) {
      month++;
    } else if (month === 0 && n != 1) {
      month = 11;
      year = parseInt(year) - 1;
    } else if (month > 0 && month <= 11 && n != 1) {
      month--;
    }

    const currentMonth = parseInt(month);
    const currentYear = year;
    this.setState(() => {
      this.state.activeDate.setMonth(currentMonth);
      this.state.activeDate.setFullYear(year);

      return this.state;
    });

    this.getEmployeeCalendar(currentMonth, currentYear);
  };

  async getEmployeeCalendar(currentMonth, currentYear) {
    this.setState({
      leaves: [],
      trainings: [],
      dayoffs: [],
      assignments: [],
      unavailability: [],
      zeroDay: [],
    });
    this.setState({ isLoading: true });
    const formData = new URLSearchParams();
    formData.append("empid", this.state.loggedInUser.emp_id);
    formData.append("monthname", currentMonth + 1);
    formData.append("yearname", currentYear);
    const { data: reportDetail } = await http.post(
      apiHelper.getEmpReportDetail,
      formData
    );
    // console.warn(reportDetail);
    this.setState({
      leaves: reportDetail.getApprovedLeave,
      trainings: reportDetail.getTraining,
      dayoffs: reportDetail.getDayOffExpress,
      assignments: reportDetail.getAssignments,
      zeroDay: reportDetail.getZeroDay,
      unavailability: reportDetail.getUnavailability,
    });
    this.setState({ isLoading: false });
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await auth.getCurrentUser().then(user => {
      this.setState({ loggedInUser: user });
      this.getEmployeeCalendar(
        this.state.activeDate.getMonth(),
        this.state.activeDate.getFullYear()
      );
    });
  }

  generateMatrix() {
    let matrix = [];
    matrix[0] = this.weekDays;
    let year = this.state.activeDate.getFullYear();
    let month = this.state.activeDate.getMonth();
    let firstDay = new Date(year, month, 0).getDay();
    let maxDays = this.nDays[month];
    if (month == 1) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    let counter = 1;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if ((row == 1 && col >= firstDay) || (row > 1 && counter <= maxDays)) {
          matrix[row][col] = counter++;
        }
      }
    }
    return matrix;
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  showModal() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Leave Detail</Text>
              <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  getRows = (row, rowIndex) => {
    const { leaves, dayoffs, assignments, trainings, zeroDay, unavailability } =
      this.state;

    return row.map((item, colIndex) => {
      let filteredLeaves = leaves.filter(
        x => new Date(x.leave_date).getDate() === item
      );
      let filteredDayOffs = dayoffs.filter(
        x => new Date(x.shift_date).getDate() === item
      );
      let filteredAssignments = assignments.filter(
        x => new Date(x.date).getDate() === item
      );
      let filteredTrainings = trainings.filter(
        x => new Date(x.date).getDate() === item
      );
      let filteredZeroDay = zeroDay.filter(
        x => new Date(x.shiftDate).getDate() === item
      );
      let filteredUnavailabilityDay = unavailability.filter(
        x => new Date(x.unavailable_date).getDate() === item
      );

      return (
        <View key={colIndex} style={styles.dataCellContiner}>
          <DateCell
            key={item}
            date={item}
            activeDate={this.state.activeDate.getDate()}
            colIndex={colIndex}
            rowIndex={rowIndex}
            leave={filteredLeaves}
            dayOff={filteredDayOffs}
            leave={filteredLeaves}
            training={filteredTrainings}
            assignment={filteredAssignments}
            zeroDay={filteredZeroDay}
            unavailability={filteredUnavailabilityDay}
          />
        </View>
      );
    });
  };

  getCalendarView() {
    let matrix = this.generateMatrix();
    let rows = [];
    let ctr = 1;
    rows = matrix.map((row, rowIndex) => {
      ctr++;
      let rowItems = this.getRows(row, rowIndex);

      return (
        <React.Fragment key={rowIndex}>
          <View style={styles.rowItems} key={ctr}>
            {rowItems}
          </View>
        </React.Fragment>
      );
    });
    return rows;
  }

  previousMonth = () => {
    const { activeDate } = this.state;
    this.changeMonth(-1, activeDate.getMonth(), activeDate.getFullYear());
  };

  nextMonth = () => {
    const { activeDate } = this.state;
    this.changeMonth(+1, activeDate.getMonth(), activeDate.getFullYear());
  };

  render() {
    const { isLoading, colors } = this.state;
    let rows = this.getCalendarView();
    return (
      <View>
        <ScrollView>
          {isLoading ? (
            <View style={styles.activityContainer} accessibilityRole="button">
              <ActivityIndicator
                animating={isLoading}
                style={styles.activityIndicator}
                color="#061f5d"
                size="large"
              />
            </View>
          ) : null}
          <View style={styles.infoContainer}>
            <Text style={styles.monthText}>
              {this.months[this.state.activeDate.getMonth()]} &nbsp;
              {this.state.activeDate.getFullYear()}
            </Text>

            <View style={styles.draftPublishContainer}>
              <View style={styles.draftPublishSubContainer}>
                <View style={styles.draftBox} />
                <Text style={{ textAlign: "right" }}>{` Draft`}</Text>
              </View>
              <View style={styles.draftPublishSubContainer}>
                <View style={styles.publishBox} />
                <Text>{` Published`}</Text>
              </View>
            </View>
          </View>
          {rows}

          <View style={styles.calenderContainer}>
            <View style={styles.calenderSubcontainer}>
              <Button
                compact
                mode="contained"
                style={[
                  styles.celDataContainer,
                  { backgroundColor: colors.accent },
                ]}
                icon={() => (
                  <FontAwesome
                    name="angle-double-left"
                    size={30}
                    color={colors.surface}
                    title="Previous"
                    style={{ margin: 10 }}
                  />
                )}
                onPress={this.previousMonth}
              />
              <Button
                compact
                mode="contained"
                style={[
                  styles.nextArrowContainer,
                  { backgroundColor: colors.accent },
                ]}
                icon={() => (
                  <FontAwesome
                    name="angle-double-right"
                    size={30}
                    color={colors.surface}
                    title="Next"
                    style={{ margin: 10 }}
                  />
                )}
                onPress={this.nextMonth}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(Calendar);
