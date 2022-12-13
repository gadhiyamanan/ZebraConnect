import React, { Component } from "react"
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native"
import { CheckBox } from "react-native-elements"
import { ScrollView } from "react-native-gesture-handler"
import { Button, withTheme } from "react-native-paper"
import { FontAwesome } from "@expo/vector-icons"
import CustomInput from "../CustomInput/CustomInput"
import DropDown from "../DropDown/DropDown"
import { styles } from "./styles/NewExceptionReportStyles"

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
            consultantInCharge: "",
            remarks: "",
            actionTaken: "",
            RadioButtonValue: ""
        }
        this.dropDownItems = [{ label: 'USA', value: 'usa' },
        { label: 'UK', value: 'uk' },
        { label: 'France', value: 'france', }]
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
            actionTaken
        } = this.state

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <CheckBox
                        containerStyle={styles.checkBoxContainer}
                        title={
                            "Where this is a patient safety issue please raise Ulysess/Datix/similar incident report and document in 'remarks' box that this has or will be completed."
                        }
                        checked={checkBoxChecked}
                        onPress={() => this.setState({ checkBoxChecked: !checkBoxChecked })}
                    />

                    <DropDown
                        items={this.dropDownItems}
                        onChangeItem={(value) => {
                            this.setState({ exceptionType: value.value })
                        }}
                        placeholder="Select Exception Type"
                        value={exceptionType}
                        zIndex={5000}
                    />
                    <DropDown
                        items={this.dropDownItems}
                        onChangeItem={(value) => {
                            this.setState({ planner: value.value })
                        }}
                        placeholder="Select Planner"
                        value={planner}
                        zIndex={4000}
                    />
                    <DropDown
                        items={this.dropDownItems}
                        onChangeItem={(value) => {
                            this.setState({ date: value.value })
                        }}
                        placeholder="Select Date"
                        value={date}
                        zIndex={3000}
                    />
                    <DropDown
                        items={this.dropDownItems}
                        onChangeItem={(value) => {
                            this.setState({ supervisor: value.value })
                        }}
                        placeholder="Select Working Time Supervisor"
                        value={supervisor}
                        zIndex={2000}
                    />
                    <CustomInput
                        multiple
                        placeholder={"Consultant in charge"}
                        value={consultantInCharge}
                        isEditable
                        onChangeText={(value) =>
                            this.setState({ consultantInCharge: value.value })
                        }
                    />

                    <TouchableOpacity
                        style={styles.radioButtonTouchContainer}
                        onPress={() =>
                            this.setState({ RadioButtonValue: "Pay for additional hours" })
                        }
                    >
                        <View style={styles.radioButtonContainer}>
                            {RadioButtonValue == "Pay for additional hours" && (
                                <View style={styles.checkedRadioButton} />
                            )}
                        </View>
                        <Text>Pay for additional hours</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.radioButtonTouchContainer}
                        onPress={() => this.setState({ RadioButtonValue: "Time Off Lieu" })}
                    >
                        <View style={styles.radioButtonContainer}>
                            {RadioButtonValue == "Time Off Lieu" && (
                                <View style={styles.checkedRadioButton} />
                            )}
                        </View>
                        <Text>Time Off Lieu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.radioButtonTouchContainer}
                        onPress={() =>
                            this.setState({ RadioButtonValue: "No Action Required" })
                        }
                    >
                        <View style={styles.radioButtonContainer}>
                            {RadioButtonValue == "No Action Required" && (
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
                            mode="contained"
                            onPress={null}
                            icon={() => (
                                <FontAwesome
                                    name="check"
                                    size={25}
                                    color={colors.surface}
                                    title="View Members"
                                />
                            )}
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
        )
    }
}

export default withTheme(NewExceptionReport)
