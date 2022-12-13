import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "mintcream",
    flexWrap: "wrap",
  },
  container1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    flexWrap: "wrap",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#a6cfd8",
    height: 50,
    width: "100%",
    borderRadius: 6,
    marginTop: 10,
    color: "black",
    fontSize: 13,
    // fontFamily: 'OpenSans-Regular',
  },
  input: {
    width: "100%",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontSize: 20,
    marginBottom: 2,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
});
export const surveyDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "mintcream",
    flexWrap: "wrap",
    width: "100%",
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

    textAlign: "left",
    fontSize: 14,
    // fontFamily: 'OpenSans-Regular',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export const dashboardStyles = StyleSheet.create({
  bottomSafearea: { flex: 0, backgroundColor: "white" },
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    padding: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    flex: 0.5,
    borderWidth: 1,
    borderColor: "#dddddd",
    padding: 10,
    marginBottom: 4,
  },
  cardAlternate: {
    backgroundColor: "#ffffff",
    width: "100%",
    flex: 0.5,
    borderWidth: 1,
    borderColor: "#dddddd",
    padding: 10,
    marginBottom: 4,
  },

  button: {
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    borderColor: "black",
    padding: 30,
    textAlign: "center",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  itemText: {
    fontSize: 18,
    color: "#061f5d",
    paddingLeft: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export const globalStyles = StyleSheet.create({
  bottomSafeArea: {
    flex: 0,
    backgroundColor: "transparent",
  },
  topSafeArea: {
    flex: 1,
    backgroundColor: "#061f5d",
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
    color: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: 300,
  },

  openButton: {
    backgroundColor: "dodgerblue",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    textAlign: "right",
    marginLeft: 30,
  },

  deleteButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    textAlign: "right",
    marginLeft: 30,
  },
  textStyle: {
    color: "white",
    fontWeight: "normal",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  titleTextStyle: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
