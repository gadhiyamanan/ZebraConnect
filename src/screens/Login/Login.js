import React, { Component } from "react";
import { Card } from "react-native-elements";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { FontAwesome } from "@expo/vector-icons";
import Footer from "../../components/Footer/Footer";
import auth from "../../services/authService";
import { ERROR, SCREENS } from "../../util/constants/Constants";
import { styles } from "./LoginScreenStyles";
import { withTheme, Button, Title, Card as PCard } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: null,
      userName: "",
      password: "",
      loggedInUser: {},
      colors: props.theme.colors,
      trustName: "",
    };
  }

  redirectUser = () => {
    const { navigation } = this.props;
    navigation.navigate(SCREENS.TERMS_AND_CONDITIONS);
  };

  /**
   *
   * @param {*} logIn
   * @param {*} user
   */
  handleLogin = (logIn, user) => {
    const { navigation } = this.props;
    this.handleLoader(false);
    if (logIn.status === 200 && user.disclaimer_status === "1") {
      AsyncStorage.setItem("disclaimer_status", "1");
      navigation.replace(SCREENS.SECURE_ROUTE);
    } else if (logIn.status === 200 && user.disclaimer_status === "0") {
      AsyncStorage.setItem("disclaimer_status", "0");
      navigation.navigate(SCREENS.TERMS_AND_CONDITIONS);
    } else {
      Alert.alert(
        ERROR.INVALID_USERNAME_PASSWORD,
        "",
        [
          {
            text: "Ok",
            style: "cancel",
          },
          { text: "Cancel" },
        ],
        { cancelable: false }
      );
    }
  };

  componentDidMount() {
    AsyncStorage.getItem("trustName").then(trustName => {
      if (trustName) this.setState({ trustName: trustName });
    });
  }

  handleLoader = isLoadingValue => {
    this.setState({
      isLoading: isLoadingValue,
    });
  };

  authenticateUser = async () => {
    try {
      const { userName, password } = this.state;
      if (userName && password) {
        this.handleLoader(true);
        const logIn = await auth.login(userName, password);
        const user = await auth.getCurrentUser();
        this.handleLogin(logIn, user);
      } else {
        this.showEnterRequiredFieldsFlashMessage();
      }
    } catch (error) {
      this.handleLoader(false);
      this.resetStates();
      this.showLoginFailedFlashMessage();
    }
  };

  resetStates = () => {
    this.setState({
      userName: "",
      password: "",
      loggedInUser: "",
    });
  };

  showLoginFailedFlashMessage = () => {
    showMessage({
      message: "Login Failed!",
      description: "Invalid Username/Password",
      type: "default",
      backgroundColor: "gray", // background color
      color: "#ffffff", // text color
    });
  };

  showEnterRequiredFieldsFlashMessage = () => {
    showMessage({
      message: "Please enter required fields!",
      type: "default",
      backgroundColor: "gray", // background color
      color: "#ffffff", // text color
    });
  };

  userNameHandler = value => {
    this.setState({ userName: value });
  };

  passwordHandler = value => {
    this.setState({ password: value });
  };

  getNotificationToken = async () => {
    return token;
  };

  render() {
    const { userName, password, isLoading, colors, trustName } = this.state;
    const { navigation, theme } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scrollviewContainer,
            { backgroundColor: colors.background },
          ]}
          style={styles.scrollview}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Zebra Connect</Text>
          </View>
          <Card>
            <TextInput
              style={styles.input}
              placeholder="User Name"
              onChangeText={this.userNameHandler}
              keyboardType="email-address"
              value={userName}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={this.passwordHandler}
              value={password}
              type="password"
              secureTextEntry={true}
            />
            <View style={styles.loginButtonContainer}>
              <Button
                style={[styles.button, { backgroundColor: colors.accent }]}
                loading={isLoading}
                uppercase={false}
                mode="contained"
                onPress={this.authenticateUser}
              >
                Login
              </Button>
            </View>
          </Card>
          <PCard
            style={styles.reScanCodeContainer}
            onPress={() => {
              navigation.navigate(SCREENS.QR_CODE_SCANNER, {
                oldTrustName: trustName,
                showConfirmation:false
              });
            }}
          >
            <PCard.Content style={styles.cardContent}>
              <FontAwesome
                name="qrcode"
                size={20}
                style={styles.qrCode}
                color={theme.colors.accent}
              />
              <Title style={{ color: theme.colors.secondaryText }}>
                Re-enter Trust code
              </Title>
            </PCard.Content>
          </PCard>
          <View style={styles.footerContainer}>
            <View style={styles.trustNameContainer}>
              <Text style={styles.trustName}>{trustName}</Text>
            </View>
            <View style={styles.footerContainer}>
              <Footer />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withTheme(Login);
