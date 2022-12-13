import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    width: "90%",
    alignSelf: "center",
    paddingTop: 10,
  },
  listStyle: { maxHeight: 250 },
  itemSeparator: { height: 15 },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  btnText: { fontSize: 15, color: "blue", fontWeight: "bold" },
  title: {
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "500",
  },
  message: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 5,
  },
});
