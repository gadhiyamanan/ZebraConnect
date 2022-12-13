import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  senderText: {
    color: "#061f5d",
    fontWeight: "bold",
  },
  fullWidth: {
    flex: 1,
    width: "100%",
    height: "100%",
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
    borderRadius: 2,
    padding: 10,
    elevation: 2,
    textAlign: "right",
    marginLeft: 20,
  },
  openButton: {
    backgroundColor: "#a6cfd8",
    borderRadius: 2,
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
  list: {
    paddingHorizontal: 17,
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#eeeeee",
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: "#a6cfd8",
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  balloon: {
    maxWidth: 200,
    padding: 6,
    borderRadius: 1,
  },
  itemIn: {
    alignSelf: "flex-start",
    backgroundColor: "#dddddd",
  },
  itemOut: {
    alignSelf: "flex-end",
  },
  time: {
    alignSelf: "flex-end",
    margin: 15,
    fontSize: 12,
    color: "#808080",
  },
  item: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#B9F6CA",
    padding: 5,
    borderRadius: 10,
  },
});
