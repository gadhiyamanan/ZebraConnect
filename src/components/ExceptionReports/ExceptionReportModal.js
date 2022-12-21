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
    data = {}
}) {
    const theme = useTheme();
    const colors = theme.colors;
    const Data = [
        { title: "Exception Type", value: "type_of_exception_hour" },
        { title: "Shift", value: "shift" },
        { title: "Work Area", value: "workarea" },
        { title: "Supervisor", value: "supervisor_name" },
        { title: "Remark", value: "remark" },
        { title: "Status", value: "status" },
        { title: "Approver Remark", value: "approver_remark" },
    ]
    const listRenderItem = ({ item }) => 
        data? (
            <View style={[styles.flexRow]}>
                <View style={styles.itemTitle}>
                    <Text style={styles.itemText}>{item.title}</Text>
                </View>
                <View style={styles.itemTitle}>
                    <Text style={styles.itemText}>{data[item.value]}</Text>
                </View>

            </View>
        ):<></>
    
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

                    data={Data || []}
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
