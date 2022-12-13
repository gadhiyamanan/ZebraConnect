import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  emptyListText: {
    fontSize: 14,
    color: "black",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    alignContent: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  fullWidth: { width: "100%" },
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
  activityContanier: {
    width: "100%",
    padding: 10,
    alignContent: "center",
    alignItems: "center",
  },
});
  