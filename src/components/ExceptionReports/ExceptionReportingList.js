import React, { Component } from "react"
import {
    View,
    SafeAreaView,
    FlatList,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl
} from "react-native"
import { Button, withTheme } from "react-native-paper"
import { LOADER_COLOR, SCREENS } from "../../util/constants/Constants"
import { styles } from "./styles/ExceptionReportingListStyles"
import ExceptionReportModal from "./ExceptionReportModal"
import apiHelper from "../../screens/apiHelper"
import authService from "../../services/authService"
import httpService from "../../services/httpService"

class ExceptionReportingList extends Component {
    constructor(props) {
        super(props)
            ; (this.state = {
                colors: props.theme.colors,
                exceptionReport: null,
                isLoading: true,
                exceptionListData: [],
                refreshing: false,
                hasMoreData: false
            }),
                (this.headerData = [
                    { title: "#", width: "8%" },
                    { title: "Workarea/location", width: "35%" },
                    { title: "Date / Shift", width: "30%" },
                    { title: "Exception", width: "27%" }
                ])
            ; (this.limit = 25), (this.loggedInUser = {})
        this.focusListener = null
    }
    componentDidMount() {
        const { navigation } = this.props
        authService.getCurrentUser().then((user) => {
            this.loggedInUser = user
            this.fetchData()
            this.focusListener = this.props.navigation.addListener("focus", () =>
                this.fetchData(true)
            )
        })
    }
    componentWillUnmount() {
        this.focusListener && this.focusListener()
    }
    fetchData(refresh) {
        httpService
            .get(
                apiHelper.exceptionList +
                `/` +
                this.loggedInUser?.emp_id +
                `/` +
                `${refresh ? 0 : this.state.exceptionListData.length}` +
                `/` +
                this.limit
            )
            .then((result) => {
                this.setState(
                    {
                        exceptionListData: refresh
                            ? result.data
                            : [...this.state.exceptionListData, ...result.data],
                        isLoading: false
                    },
                    () => {
                        this.state.exceptionListData.length
                            ? Number(this.state.exceptionListData[0].total_record) !==
                                this.state.exceptionListData.length
                                ? this.setState({ hasMoreData: true })
                                : this.setState({ hasMoreData: false })
                            : null
                    }
                )
            })
            .catch((error) => {
                console.error(error)
            })
    }

    onEndReached() {
        const { exceptionListData } = this.state

        if (
            exceptionListData.length
                ? exceptionListData[0].total_record != exceptionListData.length
                : false
        ) {
            this.fetchData()
        }
    }

    listHeaderComponent = () => (
        <View style={[styles.flexRow,styles.scrollContainer,styles.mt15]}>
            {this.headerData.map((item, index) => (
                <View
                    style={[
                        styles.itemHeaderContainer,
                        { width: this.headerData[index].width },
                        ,{backgroundColor:this.state.colors.accent}
                    ]}
                    key={String(item.title)}
                >
                    <Text style={[styles.itemText,{color:"white",fontWeight:"bold"}]}>{item.title}</Text>
                </View>
            ))}
        </View>
    )

    listRenderItem = ({ item, index }) => {
        return (
            <View style={styles.flexRow}>
                {this.headerData.map((headerIem, headerDataIndex) => (
                    <TouchableOpacity
                        disabled={headerDataIndex !== 3}
                        style={[
                            styles.itemContainer,
                            { width: this.headerData[headerDataIndex].width }
                        ]}
                        key={String(headerIem.title)}
                        onPress={() => this.setState({ exceptionReport: item })}
                    >
                        <Text
                            style={[
                                styles.itemText,
                                headerDataIndex === 3 && styles.hyperLink
                            ]}
                        >
                            {headerDataIndex === 0
                                ? index+1
                                : headerDataIndex === 1
                                    ? `${item.workarea}`
                                    : headerDataIndex === 2
                                        ? `${item.shift}`
                                        : `${item.type_of_exception}`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    listFooterComponent = () =>
        this.state.hasMoreData ? (
            <ActivityIndicator
                style={[styles.activityIndicator, styles.mv10]}
                size="large"
                color={LOADER_COLOR.COLOR}
            />
        ) : (
            <></>
        )

    render() {
        const {
            colors,
            exceptionListData,
            isLoading,
            refreshing,
            exceptionReport
        } = this.state

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
                                this.props.navigation.navigate(SCREENS.NEW_EXCEPTION_REPORT,)
                            }
                            contentStyle={styles.buttonContainerStyle}
                        >
                            Report New Exception
                        </Button>
                    </View>
                    {isLoading ? (
                        <ActivityIndicator
                            style={styles.activityIndicator}
                            size="large"
                            color={LOADER_COLOR.COLOR}
                        />
                    ) : (
                        <>{this.listHeaderComponent()}
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    colors={LOADER_COLOR.COLOR}
                                    refreshing={refreshing}
                                    onRefresh={async () => {
                                        this.setState({ refreshing: true })
                                        await this.fetchData(true)
                                        this.setState({ refreshing: false })
                                    }}
                                />
                            }
                            contentContainerStyle={styles.scrollContainer}
                            style={styles.scrollStyle}
                            data={exceptionListData}
                            key={(__, index) => String(index)}
                            showsHorizontalScrollIndicator={false}
                            renderItem={this.listRenderItem}
                            // listHeaderComponent={this.listHeaderComponent}
                            keyExtractor={(__, index) => String(index)}
                            onEndReached={() => this.onEndReached()}
                            ListFooterComponent={this.listFooterComponent}
                        />
                        </>
                    )}
                </SafeAreaView>
                <ExceptionReportModal
                    isVisible={!!exceptionReport}
                    onRequestClose={() => this.setState({ exceptionReport: null })}
                    data={exceptionReport}
                />
            </>
        )
    }
}

export default withTheme(ExceptionReportingList)
