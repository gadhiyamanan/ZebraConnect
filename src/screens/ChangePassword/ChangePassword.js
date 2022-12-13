import React, { useEffect, useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { styles } from "./ChangePasswordStyles";
import { useTheme, Button } from "react-native-paper";
import { Card } from "react-native-elements";
import { ERROR } from "../../util/constants/Constants";
import { showMessage } from "react-native-flash-message";
import auth from "../../services/authService";
import { useNavigation } from "@react-navigation/native";
import http from "../../services/httpService";
import { CommonActions } from "@react-navigation/native";
import { SCREENS } from "../../util/constants/Constants";
import apiHelper from "../apiHelper";

export default function ChangePassword() {
  let [empID, setEmpID] = useState("");

  let [oldPassword, setOldPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  let [isLoading, setIsLoading] = useState(false);
  let paperTheme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    auth
      .getCurrentUser()
      .then(user => {
        setEmpID(user.emp_id);
      })
      .catch();
  }, []);

  const oldlHandler = value => {
    setOldPassword(value);
  };
  

  const newPasswordHandler = value => {
    setNewPassword(value);
  };

  const confirmPasswordHandler = value => {
    setConfirmPassword(value);
  };

  const handleLoader = isLoadingValue => {
    setIsLoading(setIsLoading);
  };

  const changePasswordPressed = async () => {
    try {
      if (oldPassword && newPassword && confirmPassword) {
        if (newPassword.length < 8) {
          displayErrorMessage(ERROR.PASSWORD_LENGTH);
        } else if (newPassword !== confirmPassword) {
          displayErrorMessage(ERROR.PASSWORD_NOT_MATCH);
        } else {
          handleLoader(true);
          const formData = new URLSearchParams();
          formData.append("oldpassword", oldPassword);
          formData.append("newpassword", newPassword);
          formData.append("empid", empID);
          const changePassword = await http.post(
            apiHelper.employeeChangePassword,
            formData
          );
          handlePasswordChange(changePassword);
        }
      } else {
        displayErrorMessage(ERROR.ENTER_REQUIRED_FIELDS);
      }
    } catch (error) {
      displayErrorMessage(ERROR.SOMETHING_WENT_WRONG);
      
      handleLoader(false);
    }
  };

  const handlePasswordChange = response => {
    handleLoader(true);
    if (response.status === 200) {
      if (response.data.status === 200) {
        displaySuccessMessage(ERROR.PASSWORD_CHANGE_SUCCESS);
        auth.removeToken();
        setTimeout(() => {
        auth.logout();
        const resetAction = CommonActions.reset({
          index: 1,
          routes: [{ name: SCREENS.UNSECURE_ROUTE }],
        });
        navigation.dispatch(resetAction);
      }, 1000);
        
      } else {
        displayErrorMessage(response.data.message);
      }
    } else {
      
      displayErrorMessage(response.message);
    }
  };

  const displayErrorMessage = message => {
    showMessage({
      message: message,
      type: "default",
      backgroundColor: "gray", // background color
      color: "#ffffff", // text color
    });
  };

  const displaySuccessMessage = message => {
    showMessage({
      message: message,
      type: "success",
      color: "#ffffff", // text color
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: paperTheme.colors.background }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.scrollviewContainer,
          { backgroundColor: paperTheme.colors.background },
        ]}
        style={styles.scrollview}
      >
        <Card style={{ margin: 20 }}>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            onChangeText={oldlHandler}
            type="password"
            value={oldPassword}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            onChangeText={newPasswordHandler}
            value={newPassword}
            type="password"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={confirmPasswordHandler}
            value={confirmPassword}
            type="password"
            secureTextEntry={true}
          />
          <View style={styles.loginButtonContainer}>
            <Button
              style={[
                styles.button,
                { backgroundColor: paperTheme.colors.accent },
              ]}
              loading={isLoading}
              uppercase={false}
              mode="contained"
              onPress={changePasswordPressed}
            >
              Change Password
            </Button>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
