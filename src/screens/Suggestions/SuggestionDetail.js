import React, { Component } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { styles } from "./styles/SuggestionDetailsStyles";
import { Button, withTheme } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { SCREENS } from "../../util/constants/Constants";
class SuggestionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      broadcast: {
        description: "Carpark will be closed during 5 May-12 May",
        date: "29-Apr-2020",
        title: "Carpark Closure",
        id: 10,
      },
      colors: props.theme.colors,
    };
  }

  callRefresh() {}

  render() {
    const { route, theme } = this.props;

    const data = route.params.suggestion;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.fullWidth}>
          <Card style={styles.fullWidth}>
            <Card.Title>{data.subject}</Card.Title>
            <View style={styles.user}>
              <Text style={styles.name} title={data.idea}>
                {data.idea}
              </Text>
            </View>
            {data.status === "0" && (
              <View style={styles.buttonContainer}>
                <Button
                  compact
                  mode="contained"
                  style={[
                    styles.openButton,
                    { backgroundColor: theme.colors.accent },
                  ]}
                  icon={() => (
                    <FontAwesome
                      name="edit"
                      size={20}
                      color={theme.colors.surface}
                      title="View Details"
                    />
                  )}
                  onPress={() => {
                    this.props.navigation.navigate(SCREENS.SUGGESTIONS_ADD, {
                      suggestion: data,
                      callRefresh: this.callRefresh.bind(this),
                    });
                  }}
                />
              </View>
            )}
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withTheme(SuggestionDetail);
