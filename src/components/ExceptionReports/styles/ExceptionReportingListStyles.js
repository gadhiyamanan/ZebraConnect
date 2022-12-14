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
    scrollContainer: { marginHorizontal: 5 },
    mt15:{marginTop:15},
    itemContainer: { borderWidth: 0.5, borderColor: "lightgray", paddingVertical: 5, paddingHorizontal: 3 },
    itemHeaderContainer: { borderWidth: 0.5, borderColor: "lightgray",paddingHorizontal: 3 , paddingVertical: 5, backgroundColor: "lightgray" },
    flexRow: { flexDirection: 'row' },
    itemText: { fontSize: 14, },
    activityIndicator: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    hyperLink: {
        color: "blue",
        textDecorationLine: "underline",
    },
    mv10: { marginVertical: 10 }
});
