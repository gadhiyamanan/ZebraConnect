import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import DatePickerCustom from "../DatePicker/DatePickerCustom";
import CustomInput from "../CustomInput/CustomInput";
import { styles } from "./shortLeaveApplyModalStyle";
import httpService from "../../services/httpService";
import apiHelper from "../../screens/apiHelper";
import { DATE_FORMATS } from "../../util/constants/Constants";
import moment from "moment";
import { showMessage } from "react-native-flash-message";
import { Button, useTheme } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

const ShortLeaveModal = ({
  toggleShiftModal,
  currentSelectedShift,
  refreshPublishRoster,
}) => {
  const [visible, setVisible] = useState(true);
  const [fromDate, setFromDate] = useState();
  const [fromFullDate, setFromFullDate] = useState();
  const [toFullDate, setToFullDate] = useState();
  const [toDate, setToDate] = useState();
  const [remark, setRemark] = useState();
  const toggleOverlay = () => {
    toggleShiftModal();
    setVisible(!visible);
  };
  const paperTheme = useTheme();

  const saveShortLeave = async () => {
    try {
      const formData = new URLSearchParams();
      let stime = moment(fromFullDate).set({second:0}).format(DATE_FORMATS.TIME_ONLY_FORMAT);
      let etime = moment(toFullDate).set({second:0}).format(DATE_FORMATS.TIME_ONLY_FORMAT);
      formData.append("stime", stime);
      formData.append("etime", etime);
      formData.append("message", remark);
      formData.append("plannerId", currentSelectedShift.planner_id);
      formData.append("shiftdate", currentSelectedShift.from_date);
      formData.append("shiftid", currentSelectedShift.shiftid);
      formData.append("locationid", currentSelectedShift.location_id);
      formData.append("empId", currentSelectedShift.emp_id);
      await httpService.post(apiHelper.assignShortLeave, formData);
      toggleOverlay();
      refreshPublishRoster();
      showSuccessMessage();
    } catch (error) {
      toggleOverlay();
      showErrorMessage();
    }
  };

  const showErrorMessage = () => {
    showMessage({
      message: "Something went wrong please try again later!",
      type: "success",
      backgroundColor: "gray", // background color
      color: "#ffffff", // text color
    });
  };

  const showSuccessMessage = () => {
    showMessage({
      message: "Short leave Applied successfully!",
      type: "success",
      color: "#ffffff", // text color
    });
  };

  useEffect(() => {
    let shiftFromDate = moment(currentSelectedShift.from_time).format(
      DATE_FORMATS.PICKER_TIME_FORMAT
    );

    let shiftFromFullDate = moment(currentSelectedShift.from_time).format(
      DATE_FORMATS.PICKER_DATE_TIME_FORMAT
    );

    setFromDate(shiftFromDate);
    setFromFullDate(shiftFromFullDate);

    let shiftToDate = moment(currentSelectedShift.to_time).format(
      DATE_FORMATS.PICKER_TIME_FORMAT
    );

    let shiftToFullDate = moment(currentSelectedShift.to_time).format(
      DATE_FORMATS.PICKER_DATE_TIME_FORMAT
    );

    setToDate(shiftToDate);
    setToFullDate(shiftToFullDate);
  }, []);

  return (
    <View>
      <Overlay
        overlayStyle={styles.overlayStyle}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text style={styles.titleText}>
          Annual short leave for {currentSelectedShift.from_date}
        </Text>
        <View style={styles.datePickerContainer}>
          <DatePickerCustom
            mode={"time"}
            date={fromDate}
            onDateChange={(time, date) => {
              setFromFullDate(date);
              setFromDate(time);
            }}
            placeholder={"From Time"}
          />
          <DatePickerCustom
            mode={"time"}
            date={toDate}
            onDateChange={(time, date) => {
              setToDate(time);
              setToFullDate(date);
            }}
            placeholder={"To Time"}
          />
        </View>
        <View style={styles.remarkContainer}>
          <View style={styles.remardInputContaier}>
            <CustomInput
              placeholder={""}
              inModal={true}
              value={remark}
              isEditable={true}
              placeholder="Remark"
              onChangeText={setRemark}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={{
              backgroundColor: paperTheme.colors.accent,
              marginRight: 10,
            }}
            uppercase={false}
            mode="contained"
            onPress={toggleOverlay}
            icon={() => (
              <FontAwesome
                name="close"
                size={30}
                color={paperTheme.colors.surface}
                title="View Members"
              />
            )}
            labelStyle={styles.buttonText}
          >
            Close
          </Button>

          <Button
            style={{
              backgroundColor: paperTheme.colors.accent,
              marginLeft: 10,
            }}
            uppercase={false}
            mode="contained"
            onPress={saveShortLeave}
            icon={() => (
              <FontAwesome
                name="send"
                size={25}
                color={paperTheme.colors.surface}
                title="View Members"
              />
            )}
            labelStyle={styles.buttonText}
          >
            Submit
          </Button>
        </View>
      </Overlay>
    </View>
  );
};

export default ShortLeaveModal;
