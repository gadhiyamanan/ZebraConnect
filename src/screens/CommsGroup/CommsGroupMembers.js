import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import auth from "../../services/authService";
import http from "../../services/httpService";
import { LOADER_COLOR, SCREENS } from "../../util/constants/Constants";
import apiHelper from "../apiHelper";
import { styles } from "./styles/CommsGroupMemberStyles";

export default class CommsGroupMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datares: "",
      Members: [],
      loggedInUser: {},
      isLoading: false,
    };
  }

  async redirectUser(user) {
    if (user.emp_id === "" || user.emp_id === null) {
      this.props.navigation.navigate(SCREENS.LOGIN);
    }
  }

  componentWillUnmount() {
    const { route } = this.props;
    route.params.callRefresh();
  }

  componentDidMount() {
    const data = this.props.route.params.group;
    this.setState({ datares: data });
    auth.getCurrentUser().then(user => {
      this.setState({ loggedInUser: user });
      this.redirectUser(user);
      this.viewCommsgroupMember(data.id);
    });
  }
  //send Comms message
  async viewCommsgroupMember(groupId) {
    const { loggedInUser } = this.state;
    this.setState({ isLoading: true });
    const commsMember = await http.get(
      apiHelper.viewMembersComms + `/` + groupId + `/` + loggedInUser.emp_id
    );
    this.setState({ Members: commsMember.data, isLoading: false });
  }

  render() {
    const { isLoading, datares, Members } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <View style={styles.activityContainer} accessibilityRole="button">
            <ActivityIndicator
              animating={true}
              style={styles.activityIndicator}
              size="large"
              color={LOADER_COLOR.COLOR}
            />
          </View>
        ) : null}
        <ScrollView style={styles.fullWidth}>
          <Card style={styles.fullWidth}>
            <Card.Title>{datares.name}</Card.Title>
            <View>
              <View style={styles.headerContainer}>
                <View style={styles.headerLeftText}>
                  <Text style={styles.headerLeft}>Name</Text>
                </View>
                <View style={styles.headerRightText}>
                  <Text style={styles.headerCenterText}>Role</Text>
                </View>
              </View>
              <FlatList
                data={Members}
                keyExtractor={(item, index) => index.toString()}
                renderItem={member => {
                  return <CommsGroupMembersItem member={member.item} />;
                }}
              />
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export function CommsGroupMembersItem({ member }) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{member.emp_name}</Text>
      </View>
      <View style={styles.roleContainer}>
        <Text style={styles.roleText}>{member.role}</Text>
      </View>
    </View>
  );
}
