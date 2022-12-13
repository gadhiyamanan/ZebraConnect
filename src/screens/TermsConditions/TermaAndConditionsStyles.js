import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  fullWidth: { width: "100%" },
  acceptButtonText: {
    color: "white",
  },
  acceptButton: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
  },
  acceptButtonLayout: {
    backgroundColor: "#a6cfd8",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    textAlign: "right",
    marginLeft: 20,
  },
  acceptButtonSubcontainer: { flex: 0.4 },
  acceptButtonContainer: {
    flex: 1,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleContainer: {
    backgroundColor: "#a6cfd8",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    opacity: 1,
    height: 20,
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
    backgroundColor: "dodgerblue",
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
