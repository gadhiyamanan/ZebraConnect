import React, { Component } from "react"
import {
    View,
    SafeAreaView,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Button, withTheme } from "react-native-paper"
import { SCREENS } from "../../util/constants/Constants"
import { styles } from "./styles/ExceptionReportingListStyles"
import { FontAwesome } from "@expo/vector-icons"
import ExceptionReportModal from "./ExceptionReportModal"

class ExceptionReportingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colors: props.theme.colors,
            showExceptionReport: false
        }
        this.headerData = [
            { title: "#", width: "25%" },
            { title: "Work Area", width: "30%" },
            { title: "Shift", width: "35%" }
            // { title: "Type Of Exception", width: 150 },
            // { title: "Work Review", width: 70 },
            // { title: "Remarks", width: 90 },
            // { title: "Supervisor", width: 90 },
            // { title: "Status", width: 80 }
        ]
    }

    listHeaderComponent = () => (
        <View style={styles.flexRow}>
            {this.headerData.map((item, index) => (
                <View
                    style={[
                        styles.itemContainer,
                        { width: this.headerData[index].width }
                    ]}
                    key={String(item.title)}
                >
                    <Text style={styles.itemText}>{item.title}</Text>
                </View>
            ))}
        </View>
    )
    listRenderItem = () => (
        <View style={styles.flexRow}>
            {this.headerData.map((item, index) => (
                <View
                    style={[
                        styles.itemContainer,
                        { width: this.headerData[index].width }
                    ]}
                    key={String(item.title)}
                >
                    <Text style={styles.itemText}>{item.title}</Text>
                </View>
            ))}
            <TouchableOpacity
                style={[styles.itemContainer, { flex: 1 }]}
                onPress={() => this.setState({ showExceptionReport: true })}
            >
                <FontAwesome
                    name="eye"
                    size={20}
                    color={this.state.colors.accent}
                    title="View Members"
                />
            </TouchableOpacity>
        </View>
    )

    render() {
        const { colors, showExceptionReport } = this.state
        return (
            <>
                <SafeAreaView style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={[styles.openButton, { backgroundColor: colors.accent }]}
                            uppercase={false}
                            mode="contained"
                            icon="plus"
                            onPress={() =>
                                this.props.navigation.navigate(SCREENS.NEW_EXCEPTION_REPORT)
                            }
                            contentStyle={styles.buttonContainerStyle}
                        >
                            Report New Exception
                        </Button>
                    </View>
                    {/* <ScrollView contentContainerStyle={styles.scrollContainer} style={{ marginTop: 15, }}> */}
                    {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {["1"].map((item, index) => ( */}
                    <FlatList
                        contentContainerStyle={styles.scrollContainer}
                        style={styles.scrollStyle}
                        data={[
                            "1",
                            "2",
                            "1",
                            "2",
                            "1",
                            "2",
                            "1",
                            "2",
                            "1",
                            "2",
                            "1",
                            "2",
                            "1",
                            "2",
                            "1",
                            "2",
                            "1",
                            "2",
                            "1",
                            "2",
                            "1",
                            "2",
                            "1",
                            "2",
                            "1",
                            "2"
                        ]}
                        key={(__, index) => String(index)}
                        showsHorizontalScrollIndicator={false}
                        renderItem={this.listRenderItem}
                        ListHeaderComponent={this.listHeaderComponent}
                        keyExtractor={(__, index) => String(index)}
                    />
                    {/* ))}
                    </ScrollView> */}
                    {/* </ScrollView> */}
                </SafeAreaView>
                <ExceptionReportModal
                    isVisible={showExceptionReport}
                    onRequestClose={() => this.setState({ showExceptionReport: false })}
                />
            </>
        )
    }
}

export default withTheme(ExceptionReportingList)
