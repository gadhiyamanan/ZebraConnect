import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import auth from "../../services/authService";
import http from "../../services/httpService";
import apiHelper from "../apiHelper";
import BankHolidayItem from "../../components/Leaves/BankHolidayItem";
import { styles } from "./styles/BankHolidayStyles";
import { withTheme, Button } from "react-native-paper";
import { globalStyles } from "../../util/styles/GlobalStyles";
import { FontAwesome } from "@expo/vector-icons";
import { LOADER_COLOR } from "../../util/constants/Constants";

class BankHoliday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankHolidays: [],
      holidayByYear: {},
      loggedInUser: {},
      colors: props.theme.colors,
      currentYear: 0,
    };
  }

  componentDidMount() {
    this.fetchData();
    auth.getCurrentUser().then(user => {
      this.setState({ loggedInUser: user });
    });
  }

  async fetchData() {
    this.setState({ isLoading: true });
    const broadcastList = await http.get(apiHelper.bankHolidays);

    var currentYear = new Date().getFullYear();

    let holidayByYear = {};

    broadcastList.data.forEach(obj => {
      const year = obj.date.split("-")[2];
      if (holidayByYear[year]) {
        holidayByYear[year].push(obj);
      } else {
        holidayByYear[year] = [obj];
      }
    });

    this.setState({
      bankHolidays: broadcastList.data,
      isLoading: false,
      holidayByYear: holidayByYear,
      currentYear: currentYear,
    });
  }

  componentWillUnmount() {
    const { route } = this.props;
    if (route && route.params) {
      route.params.callRefresh();
    }
  }

  previousMonth = () => {
    this.setState({
      currentYear: this.state.currentYear - 1,
    });
  };

  nextMonth = () => {
    this.setState({
      currentYear: this.state.currentYear + 1,
    });
  };

  render() {
    const { isLoading, colors, holidayByYear, currentYear } = this.state;
    return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              style={styles.activityIndicator}
              size="large"
              color={LOADER_COLOR.COLOR}
            />
          ) : null}

          <View style={styles.fullWidth}>
            <Card style={styles.fullWidth}>
              <Text
                style={[
                  globalStyles.titleTextStyle,
                  { color: colors.secondaryText, paddingBottom: 5 },
                ]}
              >
                Bank Holidays ({currentYear})
              </Text>
              <View style={styles.headerHeight}>
                <View style={styles.cardHeaderContainer}>
                  <View style={styles.headerLeftItemContainer}>
                    <Text style={styles.headerLeftText}>Day</Text>
                  </View>
                  <View style={styles.headerCenterItemContainer}>
                    <Text style={styles.headerCenterText}>Holiday</Text>
                  </View>
                  <View style={styles.headerRightContainer}>
                    <Text style={styles.headerRightText}>Date</Text>
                  </View>
                </View>
              </View>
              <FlatList
                data={
                  holidayByYear[currentYear] ? holidayByYear[currentYear] : []
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={(data, index) => {
                  return (
                    <BankHolidayItem item={data.item} index={data.index} />
                  );
                }}
              />

              <View style={styles.nextPrevButtonContainer}>
                {holidayByYear[currentYear - 1] && (
                  <Button
                    compact
                    mode="contained"
                    style={[
                      styles.celDataContainer,
                      { backgroundColor: colors.accent },
                    ]}
                    icon={() => (
                      <FontAwesome
                        name="angle-double-left"
                        size={30}
                        color={colors.surface}
                        title="Previous"
                        style={styles.buttonIcon}
                      />
                    )}
                    onPress={this.previousMonth}
                  />
                )}
                {holidayByYear[currentYear + 1] && (
                  <Button
                    compact
                    mode="contained"
                    style={[
                      styles.nextArrowContainer,
                      { backgroundColor: colors.accent },
                    ]}
                    icon={() => (
                      <FontAwesome
                        name="angle-double-right"
                        size={30}
                        color={colors.surface}
                        title="Next"
                        style={styles.buttonIcon}
                      />
                    )}
                    onPress={this.nextMonth}
                  />
                )}
              </View>
            </Card>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default withTheme(BankHoliday);
