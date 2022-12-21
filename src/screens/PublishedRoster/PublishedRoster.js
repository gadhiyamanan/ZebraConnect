import React, { Component, Fragment } from "react"
import Moment from "moment"
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
  StatusBar,
  Platform
} from "react-native"
import { Card } from "react-native-elements"
import { FontAwesome } from "@expo/vector-icons"

import { WebView } from "react-native-webview"
import auth from "../../services/authService"
import http from "../../services/httpService"
import apiHelper from "../apiHelper"
import { SCREENS } from "../../util/constants/Constants"
import { styles } from "./PublishRoasterStyles"
import DropDown from "../../components/DropDown/DropDown"
import ShortLeaveModal from "../../components/Modal/ShortLeaveApplyModal"
import { withTheme, Button } from "react-native-paper"
import DocViewer from "../../components/DocViewer/DocViewer"
import { LOADER_COLOR } from "../../util/constants/Constants"
import Constants from "expo-constants"
import * as FileSystem from "expo-file-system"

class PublishedRoster extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isPrintLoading: false,
      MyViewFilter: [
        { label: "My view", value: "0" },
        { label: "Team view", value: "1" }
      ],
      shift: [],
      rosterperiod: [],
      ShiftDetail: [],
      dates: "",
      fromdate: "",
      todate: "",
      loggedInUser: {},
      periodPickerValue: "",
      myTeamPickerValue: "",
      shiftPickerValue: "",
      teamview: "",
      shiftid: "",
      showModal: false,
      currentSelectedShift: {},
      colors: props.theme.colors,
      modalVisible: false,
      pdfDoc: "",
      locations: [],
      locationid: "",
      locationPickerValue: "",
      isSearch: false,
      isDropdownOpen: false
    }
  }

  redirectUser(user) {
    if (user.emp_id === "" || user.emp_id === null) {
      this.props.navigation.navigate(SCREENS.LOGIN)
    }
  }

  componentDidMount() {
    auth.getCurrentUser().then((user) => {
      this.setState({ loggedInUser: user })
      this.redirectUser(user)
      this.selectRosterPeriod(user)
      
      this.selectLocationData(user)
    })
    this.selectShiftData()
  }

  ///Get Employees My Say Data and set in this.state.mySayList
  async selectShiftData() {
    const result = await http.get(apiHelper.rosterFilterShift)
    this.setState({ shift: result.data })
  }
  async selectLocationData(user) {
    const result = await http.get(apiHelper.locationDetail + `/` + user.emp_id)
    this.setState({ locations: result.data })
  }

  async selectRosterPeriod(user) {
    const result = await http.get(
      apiHelper.rosterFilterPeriod + `/` + user.emp_id
    )
    const selectedValue = result?.data?.find((data) => data?.selected)
      ? result?.data?.find((data) => data?.selected)
      : result?.data?.length
      ? result?.data[result?.data?.length - 1]
      : null
    this.setState({ rosterperiod: result.data }, () =>
      this.setState({
        periodPickerValue: selectedValue?.value,
        dates: selectedValue.label
      },()=>this.selectPublishRoster())
    )
  }

  selectPublishRoster = async () => {
    this.setState({ isLoading: true, isSearch: true })

    const formData = new URLSearchParams()
    formData.append("emp_id", this.state.loggedInUser.emp_id)
    formData.append("team_view", this.state.teamview)
    formData.append("roster_period", this.state.dates)
    formData.append("shift", this.state.shiftid)
    formData.append("location_filter", this.state.locationid)

    const result = await http.post(apiHelper.publishedRoster, formData)
    if (result.data && result.data.length <= 0) {
      this.setState({
        noDataFound: true
      })
    }
    this.setState({ ShiftDetail: result.data, isLoading: false })
  }

  checkifAssigned(data) {
    if (data.workarea !== "") {
      return (
        <Text style={styles.textField}>
          {data.workarea}/{data.location}
        </Text>
      )
    }
    if (data.location !== "") {
      return <Text style={styles.textField}>{data.location}</Text>
    }
  }

  toggleShiftModal = (shift) => {
    const { showModal } = this.state
    this.setState({
      currentSelectedShift: shift,
      showModal: !showModal
    })
  }

  checkifShift(data) {
    if (data.shift !== "") {
      let shortLeaveStyle =
        data.short_leave == 0
          ? styles.shortLeaveRowNegative
          : styles.shortLeaveRowPositive
      let shiftColor = data.shift_color == "" ? "#DEFDE0" : data.shift_color
      var today = new Date()
      var currdate =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate()
      var shiftdate = Moment(data.from_date).format("YYYY-MM-DD")
      var date1 = +new Date()
      var date2 = new Date(shiftdate)
      return (
        <React.Fragment>
          <TouchableOpacity
            onPress={() => {
              if (
                data.emp_id === this.state.loggedInUser.emp_id &&
                date1 <= date2
              ) {
                this.toggleShiftModal(data)
              }
            }}
            disabled={data.short_leave == -1 ? false : true}
          >
            <View style={data.zero == 1 ? "" : { backgroundColor: shiftColor }}>
              <View
                style={
                  data.zero == 1
                    ? styles.zeroDayTextContainer
                    : styles.shifttextContainer
                }
              >
                {data.short_leave != -1 ? (
                  <Text style={shortLeaveStyle}>SL</Text>
                ) : null}
                <Text
                  style={data.zero == 1 ? styles.zeroDayText : styles.shiftText}
                >
                  {data.shift}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {data.flexi_location ? (
            <View style={styles.flexiLocationtextContainer}>
              <Text style={styles.flexiLocationHeader}>Flexi Location(s)</Text>
              <Text style={styles.textField}>{data.flexi_location} </Text>
            </View>
          ) : null}
        </React.Fragment>
      )
    }
  }

  checkifShiftTeamView(data) {
    if (data.shift !== "") {
      let shortLeaveStyle =
        data.short_leave == 0
          ? styles.shortLeaveRowNegative
          : styles.shortLeaveRowPositive
      return (
        <React.Fragment>
          <TouchableOpacity
            onPress={() => {
              if (data.emp_id === this.state.loggedInUser.emp_id) {
                this.toggleShiftModal(data)
              }
            }}
            disabled={data.short_leave == -1 ? false : true}
          >
            <View
              style={
                data.zero == 1
                  ? styles.zeroDayTextContainer
                  : styles.shifttextContainert
              }
            >
              {data.short_leave != -1 ? (
                <Text style={shortLeaveStyle}>SL</Text>
              ) : null}
              <Text
                style={data.zero == 1 ? styles.zeroDayText : styles.shiftText}
              >
                <Text style={{ fontStyle: "italic", color: data.shift_color }}>
                  {data.shift}{" "}
                </Text>
                {"\n"}
                {this.nameSplitAll(data.emp_name)}
              </Text>
            </View>
          </TouchableOpacity>

          {data.flexi_location ? (
            <View style={styles.flexiLocationtextContainer}>
              <Text style={styles.flexiLocationHeader}>Flexi Location(s)</Text>
              <Text style={styles.textField}>{data.flexi_location} </Text>
            </View>
          ) : null}
        </React.Fragment>
      )
    }
  }
  nameSplit(empName) {
    if (empName !== "") {
      const splitName = empName.split("~")

      return splitName[0] + " ( " + splitName[3] + " )"
    }
  }

  nameSplitAll(empName) {
    if (empName !== "") {
      const splitName = empName.split(",")
      const nameAll = splitName.map((name, index) => (
        <Text key={String(index)}>
          {this.nameSplit(name)}
          {"\n"}
        </Text>
      ))
      return nameAll
    }
  }

  empPopUp(empName) {
    var splitName = "~ ~ ~"
    if (empName !== "") {
      splitName = empName.split("~")
    }
    var r = splitName[0]
    Alert.alert(
      r,
      `Email: ${splitName[1]}`,
      [
        {
          text: "Ok",
          style: "cancel"
        }
      ],
      { cancelable: false }
    )
  }

  rosterPeriodData = (value) => {
    this.setState({ dates: value.label })
    this.setState({ periodPickerValue: value.value })
  }

  rosterShiftData = (value) => {
    this.setState({ shiftid: value.value })
    this.setState({ shiftPickerValue: value.value })
  }
  selectedLocation = (value) => {
    this.setState({ locationid: value.value })
    this.setState({ locationPickerValue: value.value })
  }

  myViewTeam = (value) => {
    this.setState({ isSearch: false, teamview: value.value })
    this.setState({ myTeamPickerValue: value.value })
  }

  checkDate(data, previousdate) {
    let employeeFrom = data.employee_from == 2 ? "(Bank Assignment)" : ""
    if (data.from_date != previousdate)
      return `${data.from_date} ${employeeFrom}`
  }

  getShiftDetail = () => {
    const { ShiftDetail, noDataFound } = this.state
    let previousdate = ""
    if (ShiftDetail && ShiftDetail.length > 0) {
      return ShiftDetail.map((data, index) => {
        const dataIndex = index - 1
        index <= 0
          ? ""
          : ShiftDetail[dataIndex] != ""
          ? (previousdate = ShiftDetail[dataIndex].from_date)
          : ""
        return (
          <View key={String(index)} style={styles.shiftDetailsContainer}>
            <Text style={styles.dateText}>
              {this.checkDate(data, previousdate)}
            </Text>
            {this.checkifAssigned(data)}
            {this.checkifShift(data)}
            <TouchableHighlight
              onPress={() => {
                this.empPopUp(data.emp_name)
              }}
            >
              <Text style={styles.textField1}>
                {this.nameSplit(data.emp_name)}
              </Text>
            </TouchableHighlight>
          </View>
        )
      })
    } else if (noDataFound) {
      return <Text style={styles.noData}>No data found</Text>
    }
    return null
  }

  getShiftDetailTeamView = () => {
    const { ShiftDetail, noDataFound } = this.state
    let previousdate = ""
    if (ShiftDetail && ShiftDetail.length > 0) {
      return ShiftDetail.map((data, index) => {
        const dataIndex = index - 1
        index <= 0
          ? ""
          : ShiftDetail[dataIndex] != ""
          ? (previousdate = ShiftDetail[dataIndex].from_date)
          : ""
        return (
          <React.Fragment key={String(index)}>
            <Text style={styles.dateText}>
              {this.checkDate(data, previousdate)}
            </Text>
            {this.checkifAssigned(data)}
            {this.checkifShiftTeamView(data)}
          </React.Fragment>
        )
      })
    } else if (noDataFound) {
      return <Text style={styles.noData}>No data found</Text>
    }
    return null
  }

  dataCard = () => {
    const { teamview, isSearch } = this.state
    return (
      <Fragment>
        <View style={styles.ShiftContainer} zIndex={-200}>
          {/* <Card> */}

          {teamview == 1 && isSearch && this.getShiftDetailTeamView()}
          {teamview == 0 && isSearch && this.getShiftDetail()}
          {/* </Card> */}
        </View>
      </Fragment>
    )
  }

  refreshPublishRoster = () => {
    this.selectPublishRoster()
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
      pdfDoc: ""
    })
  }

  render() {
    const {
      isLoading,
      MyViewFilter,
      myTeamPickerValue,
      shift,
      shiftPickerValue,
      rosterperiod,
      periodPickerValue,
      showModal,
      currentSelectedShift,
      modalVisible,
      pdfDoc,
      locations,
      locationPickerValue,
      colors
    } = this.state

    return (
      <SafeAreaView style={styles.container}>
        {modalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.closeModal()
            }}
          >
            <DocViewer
              uri={pdfDoc}
              onPress={() => {
                this.closeModal()
              }}
            />
          </Modal>
        )}
        {showModal && (
          <ShortLeaveModal
            refreshPublishRoster={this.refreshPublishRoster}
            currentSelectedShift={currentSelectedShift}
            toggleShiftModal={this.toggleShiftModal}
          />
        )}
        {isLoading ? (
          <View style={styles.activityContainer} accessibilityRole="button">
            <ActivityIndicator
              animating={true}
              style={styles.activityIndicator}
              size="large"
              color={LOADER_COLOR.COLOR}
            />
          </View>
        ) : null}
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainer}
          style={styles.scrollView}
        >
          <View
            style={[
              styles.filterCard,
              this.state.isDropdownOpen && { height: 400 }
            ]}
            zIndex={2000}
          >
            <View style={[Platform.OS === "ios" && { zIndex: 2000 }]}>
              <React.Fragment>
                <DropDown
                  items={MyViewFilter}
                  onChangeItem={this.myViewTeam}
                  placeholder={"My view"}
                  value={myTeamPickerValue}
                  zIndex={9000}
                />
              </React.Fragment>
              <React.Fragment>
                <DropDown
                  items={shift}
                  onChangeItem={this.rosterShiftData}
                  placeholder={"Select Shift"}
                  value={shiftPickerValue}
                  zIndex={7000}
                />
              </React.Fragment>
              <React.Fragment>
                <DropDown
                  items={rosterperiod}
                  onChangeItem={this.rosterPeriodData}
                  placeholder={"Select Roster Period"}
                  value={periodPickerValue}
                  zIndex={5000}
                  defaultValue={periodPickerValue}
                />
              </React.Fragment>
              <View>
                <DropDown
                  items={locations}
                  onChangeItem={this.selectedLocation}
                  placeholder={"Select Location"}
                  value={locationPickerValue}
                  zIndex={2000}
                  onOpen={() => this.setState({ isDropdownOpen: true })}
                  onClose={() => this.setState({ isDropdownOpen: false })}
                />
              </View>
            </View>
            <View zIndex={1000}>
              <Button
                compact
                style={[styles.openButton, { backgroundColor: colors.accent }]}
                icon={() => (
                  <FontAwesome
                    name="search"
                    color={colors.surface}
                    size={25}
                    title="View Detail"
                  />
                )}
                mode="contained"
                onPress={this.selectPublishRoster}
              />
            </View>
          </View>
          <View zIndex={-200}>{this.dataCard()}</View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
export default withTheme(PublishedRoster)
