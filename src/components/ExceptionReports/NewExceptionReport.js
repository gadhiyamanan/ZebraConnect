import React, { Component } from "react"
import { View, SafeAreaView, Text, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { CheckBox } from "react-native-elements"
import { ScrollView } from "react-native-gesture-handler"
import { Button, withTheme } from "react-native-paper"
import { FontAwesome } from "@expo/vector-icons"
import CustomInput from "../CustomInput/CustomInput"
import DropDown from "../DropDown/DropDown"
import { styles } from "./styles/NewExceptionReportStyles"
import authService from "../../services/authService"
import apiHelper from "../../screens/apiHelper"
import httpService from "../../services/httpService"
import { showMessage } from "react-native-flash-message"

class NewExceptionReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colors: props.theme.colors,
            checkBoxChecked: false,
            exceptionType: "",
            planner: "",
            date: "",
            supervisor: "",
            workArea: "",
            consultantInCharge: "",
            extraWorkHour: "",
            remarks: "",
            actionTaken: "",
            RadioButtonValue: "",
            loggedInUser: {},
            plannerDropDownData: [],
            supervisorDropDownData: [],
            shiftDateDropDownData: [],
            workAreaDropDownData: [],
            isLoading: false,
        }
        this.exceptionTypeData = [
            { label: "Worked Extra Hours", value: "Worked Extra Hours" },
            { label: "Variance to Rota", value: "Variance to Rota" },
            { label: "Rest at Work", value: "Rest at Work" },
            { label: "Time Off", value: "Time Off" },
            { label: "Educational Opportunities", value: "Educational Opportunities" }
        ]
        this.dropDownItems = [
            { label: "USA", value: "usa" },
            { label: "UK", value: "uk" },
            { label: "France", value: "france" }
        ]
    }

    componentDidMount() {
        authService.getCurrentUser().then((user) => {
            this.setState({ loggedInUser: user }, () => this.fetchData())
        })
    }

    showFlashMessage = (message) => {
        showMessage({
            message: message,
            type: "default",
            backgroundColor: "gray", // background color
            color: "#ffffff" // text color
        })
    }

    fetchData() {
        httpService
            .get(
                apiHelper.getExceptionPlannerList + `/` + this.state.loggedInUser.emp_id
            )
            .then((result) => {
                this.setState({ plannerDropDownData: result.data })
            })
            .catch((error) => {
                console.error(error)
            })
        httpService
            .get(
                apiHelper.getExceptionSupervisorList +
                `/` +
                this.state.loggedInUser.emp_id
            )
            .then((result) => {
                this.setState({ supervisorDropDownData: result.data })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    getExceptionShiftDate(planner) {
        httpService
            .get(
                apiHelper.getExceptionShiftDate +
                `/` +
                this.state.loggedInUser.emp_id +
                "/" +
                planner
            )
            .then((result) => {
                this.setState({ shiftDateDropDownData: result.data })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    getExceptionLocationWorkArea() {
        if (this.state.planner && this.state.date)
            httpService
                .get(
                    apiHelper.getExceptionLocationWorkarea +
                    `/` +
                    this.state.loggedInUser.emp_id +
                    "/" +
                    this.state.planner +
                    "/" +
                    this.state.date
                )
                .then((result) => {
                    this.setState({ workAreaDropDownData: result.data })
                })
                .catch((error) => {
                    console.error(error)
                })
    }

    onSubmit() {
        const { checkBoxChecked,
            exceptionType,
            planner,
            date,
            supervisor,
            workArea,
            consultantInCharge,
            extraWorkHour,
            remarks,
            actionTaken,
            RadioButtonValue, loggedInUser } = this.state

        const { navigation, route } = this.props
        if (!exceptionType) return this.showFlashMessage(`Please select exception type`)
        if (!planner) return this.showFlashMessage(`Please select `)
        if (!date) return this.showFlashMessage(`Please select date`)
        if (!workArea) return this.showFlashMessage(`Please select work area`)
        if (!supervisor) return this.showFlashMessage(`Please select supervisor`)
        if (!remarks) return this.showFlashMessage(`Please Enter remarks`)
        if (!actionTaken) return this.showFlashMessage(`Please Enter action taken`)
        const formData = new URLSearchParams();
        this.setState({ isLoading: true })
        formData.append("exception_type", exceptionType);
        formData.append("workarea_id", workArea);
        formData.append("planner_id", planner);
        formData.append("supervisor", supervisor);
        formData.append("remarks", remarks);
        formData.append("actiontaken", actionTaken);
        formData.append("radAction", RadioButtonValue);
        formData.append("consultantCharge", consultantInCharge);
        formData.append("activeStatus", checkBoxChecked ? "1" : "0");
        formData.append("hours", exceptionType === "Worked Extra Hours" ? extraWorkHour : "");
        formData.append("empId", loggedInUser.emp_id);
        formData.append("shiftdt", date);

        httpService.post(
            apiHelper.addNewException,
            formData
        ).then((result) => { navigation.goBack(); this.showFlashMessage(result.data.message); this.setState({ isLoading: false }) }).catch(err => { this.showFlashMessage(err.message); this.setState({ isLoading: false }) })
    }


    render() {
        const {
            colors,
            checkBoxChecked,
            exceptionType,
            supervisor,
            planner,
            date,
            consultantInCharge,
            RadioButtonValue,
            remarks,
            actionTaken,
            workArea,
            plannerDropDownData,
            supervisorDropDownData,
            shiftDateDropDownData,
            workAreaDropDownData,
            extraWorkHour,
            isLoading
        } = this.state
        const keyboardVerticalOffset = Platform.OS === "ios" ? 70 : 50;
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <CheckBox
                            containerStyle={styles.checkBoxContainer}
                            title={
                                "Where this is a patient safety issue please raise Ulysess/Datix/similar incident report and document in 'remarks' box that this has or will be completed."
                            }
                            checked={checkBoxChecked}
                            onPress={() => this.setState({ checkBoxChecked: !checkBoxChecked })}
                        />

                        <DropDown
                            items={this.exceptionTypeData}
                            onChangeItem={(value) => {
                                this.setState({ exceptionType: value.value })
                            }}
                            placeholder="Select Exception Type"
                            value={exceptionType}
                            zIndex={5000}
                        />
                        <DropDown
                            items={plannerDropDownData}
                            onChangeItem={(value) => {
                                this.setState({ planner: value.value }, () =>
                                    this.getExceptionLocationWorkArea()
                                )
                                this.getExceptionShiftDate(value.value)
                            }}
                            placeholder="Select Planner"
                            value={planner}
                            zIndex={4000}
                        />
                        <DropDown
                            items={shiftDateDropDownData}
                            onChangeItem={(value) => {
                                this.setState({ date: value.value }, () =>
                                    this.getExceptionLocationWorkArea()
                                )
                            }}
                            placeholder="Select Date"
                            value={date}
                            zIndex={3000}
                        />
                        {exceptionType === "Worked Extra Hours" && (
                            <CustomInput
                                keyboardType="decimal-pad"
                                placeholder={"Hours(e.g 2.50 = 2 hours 30 minutes )"}
                                value={extraWorkHour}
                                isEditable
                                onChangeText={(value) => this.setState({ extraWorkHour: value })}
                            />
                        )}

                        <DropDown
                            items={workAreaDropDownData}
                            onChangeItem={(value) => {
                                this.setState({ workArea: value.value })
                            }}
                            placeholder="Select Work Area"
                            value={workArea}
                            zIndex={2000}
                        />
                        <DropDown
                            items={supervisorDropDownData}
                            onChangeItem={(value) => {
                                this.setState({ supervisor: value.value })
                            }}
                            placeholder="Select Working Time Supervisor"
                            value={supervisor}
                            zIndex={1000}
                        />
                        <CustomInput
                            multiple
                            placeholder={"Consultant in charge"}
                            value={consultantInCharge}
                            isEditable
                            onChangeText={(value) =>
                                this.setState({ consultantInCharge: value })
                            }
                        />

                        <TouchableOpacity
                            style={styles.radioButtonTouchContainer}
                            onPress={() =>
                                this.setState({ RadioButtonValue: "P" })
                            }
                        >
                            <View style={styles.radioButtonContainer}>
                                {RadioButtonValue == "P" && (
                                    <View style={styles.checkedRadioButton} />
                                )}
                            </View>
                            <Text>Pay for additional hours</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.radioButtonTouchContainer}
                            onPress={() => this.setState({ RadioButtonValue: "T" })}
                        >
                            <View style={styles.radioButtonContainer}>
                                {RadioButtonValue == "T" && (
                                    <View style={styles.checkedRadioButton} />
                                )}
                            </View>
                            <Text>Time Off Lieu</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.radioButtonTouchContainer}
                            onPress={() =>
                                this.setState({ RadioButtonValue: "N" })
                            }
                        >
                            <View style={styles.radioButtonContainer}>
                                {RadioButtonValue == "N" && (
                                    <View style={styles.checkedRadioButton} />
                                )}
                            </View>
                            <Text>No Action Required</Text>
                        </TouchableOpacity>

                        <CustomInput
                            multiple
                            placeholder={"Remarks"}
                            value={remarks}
                            isEditable
                            onChangeText={(value) => this.setState({ remarks: value })}
                        />
                        <CustomInput
                            multiple
                            placeholder={"Action Taken"}
                            value={actionTaken}
                            isEditable
                            onChangeText={(value) => this.setState({ actionTaken: value })}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                style={{
                                    backgroundColor: colors.accent,
                                    marginRight: 10
                                }}
                                uppercase={false}
                                onPress={() => this.onSubmit()}
                                mode="contained"
                                icon={() => (
                                    <FontAwesome
                                        name="check"
                                        size={25}
                                        color={colors.surface}
                                        title="View Members"
                                    />
                                )}
                                loading={isLoading}
                                labelStyle={styles.buttonText}
                            >
                                Submit
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: colors.accent,
                                    marginLeft: 10
                                }}
                                uppercase={false}
                                mode="contained"
                                onPress={() => this.props.navigation.goBack()}
                                labelStyle={styles.buttonText}
                            >
                                Cancel
                            </Button>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

export default withTheme(NewExceptionReport)
