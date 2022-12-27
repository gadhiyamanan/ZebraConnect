import React from "react"
import { useState } from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { View, Text, StyleSheet } from "react-native"
import { showMessage } from "react-native-flash-message"
import Modal from "react-native-modal"
import { Button, useTheme } from "react-native-paper"
import DropDown from "../../DropDown/DropDown"
import styles from "./styles"

export default function TimePicker({ onCancel, isVisible, onConfirm }) {
  const theme = useTheme()
  const colors = theme.colors
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    amOrPm: ""
  })

  const hours = [
    { label: "00", value: "00" },
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" }
  ]
  const minutes = [
    { label: "00", value: "00" },
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
    { label: "21", value: "21" },
    { label: "22", value: "22" },
    { label: "23", value: "23" },
    { label: "24", value: "24" },
    { label: "25", value: "25" },
    { label: "26", value: "26" },
    { label: "27", value: "27" },
    { label: "28", value: "28" },
    { label: "29", value: "29" },
    { label: "30", value: "30" },
    { label: "31", value: "31" },
    { label: "33", value: "33" },
    { label: "34", value: "34" },
    { label: "35", value: "35" },
    { label: "36", value: "36" },
    { label: "37", value: "37" },
    { label: "38", value: "38" },
    { label: "39", value: "39" },
    { label: "40", value: "40" },
    { label: "41", value: "41" },
    { label: "42", value: "42" },
    { label: "43", value: "43" },
    { label: "44", value: "44" },
    { label: "45", value: "45" },
    { label: "46", value: "46" },
    { label: "47", value: "47" },
    { label: "48", value: "48" },
    { label: "49", value: "49" },
    { label: "50", value: "50" },
    { label: "51", value: "51" },
    { label: "52", value: "52" },
    { label: "53", value: "53" },
    { label: "54", value: "54" },
    { label: "55", value: "55" },
    { label: "56", value: "56" },
    { label: "57", value: "57" },
    { label: "58", value: "58" },
    { label: "59", value: "59" }
  ]
  const amorPm = [
    { label: "AM", value: "AM" },
    { label: "PM", value: "PM" }
  ]

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      useNativeDriver
      style={styles.timePickerContainer}
      onModalWillShow={() => setTime({ hour: "", minute: "", amOrPm: "" })}
    >
      <View style={styles.timePickerSubContainer}>
        <DropDown
          items={hours}
          onChangeItem={({ value }) => {
            setTime({ hour: value, minute: time.minute, amOrPm: time.amOrPm })
          }}
          placeholder="Select hour"
          value={time.hour}
          zIndex={8000}
        />
        <DropDown
          items={minutes}
          onChangeItem={({ value }) => {
            setTime({ hour: time.hour, minute: value, amOrPm: time.amOrPm })
          }}
          placeholder="Select minute"
          value={time.minute}
          zIndex={7000}
        />
        <DropDown
          items={amorPm}
          onChangeItem={({ value }) => {
            setTime({ hour: time.hour, minute: time.minute, amOrPm: value })
          }}
          placeholder="Select AM or PM"
          value={time.amOrPm}
          zIndex={6000}
        />
        <View style={styles.btnContainer}>
          <Button
            style={{
              backgroundColor: colors.accent
            }}
            uppercase={false}
            onPress={onCancel}
            mode="contained"
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: colors.accent
            }}
            uppercase={false}
            onPress={() => {
              if (!time.hour) return alert("Please select hour")
              if (!time.minute) return alert("Please select minute")
              if (!time.amOrPm) return alert("Please select Am or PM")
              onConfirm(time)
            }}
            mode="contained"
          >
            Ok
          </Button>
        </View>
      </View>
    </Modal>
  )
}
