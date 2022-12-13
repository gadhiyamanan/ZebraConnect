import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  errorText: { color: "red" },
  errorMessage: { textAlign: "center" },
  buttonText: { color: "white" },
  buttonWrapper: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonSubContainer: { flex: 0.5 },
  saveButtonContainer: {
    flex: 1,
    flexDirection: "row",
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
  TextInputStyleClass: {
    borderColor: "black",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontSize: 18,
    marginBottom: 2,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
});
