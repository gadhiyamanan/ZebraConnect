import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#BDBDBD",
  },
  leftCellContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
    borderColor: "#cbcbcb",
    flexWrap: "wrap",
  },
  leftCell: {
    alignSelf: "center",
    textAlign: "left",
    textAlignVertical: "center",
    paddingLeft: 4,
  },
  centerCellContainer: {
    flex: 0.5,
    textAlign: "left",
  },
  centerCell: {
    textAlign: "left",
  },
  rightCellContaier: {
    flex: 0.3,
    textAlign: "center",
  },
  rightCell: {
    // textAlign: "center",
  },
});
