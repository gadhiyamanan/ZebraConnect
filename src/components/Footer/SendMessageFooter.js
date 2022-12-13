import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { styles } from "./styles/SendMessageFooterStyles";

export default function SendMessageFooter({
  message,
  onChangeText,
  sendBroadmessage,
}) {
  return (
    <Card>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Write a message..."
            underlineColorAndroid="transparent"
            onChangeText={onChangeText}
            value={message}
          />
        </View>
        <TouchableOpacity style={styles.btnSend} onPress={sendBroadmessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}
