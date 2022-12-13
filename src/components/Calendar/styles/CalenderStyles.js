import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  rowItems: { flex: 1, flexDirection: "row" },
  nextArrowContainer: {
    flex: 0.3,
    width: "30%",
  },
  arrowContainer: { flexDirection: "row", flex: 1 },
  celDataContainer: {
    flex: 0.3,
    width: "30%",
    marginRight: 4,
  },
  calenderSubcontainer: { flexDirection: "row" },
  calenderContainer: { alignItems: "center", marginTop: 50 },
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
    // height: 30,
  },
  monthText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 20,
    // textAlign: "center",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#cacaca",
  },
  dataCellContiner: {
    flex: 0.2,
    borderLeftColor: "#cacaca",
    borderLeftWidth: 1,
    borderBottomColor: "#cacaca",
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    color: "black",
  },
  closeButtonText: { color: "white" },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  leaveTypeText: {
    backgroundColor: "pink",
    width: "100%",
  },
  trainingTypeText: {
    backgroundColor: "dodgerblue",
    width: "100%",
  },
  unavailabilityTypeText: {
    backgroundColor: "orange",
    width: "100%",
  },
  shiftNameText: {
    // backgroundColor: "green",
    width: "100%",
  },
  textLabelFontSize: {
    flex: 1,
    fontSize: 11,
  },
  infoContainer: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
  },
  draftPublishContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  draftPublishSubContainer: {
    // backgroundColor: "gray",
    justifyContent: "flex-end",
    marginBottom: 10,
    padding: 10,
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  draftBox: { height: 20, width: 20, backgroundColor: "#6ae46a" },
  publishBox: { height: 20, width: 20, backgroundColor: "#81cdcd" },
});
