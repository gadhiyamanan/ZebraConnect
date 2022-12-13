import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  heavyFonts: { fontWeight: "100" },
  opinitonCard: { marginLeft: 0, marginRight: 0, width: "100%" },
  textAlignLeft: {
    textAlign: "left",
  },
  closedSurvey: { color: "red", textAlign: "left" },
  buttonText: { color: "white" },
  buttonWrapper: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsSubcontainer: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonsContainer: { alignItems: "center" },
  fullWidth: { width: "100%" },
  activityContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  activityIndicatorContainer: {
    width: "100%",
    padding: 10,
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "mintcream",
    flexWrap: "wrap",
  },
  button: {
    alignItems: "center",
    height: 50,
  },
  status: {
    fontStyle: "italic",
    color: "orangered",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: 300,
  },

  deleteButton: {
    backgroundColor: "orangered",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    textAlign: "right",
    marginLeft: 20,
  },
  openButton: {
    backgroundColor: "#a6cfd8",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    // textAlign: "right",
    marginLeft: 20,
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
});
