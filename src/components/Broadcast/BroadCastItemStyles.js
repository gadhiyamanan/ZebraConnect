import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  senderName: {
    marginTop: 5,
    fontStyle: "italic",
    color: "green",
  },
  sendDate: {
    fontStyle: "italic",
    color: "orangered",
  },
  buttonContainer: {
    alignContent: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  openButton: {
    borderRadius: 5,
    padding: 5,
    elevation: 2,
    textAlign: "right",
  },
});
