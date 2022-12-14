import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import auth from "../../services/authService";
import http from "../../services/httpService";
import apiHelper from "../apiHelper";
import {
  SCREENS,
  LEAVE_TYPE,
  SICKNESS_TYPE,
} from "../../util/constants/Constants";
import DropDown from "../../components/DropDown/DropDown";
import DatePicker from "../../components/DatePicker/DatePickerCustom";
import { caluclateDateHours } from "../../util/util";
import CustomInput from "../../components/CustomInput/CustomInput";
import { styles } from "./styles/NewLeavesStyles";
import { LOADER_COLOR } from "../../util/constants/Constants";
import moment from "moment";
export default class NewLeaveRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankHolidays: [],
      loggedInUser: {},
      leaveType: [],
      primaryReasonData: [],
      secondaryReasonData: [],
      parentingReasonData: [],
      covidReasonData: [],
      secondaryNewReasons: [],
      ltype: "",
      fromDate: "",
      toDate: "",
      submitLeave: "",
      lreason: "",
      sreason: "",
      preason: "",
      preasonLabel: "",
      paternity_leave: "",
      primaryReason: false,
      secondryReason: false,
      parentingReason: false,
      daysState: 0,
      dayshours: "",
      ltypeLabel: "",
      isHoursEditable: false,
      devlopmentHours: 0,
      hoursPerDay:0
    };
    this.controller = null;
  }

  componentDidMount() {
    auth
      .getCurrentUser()
      .then(user => {
        this.setState({ loggedInUser: user });
        this.fetchData(user);
      })
      .catch({});
  }

  async fetchData(user) {
    this.setState({ isLoading: true });
    const formData = new URLSearchParams();
    formData.append("emp_id", user.emp_id);
   
    const hoursPerDayResult = await http.get(apiHelper.getEmpLeaveHoursPerDay + `/` + user.emp_id);
    const result = await http.get(apiHelper.getLeaveType + `/` + user.emp_id);
    const allData = result.data;
    let secondaryReason = allData.sicknessReason.filter(x => {
      return x.label !== SICKNESS_TYPE.COVID_19;
    });

    this.setState({
      leaveType: allData.leaveType,
      primaryReasonData: allData.sicknessReason,
      secondaryReasonData: secondaryReason,
      parentingReasonData: allData.parentingReason,
      covidReasonData: allData.covidReasons,
      isLoading: false,
      hoursPerDay:hoursPerDayResult?.data?.leave_hours_per_day||0
    });
  }

  componentWillUnmount() {
    const { route } = this.props;
    route.params.callRefresh();
  }

  setRequestData = () => {
    const {
      loggedInUser,
      toDate,
      fromDate,
      ltype,
      lreason,
      paternity_leave,
      preason,
      sreason,
      developmentHours,
    } = this.state;
    this.setState({ isLoading: true });
    const formData = new URLSearchParams();
    formData.append("emp_id", loggedInUser.emp_id);
    formData.append("tdate", toDate);
    formData.append("fdate", fromDate);
    formData.append("type", ltype);
    formData.append("lreason", lreason);
    formData.append("paternity_leave", paternity_leave);
    formData.append("preason", preason);
    formData.append("sreason", sreason);
    if (this.state.isHoursEditable) {
      formData.append("hours", developmentHours);
    }
    return formData;
  };

  resetStates = () => {
    this.setState({
      isLoading: false,
      toDate: "",
      fromDate: "",
      ltype: "",
      lreason: "",
      sreason: "",
      paternity_leave: "",
    });
  };

  setAlertMessage = message => {
    Alert.alert("", message, [{ text: "Ok" }], {
      cancelable: false,
    });
    this.setState({ isLoading: false });
  };

  submitLeave = async () => {
    const { toDate, fromDate, ltype, preason, sreason, paternity_leave } =
      this.state;
    if (ltype === "") {
      this.setAlertMessage("Please select leave type");
      return false;
    }
    if (fromDate === "") {
      this.setAlertMessage("Please select From Date");
      return false;
    }
    if (toDate === "") {
      this.setAlertMessage("Please select To Date");
      return false;
    }

    if (
      (ltype === "8" && !paternity_leave) ||
      (ltype === "1" && (!preason || !sreason))
    ) {
      this.setAlertMessage("Please select reason");
      return false;
    }

    if (
      ltype === "3" &&
      +new Date(moment().add(30, "day")) >= +new Date(moment(fromDate))
    ) {
      Alert.alert(
        "",
        "Minimum notice period for Study Leave is not met. Do you still wish to apply?",
        [
          {
            text: "Yes",
            onPress: () => {
              this.onSubmitApi();
            },
          },
          {
            text: "No",
            onPress: () => {
              this.setState({ fromDate: "" });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      this.onSubmitApi();
    }
  };

  onSubmitApi = async () => {
    try {
      let formData = this.setRequestData();
      const submitLeave = await http.post(
        apiHelper.submitLeaveRequest,
        formData
      );
      if (submitLeave.status === 200) {
        this.resetStates();
        Alert.alert(
          "",
          submitLeave.data.message,
          [
            {
              text: "Ok",
              onPress: this.goToMyLeaves,
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      this.resetStates();
    }
  };

  myViewTeam = value => {
    this.setState(
      {
        ltype: value.value,
        ltypeLabel: value.label,
        primaryReason: false,
        secondryReason: false,
        parentingReason: false,
        secondaryNewReasons: [],
      },
      () => this.checkHoursEnable()
    );
    if (value.value === "1") {
      this.setState({ primaryReason: true, secondryReason: true });
    }
    if (value.value === "8") {
      this.setState({ parentingReason: true });
    }
  };

  setPrimaryReason = value => {
    let secondaryReason = this.state.covidReasonData.filter(x => {
      return x.sickness_primary_id == value.sickness_id;
    });

    this.setState({
      secondaryNewReasons: secondaryReason,
      preason: value.value,
      preasonLabel: value.label,
      sreason: null,
    });

    if (this.controller) {
      this.controller.resetItems(this.state.covidReasonData);
      this.controller.setState({ choice: { label: null, value: null } });
      this.controller.null();
    }
  };

  setSecondaryReason = value => {
    this.setState({ sreason: value.value });
  };

  setParentingReason = value => {
    this.setState({ paternity_leave: value.label });
  };

  setFromDate = date => {
    var date1 = new Date(date);
    var date2 = new Date(this.state.toDate);
    if (this.state.toDate != "" && date1.getTime() > date2.getTime()) {
      alert("To date should be greater than From date");
      this.setState({
        fromDate: "",
      });
    } else {
      this.setState(
        {
          fromDate: date,
        },
        () => {
          this.calculateHours();
          this.checkHoursEnable();
        }
      );
    }
  };

  setToDate = date => {
    let toDate = date;
    var date1 = new Date(this.state.fromDate);
    var date2 = new Date(date);

    if (date1.getTime() > date2.getTime()) {
      alert("To date should be greater than From date");
      this.setState({
        toDate: "",
      });
    } else {
      this.setState(
        {
          toDate: toDate,
        },
        () => {
          this.calculateHours();
          this.checkHoursEnable();
        }
      );
    }
  };

  calculateHours = () => {
    if (this.state.fromDate && this.state.toDate) {
      let day_hours = caluclateDateHours(
        this.state.fromDate,
        this.state.toDate,
        this.state.hoursPerDay
      );
      this.setState(
        {
          daysState: day_hours.days,
          dayshours: day_hours.dayshours,
        },
        () => this.checkHoursEnable()
      );
    }
  };

  setRemark = value => {
    this.setState({ lreason: value });
  };

  goToMyLeaves = () => {
    this.setState({});
    this.props.navigation.navigate(SCREENS.MY_LEAVE);
  };

  checkHoursEnable = () => {
    if (
      this.state.fromDate === this.state.toDate &&
      this.state.ltypeLabel === LEAVE_TYPE.SELF_DEV_TIME
    ) {
      this.setState({ isHoursEditable: true });
    } else {
      this.setState({ isHoursEditable: false });
    }
  };

  render() {
    const {
      isLoading,
      leaveType,
      ltype,
      primaryReasonData,
      secondaryReasonData,
      covidReasonData,
      parentingReasonData,
      primaryReason,
      secondryReason,
      parentingReason,
      fromDate,
      toDate,
      daysState,
      dayshours,
      developmentHours,
      lreason,
      secondaryNewReasons,
    } = this.state;
    return (
      <React.Fragment>
        <SafeAreaView style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps={"handled"}
            style={styles.scrollView}
          >
            {isLoading ? (
              <ActivityIndicator
                animating={true}
                style={styles.contentLoader}
                size="large"
                color={LOADER_COLOR.COLOR}
              />
            ) : null}
            <DropDown
              items={leaveType}
              onChangeItem={this.myViewTeam}
              placeholder="Select Leave Type"
              value={ltype}
              zIndex={9000}
            />
            {primaryReason && (
              <DropDown
                items={primaryReasonData}
                onChangeItem={this.setPrimaryReason}
                placeholder="Select Primary Reason"
                value={ltype}
                zIndex={7000}
              />
            )}
            {primaryReason && (
              <DropDown
                controller={instance => {
                  this.controller = instance;
                }}
                items={secondaryNewReasons}
                onChangeItem={this.setSecondaryReason}
                placeholder="Select Secondary Reason"
                value={ltype}
                zIndex={5000}
              />
            )}
            {parentingReason && (
              <DropDown
                items={parentingReasonData}
                onChangeItem={this.setParentingReason}
                placeholder="Select Reason"
                value={ltype}
                zIndex={5000}
              />
            )}
            <View style={styles.datePickerContainer}>
              <DatePicker
                minDate={new Date()}
                placeholder="From Date"
                date={fromDate}
                onDateChange={this.setFromDate}
              />
              <DatePicker
                minDate={new Date()}
                placeholder="To Date"
                date={toDate}
                onDateChange={this.setToDate}
              />
            </View>
            <CustomInput
              placeholder={"Days"}
              value={daysState > 0 ? `${daysState} (${dayshours})` : ""}
              isEditable={false}
            />
            {this.state.isHoursEditable && (
              <CustomInput
                placeholder={"Hours"}
                value={developmentHours}
                isEditable={this.state.isHoursEditable}
                onChangeText={text => {
                  this.setState({
                    developmentHours: text,
                  });
                }}
                keyboardType="numeric"
              />
            )}
            <CustomInput
              placeholder={"Remark"}
              value={lreason}
              isEditable={true}
              onChangeText={this.setRemark}
            />
            <View style={styles.bottomButtonContainer}>
              <TouchableHighlight
                style={styles.openButton}
                onPress={this.goToMyLeaves}
              >
                <View style={styles.buttonContainer}>
                  <FontAwesome
                    name="close"
                    size={20}
                    color="white"
                    title="View Detail"
                  />
                  <Text style={styles.buttonText}> {"  Close"}</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.openButton}
                onPress={this.submitLeave}
              >
                <View style={styles.buttonContainer}>
                  <FontAwesome
                    name="send"
                    size={20}
                    color="white"
                    title="View Detail"
                  />
                  <Text style={styles.buttonText}> {"  Submit"}</Text>
                </View>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}