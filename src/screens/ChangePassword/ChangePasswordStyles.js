import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  input: {
    width: "100%",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontSize: 14,
    marginBottom: 2,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  button: {
    justifyContent: "center",
    height: 50,
    width: "100%",
    borderRadius: 6,
  },
  scrollviewContainer: {
    flexGrow: 1,
  },
  scrollview: {
    width: "100%",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  loginButtonContainer: {
    marginTop: 40,
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  loginErrorMessage: {
    fontStyle: "italic",
    color: "red",
    fontSize: 15,
  },
  errorMessage: {
    color: "red",
  },
});
