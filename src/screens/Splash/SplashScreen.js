import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Image } from "react-native";
import LogoZebra from "../../assets/images/zebra_logo.png";
import { SCREENS } from "../../util/constants/Constants";
import { styles } from "./SplashScreenStyles";
import http from "../../services/httpService";
const SplashScreen = ({ navigation }) => {
  const redirectToTermsPage = () => {
    navigation.navigate("TermsAndConditions");
  };

  const redirectToDashboardPage = () => {
    AsyncStorage.getItem("baseURL").then(baseURL => {
      setTimeout(() => {
        if (baseURL) {
          http.setBaseUrl(baseURL);
          navigation.replace(SCREENS.SECURE_ROUTE);
        } else
          navigation.replace(SCREENS.SECURE_ROUTE, {
            screen: SCREENS.QR_CODE_SCANNER,
            showConfirmation:false
          });
      }, 2000);
    });
    // navigation.replace(SCREENS.SECURE_ROUTE);
  };
  const checkLoggedin = () => {
    AsyncStorage.getItem("token").then(result => {
      if (result) {
        AsyncStorage.getItem("disclaimer_status").then(disclaimer_status => {
          if (disclaimer_status && disclaimer_status === "1") {
            redirectToDashboardPage();
          } else {
            setTimeout(() => {
              redirectToTermsPage();
            }, 2000);
          }
        });
      } else {
        AsyncStorage.getItem("baseURL").then(baseURL => {
          setTimeout(() => {
            if (baseURL) {
              http.setBaseUrl(baseURL);
              navigation.replace(SCREENS.UNSECURE_ROUTE);
            } else
              navigation.replace(SCREENS.UNSECURE_ROUTE, {
                screen: SCREENS.QR_CODE_SCANNER,
                showConfirmation:false
              });
          }, 2000);
        });
      }
    });
  };

  /**
   * Move to login screen after 4 seconds.
   */
  useEffect(() => {
    checkLoggedin();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={LogoZebra} style={styles.image} />
    </View>
  );
};

export default SplashScreen;
