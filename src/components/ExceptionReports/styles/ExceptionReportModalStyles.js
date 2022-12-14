import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        margin: 0,
        width: "85%",
        justifyContent: "center",
        alignSelf: "center",
    },
    listContainer: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 5,
    },
    itemText: { paddingVertical: 3, fontSize: 15,textAlign:"left",paddingHorizontal:3 },
    flexRow: { flexDirection: "row" },
    itemTitle: { width: "50%", borderWidth: 0.5, borderColor: "black", paddingLeft: 2}
});
