import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  noSurveyContainer: {
    flex: 1,
    height: 120,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activityContainer: {
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
    height: 30,
    marginTop: 16
  },
  fullWidth: { width: "100%" },
  sendButtonContainer: {
    alignContent: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: "mintcream",
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

  openButton: {
    backgroundColor: "#a6cfd8",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    textAlign: "right",
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
