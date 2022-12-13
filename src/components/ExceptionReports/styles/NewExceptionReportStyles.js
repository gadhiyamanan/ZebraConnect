import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "white",
        paddingBottom: 15
    },
    checkBoxContainer: { backgroundColor: "white", borderWidth: 0 },
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
    radioButtonContainer: {
        height: 20,
        width: 20,
        padding: 3,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "black",
        marginRight: 5,
        marginLeft: 10
    },
    checkedRadioButton: { flex: 1, backgroundColor: "black", borderRadius: 50, },
    radioButtonTouchContainer: { flexDirection: "row", alignItems: "center", marginTop: 7 },
    buttonContainer: {
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        alignContent: "center",
        justifyContent: "center"
    },
});
