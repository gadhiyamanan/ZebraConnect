import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  roleText: {
    textAlign: "center",
  },
  roleContainer: {
    flex: 0.5,
    alignContent: "center",
  },
  name: {
    textAlign: "left",
    textAlignVertical: "center",
    paddingLeft: 4,
  },
  nameContainer: {
    flex: 0.5,
    height: 30,
    alignContent: "center",
    textAlignVertical: "center",
    borderColor: "#cbcbcb",
    flexWrap: "wrap",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#BDBDBD",
  },
  headerCenterText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  headerRightText: {
    flex: 0.5,
    backgroundColor: "#f0f0f0",
    alignContent: "center",
    fontWeight: "bold",
  },
  headerLeft: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
  },
  headerLeftText: {
    flex: 0.5,
    backgroundColor: "#f0f0f0",
    alignContent: "center",
    textAlignVertical: "center",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    height: 40,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  fullWidth: { width: "100%" },
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    opacity: 1,
    height: 20,
  },
  activityContainer: {
    width: "100%",
    padding: 10,
    alignContent: "center",
    alignItems: "center",
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
  activityContanier: {
    width: "100%",
    padding: 10,
    alignContent: "center",
    alignItems: "center",
  },
});
