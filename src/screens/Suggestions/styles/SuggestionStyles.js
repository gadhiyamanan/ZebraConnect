import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    height: 120,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sugesstionDetails: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  addText: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15,
    marginTop: 5,
    borderTopWidth: 0,
  },
  activityIndicator: {
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
  fullWidth: { width: "100%" },
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
    color: "red",
    marginTop: 10,
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
    paddingVertical: 2,
    elevation: 2,
    marginLeft: 40,
    alignItems: "center",
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
