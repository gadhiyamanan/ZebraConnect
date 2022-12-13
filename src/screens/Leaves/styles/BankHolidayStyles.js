import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerRightText: {
    // textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  headerRightContainer: {
    flex: 0.3,
    backgroundColor: "#a6cfd8",
    // alignContent: "center",
    fontWeight: "bold",
  },
  headerCenterText: {
    textAlign: "left",
    fontWeight: "bold",
    color: "white",
  },
  celDataContainer: {
    flex: 0.3,
    width: "30%",
    marginRight: 4,
  },
  nextArrowContainer: {
    flex: 0.3,
    width: "30%",
  },
  nextPrevButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  buttonIcon: { margin: 10 },
  headerCenterItemContainer: {
    flex: 0.5,
    backgroundColor: "#a6cfd8",
    alignContent: "center",
    fontWeight: "bold",
  },
  headerLeftText: {
    paddingLeft: 5,
    // textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "white",
  },
  headerLeftItemContainer: {
    flex: 0.2,
    backgroundColor: "#a6cfd8",
    textAlign: "left",
  },
  headerHeight: { height: 35 },
  fullWidth: { width: "100%" },
  cardHeaderContainer: {
    flex: 1,
    flexDirection: "row",
    height: 40,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "#a6cfd8",
    alignItems: "center",
  },
  activityIndicator: {
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
    backgroundColor: "dodgerblue",
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
});
