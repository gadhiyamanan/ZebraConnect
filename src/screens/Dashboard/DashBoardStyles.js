import { StyleSheet } from "react-native";
import { windowWidth } from "../../util/util";

export const styles = StyleSheet.create({
  leftLabelContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoRowContainer: { flexDirection: "row", alignItems: "center" },
  centerText: { alignSelf: "center", fontWeight: "600", fontSize: 14 },
  centerDivider: { justifyContent: "center" },
  nameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  shiftRowContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    width: "100%",
  },
  icon: {
    width: 30,
    height: 30,
  },
  cardContainer: {
    flex: 1,
    width: "100%",
  },
  card: {
    marginBottom: 4,
    width:(windowWidth/2)-4,
    marginHorizontal: 2,
  },
  cardContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    alignSelf: "center",
    fontSize: 14,
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: "column",
  },
  usernameContainer: {
    paddingVertical: 16,
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  name: {
    color: "#061f5d",
  },
  nextShift: {
    fontWeight: "600",
    marginVertical: 10,
  },
  shift: {
    color: "#061f5d",
    paddingRight: 5,
  },
  pipe: {
    paddingVertical: 10,
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#95c5d0",
    fontSize: 12,
  },
  locationContainer: {
    alignContent: "center",
    fontWeight: "bold",
    padding: 10,
    textAlignVertical: "center",
  },
  location: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 14,
    color: "gray",
    textAlignVertical: "center",
  },
  currentDateContainer: {
    alignContent: "center",
    textAlignVertical: "center",
  },
  currentDate: {
    fontSize: 14,
    padding: 10,
    // textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "#95c5d0",
    // marginLeft: 20,
  },
});
