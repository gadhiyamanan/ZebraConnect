import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import auth from "../../services/authService";
import { SCREENS } from "../../util/constants/Constants";
import { styles } from "./ProfileStyles";
import {
  useTheme,
  Surface,
  Avatar,
  Title,
  Headline,
  Subheading,
  Card,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [userName, setUserName] = useState("");
  const [userDetail, setUserDetail] = useState({});
  const [trustName, setTrustName] = useState('');
  const paperTheme = useTheme();
  const navigation = useNavigation();

  let getCurrentUser = () => {
    auth
      .getCurrentUser()
      .then(user => {
        let splitName = user.emp_name.split(" ");
        setUserName(`${splitName[0].charAt(0)}${splitName[1].charAt(0)}`);
        setUserDetail(user);
      })
      .catch();
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  useEffect(() => {
    AsyncStorage.getItem("trustName").then(trustName => {
      if (trustName) setTrustName(trustName);
    });
  }, []);

  

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: paperTheme.colors.background },
      ]}
    >
      <Surface style={styles.profileContainer}>
        <View style={styles.profileInfoContainer}>
          <Avatar.Text
            size={70}
            label={userName}
            style={{
              backgroundColor: paperTheme.colors.primary,
            }}
            color={paperTheme.colors.text}
          />
          <Headline style={{ color: paperTheme.colors.secondaryText }}>
            {userDetail.emp_name}
          </Headline>
          <Title style={{ color: paperTheme.colors.secondaryText }}>
            {trustName}
          </Title>
          <Subheading style={{ color: paperTheme.colors.secondaryText }}>
            {userDetail.email}
          </Subheading>
        </View>
      </Surface>
      <Card
        style={styles.profileContainer}
        onPress={() => {
          navigation.navigate(SCREENS.CHANGE_PASSWORD);
        }}
      >
        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            name="user"
            size={20}
            style={{ paddingRight: 10 }}
            color={paperTheme.colors.accent}
          />
          <Title style={{ color: paperTheme.colors.secondaryText }}>
            Change Password
          </Title>
        </Card.Content>
      </Card>
      <Card
        style={styles.profileContainer}
        onPress={() => {
          navigation.navigate(SCREENS.QR_CODE_SCANNER,{oldTrustName:trustName,showConfirmation:true});
        }}
      >
        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            name="qrcode"
            size={20}
            style={{ paddingRight: 10 }}
            color={paperTheme.colors.accent}
          />
          <Title style={{ color: paperTheme.colors.secondaryText }}>
           Re-enter Trust code
          </Title>
        </Card.Content>
      </Card>
    </View>
  );
}


