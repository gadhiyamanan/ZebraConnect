import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import auth from "../../services/authService";
import http from "../../services/httpService";
import apiHelper from "../apiHelper";
import TermsConditionsItems from "../../components/TermsConditions/TermsConditionsItems";
import { styles } from "./TermaAndConditionsStyles";
import { SCREENS } from "../../util/constants/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {},
    };
  }

  async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.setState({ loggedInUser: user });
  }

  handlClick = async () => {
    this.setState({ isLoading: true });
    const formData = new URLSearchParams();
    formData.append("emp_id", this.state.loggedInUser.emp_id);
    http
      .post(apiHelper.termAndConditions, formData)
      .then(result => {
        if (result.status === 200) {
          AsyncStorage.setItem("disclaimer_status", "1");
          this.props.navigation.replace(SCREENS.SECURE_ROUTE);
        }
      })
      .catch(error => {
        //handle error
      });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.fullWidth}>
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              style={styles.activityIndicator}
              size="large"
            />
          ) : null}
          <Card>
            <Card.Title>
              <Title />
            </Card.Title>
            <View style={styles.user}>
              <TermsConditionsItems />
              <AcceptButton handlClick={this.handlClick} />
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

/**
 *
 * @param {*} handleClick of accept Button
 * @returns Accept Button
 */

export function AcceptButton({ handlClick }) {
  return (
    <View style={styles.acceptButtonContainer}>
      <View style={styles.acceptButtonSubcontainer}>
        <TouchableHighlight
          style={styles.acceptButtonLayout}
          onPress={handlClick}
        >
          <View style={styles.acceptButton}>
            <FontAwesome
              name="save"
              size={18}
              color="white"
              title="Accept"
              visible={false}
            />
            <Text style={styles.acceptButtonText}>&nbsp;&nbsp;Accept</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

/**
 *
 * @returns Title Component
 */
export function Title() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Disclaimer</Text>
    </View>
  );
}
