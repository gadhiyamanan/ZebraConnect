import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Alert, TextInput } from "react-native";
import { styles } from "./QrCodeScannerStyles";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { Card } from "react-native-elements";
import { useTheme, Button } from "react-native-paper";
import http from "../../services/httpService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "../../services/authService";
import { CommonActions } from "@react-navigation/native";
import { SCREENS } from "../../util/constants/Constants";
import CustomInput from "../../components/CustomInput/CustomInput";
import { showMessage } from "react-native-flash-message";
import httpService from "../../services/httpService";
import apiHelper from "../apiHelper";

export function QrCodeScanner({ navigation, route }) {
  const theme = useTheme();
  const oldTrustName = route?.params?.oldTrustName;
  const showConfirmation = route?.params?.showConfirmation;
  const [hasPermission, setHasPermission] = useState(null);
  const [trustName, setTrustName] = useState(oldTrustName || "");
  const [showCamera, setShowCamera] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [url, setUrl] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const colors = theme.colors;
  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(str);
  }

  useEffect(() => {
    AsyncStorage.getItem("trustCode").then(data => {
      if (data) {
        setCode(data);
        AsyncStorage.getItem("baseURL").then(baseURLData => {
          if (baseURLData) {
            setBaseUrl(baseURLData);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (showCamera)
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
  }, [showCamera]);

  const handleBarCodeScanned = ({ type, data }) => {
    const splitData = data.split("|");
    if (splitData.length >= 2 && validURL(splitData[0].trim())) {
      setTrustName(splitData[1].trim());
      setShowCamera(false);
      setUrl(splitData[0].trim());
      setShowButton(true);
    }
  };

  const showErrorMessage = () => {
    showMessage({
      message: "Something went wrong please try again later!",
      type: "success",
      backgroundColor: "gray", // background color
      color: "#ffffff", // text color
    });
  };

  const onLogin = () => {
    setData();
    // if (oldTrustName) {
    //   Alert.alert(
    //     "Are you sure ?",
    //     `You want to switch from ${oldTrustName} to ${trustName}`,
    //     [
    //       {
    //         text: "Yes",
    //         onPress: logOut,
    //         style: "cancel",
    //       },
    //       {
    //         text: "No",
    //         onPress: () => {},
    //       },
    //     ],
    //     { cancelable: false }
    //   );
    // } else {
    //   setData();
    // }
  };

  const logOut = () => {
    auth.removeToken();
    setTimeout(() => {
      auth.logout();
      setData();
    }, 1000);
  };
  const setData = async () => {
    setLoading(true);

    httpService
      .post(`${apiHelper.getTrustCode}`, { trustCode: code })
      .then(response => {
        const data = response?.data;
        console.log("data", data);
        if (data) {
          setUrl(data?.base_url);
          setTrustName(data?.trust_name);
          setWebUrl(data?.base_web_url);
          setCode(code);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err, `${apiHelper.getTrustCode}?trustCode=${code}`);
        showErrorMessage();
        setLoading(false);
      });
  };

  const askPermission = () => {
    if (oldTrustName) {
      Alert.alert(
        "Are you sure ?",
        `You want to switch from ${oldTrustName} to ${trustName}`,
        [
          {
            text: "Yes",
            onPress: onConfirm,
            style: "cancel",
          },
          {
            text: "No",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
    }
  };

  const onConfirm = () => {
    AsyncStorage.setItem("trustName", trustName);
    AsyncStorage.setItem("trustCode", code);
    AsyncStorage.setItem("baseURL", url);
    AsyncStorage.setItem("webUrl", webUrl);
    console.log(webUrl);

    http.setBaseUrl(url);
    if (!oldTrustName) navigation.replace("Login");
    else {
      const resetAction = CommonActions.reset({
        index: 1,
        routes: [{ name: SCREENS.UNSECURE_ROUTE }],
      });
      navigation.dispatch(resetAction);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* <StatusBar translucent={false} backgroundColor={"#ffffff"} /> */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Zebra Connect</Text>
      </View>
      <>
        <Card>
          <Text style={styles.subTitle}>
            {!oldTrustName &&
              `Your device is not linked with Trust’s Rostering System.`}
            {/* Scan Trust’s QR code from the Rostering Portal */}
          </Text>
          <TextInput
            style={styles.input}
            value={code}
            isEditable
            onChangeText={setCode}
            placeholder="Enter NHS Trust Code"
          />

          {code !== "" && (
            <Button
              loading={loading}
              disabled={loading}
              style={[
                styles.button,
                {
                  backgroundColor: theme.colors.accent,
                  marginHorizontal: 15,
                  marginTop: 15,
                },
              ]}
              uppercase={false}
              mode="contained"
              onPress={onLogin}
            >
              Submit
            </Button>
          )}

          {/* {showCamera ? (
            hasPermission ? (
              <Camera
                onBarCodeScanned={handleBarCodeScanned}
                style={styles.camera}
              />
            ) : (
              <View
                style={[
                  styles.noCameraAccessContainer,
                  { borderColor: colors.accent },
                ]}
              >
                <Text>No access to camera</Text>
              </View>
            )
          ) : (
            <Button
              style={[
                styles.button,
                {
                  backgroundColor: colors.accent,
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                },
              ]}
              uppercase={false}
              mode="contained"
              onPress={() => setShowCamera(true)}
            >
              Scan QR Code
            </Button>
          )} */}
          {/* <Text style={styles.subTitle}>
            *login to web portal and scan the QR code from “Your profile” page
          </Text> */}
        </Card>
        <Card>
          <Text style={[styles.subTitle, { fontWeight: "bold" }]}>
            TRUST –{" "}
            <Text style={{ color: trustName ? colors.accent : "red" }}>
              {trustName || `(NOT LINKED)`}
            </Text>
          </Text>
        </Card>
      </>
      {trustName !== "" && (
        <Button
          style={[
            styles.button,
            {
              backgroundColor: theme.colors.accent,
              marginHorizontal: 15,
              marginTop: 15,
            },
          ]}
          uppercase={false}
          mode="contained"
          onPress={oldTrustName && showConfirmation ? askPermission : onConfirm}
        >
          Confirm({trustName})
        </Button>
      )}
    </SafeAreaView>
  );
}

export default QrCodeScanner;
