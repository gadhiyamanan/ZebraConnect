import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 15,
        marginTop: 10,
        borderTopWidth: 0,
    },
    openButton: {
        backgroundColor: "#a6cfd8",
        borderRadius: 5,
        paddingVertical: 2,
        elevation: 2,
        marginLeft: 40,
        alignItems: "center",
    },
    buttonContainerStyle: {
        flexDirection: 'row-reverse'
    },
    scrollContainer: { marginHorizontal: 5, marginBottom: 25 },
    scrollStyle: { marginTop: 15 },
    itemContainer: { borderWidth: 0.5, borderColor: "gray", alignItems: "center", paddingVertical: 5 },
    flexRow: { flexDirection: 'row' },
    itemText: { fontSize: 14 }
});
