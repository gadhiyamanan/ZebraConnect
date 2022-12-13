import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  remardInputContaier: {
    flex: 1,
  },
  remarkText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    alignContent: "center",
    justifyContent: "center"
  },
  saveButton: {
    height: 60,
    width: width * 0.3,
    backgroundColor: "#a6cfd8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 5,
  },
  closeButton: {
    height: 60,
    width: width * 0.3,
    backgroundColor: "#a6cfd8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  remarkContainer: {
    width: width * 0.75,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    padding: 16,
    fontSize: 18,
    fontWeight:"bold"
  },
  overlayStyle: {
    height: height * 0.5,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerContainer: {
    flexDirection: "row",
    marginVertical: 16,
  },
});
