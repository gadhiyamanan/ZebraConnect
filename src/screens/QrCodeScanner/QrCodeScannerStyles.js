import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noCameraAccessContainer: {
    marginVertical: 10,
    height: 150,
    width: 150,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  button: {
    marginVertical: 10,
    justifyContent: "center",
    height: 50,
    borderRadius: 6,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subTitle: {
    color: "black",
    alignSelf: "center",
    textAlignVertical: "center",
    textAlign: "left",
    fontSize: 14,
    textAlign: "center",
  },
  camera:{
    height: 150,
    width: 150,
    alignSelf: "center",
    marginVertical: 10,
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
