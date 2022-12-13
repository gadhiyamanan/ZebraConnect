import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { styles } from "./CustomAlertModalStyle";

export default function CustomAlertModal({ onRequestClose, isVisible, data }) {
  const renderItem = ({ item }) => {
    return (
      <View>
        {!!item.title && (
          <Text
            style={[styles.title, item.title === "DRAFT" && { color: "black" }]}
          >
            {item.title}
          </Text>
        )}
        {!!item.subTitle && (
          <Text style={styles.subTitle}>{item.subTitle}</Text>
        )}
        {!!item.message && <Text style={styles.message}>{item.message}</Text>}
      </View>
    );
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onRequestClose}
      useNativeDriver
    >
      <View style={styles.container}>
        <FlatList
          bounces={false}
          data={data || []}
          keyExtractor={(_, index) => String(index)}
          renderItem={renderItem}
          style={styles.listStyle}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
        <TouchableOpacity style={styles.btnContainer} onPress={onRequestClose}>
          <Text style={styles.btnText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
