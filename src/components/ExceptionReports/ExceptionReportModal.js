import React from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { View, Text, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import { styles } from "./styles/ExceptionReportModalStyles"
import { Entypo } from "@expo/vector-icons"
import { useTheme } from "react-native-paper";

export default function ExceptionReportModal({
    onRequestClose,
    isVisible,
    data
}) {
    const theme = useTheme();
    const colors = theme.colors;
    const Data = [
        { title: "#", value: "25%" },
        { title: "Work Area", value: "30%" },
        { title: "Shift", value: "35%" },
        { title: "Type Of Exception", value: 150 },
        { title: "Work Review", value: 70 },
        { title: "Remarks", value: 90 },
        { title: "Supervisor", value: 90 },
        { title: "Status", value: 80 }
    ]
    const listRenderItem = ({ item }) => (
        <View style={[styles.flexRow]}>
            <View style={styles.itemTitle}>
                <Text style={styles.itemText}> {item.title}</Text>
            </View>
            <View style={styles.itemTitle}>
                <Text style={styles.itemText}> {item.value}</Text>
            </View>

        </View>
    )
    const listHeaderComponent = ({ item }) => (
        <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 15 }} onPress={onRequestClose}>
            <Entypo
                name="squared-cross"
                size={35}
                color={colors.accent}
                title="View Members"
            />
        </TouchableOpacity>
    )
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onRequestClose}
            useNativeDriver
            style={styles.container}
        >
            <View style={styles.listContainer}>

                <FlatList
                    bounces={false}

                    data={Data}
                    ListHeaderComponent={listHeaderComponent}
                    key={(__, index) => String(index)}
                    showsHorizontalScrollIndicator={false}
                    renderItem={listRenderItem}
                    keyExtractor={(__, index) => String(index)}
                />
            </View>
        </Modal>
    )
}
