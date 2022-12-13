import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#061f5d",
    textAlign: "center",
  },
  dateText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "blue",
    paddingVertical: 3,
  },
  noData: { textAlign: "center" },
  scrollViewContentContainer: { paddingVertical: 10 },
  scrollView: { width: "100%" },
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    opacity: 1,
    height: 20,
  },
  activityContainer: {
    width: "100%",
    padding: 10,
    alignContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    flexWrap: "wrap",
  },
  button: {
    alignItems: "center",
    height: 50,
  },
  status: {
    fontStyle: "italic",
    color: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: 300,
  },
  modalView: {
    margin: 20,
    width: 300,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",

    elevation: 5,
  },
  openButton: {
    borderRadius: 5,
    padding: 5,
    elevation: 2,
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
    width: "85%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
  },
  textField: {
    textAlign: "center",
    textAlignVertical: "center",
    borderColor: " rgb(225, 232, 238)",
    borderWidth: 1,
    flex: 1,
    padding: 10,
    marginBottom: 4,
    backgroundColor: "#DEF3FD",
  },
  textField1: {
    textAlign: "center",
    textAlignVertical: "center",
    borderColor: " rgb(225, 232, 238)",
    borderWidth: 1,
    padding: 10,
    marginBottom: 4,
    backgroundColor: "#DCDCDC",
  },
  zeroDayTextContainer: {
    flex: 1,
    backgroundColor: "#7CFC00",
  },
  shifttextContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgb(225, 232, 238)",
  },
  shifttextContainert: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgb(225, 232, 238)",
    backgroundColor: "#DEFDE0",
  },
  flexiLocationtextContainer: {
    flex: 1,
    width: "100%",
    marginTop: 3,
    backgroundColor: "#F0DEFD",
  },
  zeroDayText: {
    textAlign: "center",
    textAlignVertical: "center",
    borderColor: " rgb(225, 232, 238)",
    padding: 10,
    marginBottom: 4,
  },
  shortLeaveRowPositive: {
    textAlign: "center",
    textAlignVertical: "center",
    borderColor: " rgb(225, 232, 238)",
    color: "green",
    padding: 10,
    marginBottom: 4,
  },
  shortLeaveRowNegative: {
    textAlign: "center",
    textAlignVertical: "center",
    borderColor: " rgb(225, 232, 238)",
    color: "red",
    padding: 10,
    marginBottom: 4,
  },
  shiftText: {
    textAlign: "center",
    textAlignVertical: "center",
    borderColor: " rgb(225, 232, 238)",
    flex: 1,
    padding: 10,
    marginBottom: 4,
  },
  shiftText1: {
    fontStyle: "italic",
  },
  flexiLocationHeader: {
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: " rgb(225, 232, 238)",
    flex: 1,
    padding: 10,
  },
  ShiftContainer: { paddingHorizontal: 10 },
  filterCard: { marginHorizontal: 10,padding:10, borderWidth:1,borderColor:"lightgray" },
  shiftDetailsContainer: { marginTop: 10 },
});
