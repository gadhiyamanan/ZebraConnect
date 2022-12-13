import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Calendar from "../../components/Calendar/Calendar";
import auth from "../../services/authService";
import { SCREENS } from "../../util/constants/Constants";
import { styles } from "./MyDiaryStyles";
import { useTheme, Button } from "react-native-paper";
import { Text } from "native-base";

export default function MyDiary({ navigation, route }) {
  const { colors } = useTheme();
  const [userData, setUser] = useState(null);

  function redirectUser(user) {
    if (user.emp_id === "" || user.emp_id === null) {
      navigation.navigate(SCREENS.LOGIN);
    }
  }

  useEffect(() => {
    auth.getCurrentUser().then(user => {
      setUser(user);
      redirectUser(user);
    });
  }, []);

  const goToBankHolidayScreen = () => {
    navigation.navigate(SCREENS.BANK_HOLIDAY);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.fullWidth}>
        <React.Fragment>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={[styles.bankHolidayButtonContaier]}
              // icon={() => (
              //   <FontAwesome
              //     name="calendar"
              //     size={18}
              //     color={colors.surface}
              //     title="Bank Holidays"
              //     visible={false}
              //   />
              // )}
              // uppercase={false}
              // mode="contained"
              onPress={goToBankHolidayScreen}
            >
              <Text style={styles.bankHolidayText}>Bank Holidays</Text>
            </TouchableOpacity>
          </View>
          <Calendar empid={userData?.emp_id} />
        </React.Fragment>
      </ScrollView>
    </SafeAreaView>
  );
}
