import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  fullWidth: { width: "100%" },
  buttonText: { color: "white" },
  buttonSubContainer: {
    // width: 190,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  bankHolidayButtonContaier: {
    borderRadius: 5,
    padding: 0,
    elevation: 2,
    // textAlign: "right",
  },
  headerSubcontainer: { flex: 0.5, marginLeft: 12 },
  headerContainer: {
    flex: 1,
    paddingRight: 15,
    flexDirection: "row",
    paddingLeft: 5,
    // justifyContent: "flex-end",
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    height: 50,
  },
  bankHolidayText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
