import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollView: { width: "100%" },
  buttonText: { color: "white" },
  buttonContainer: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomButtonContainer: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  datePickerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    margin: 10,
    backgroundColor: "white",
  },
  contentLoader: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
    justifyContent:"center",
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
  datePickerBox: {
    marginTop: 9,
    borderColor: "#FF5722",
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent: "center",
  },

  datePickerText: {
    fontSize: 14,
    marginLeft: 0,
    borderWidth: 0,
    color: "#000",
  },
  datePickerStyle: {
    width: "40%",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    fontSize: 18,
    margin: 10,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
});
  