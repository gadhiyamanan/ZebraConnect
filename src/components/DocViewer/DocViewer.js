import React from "react";
import { WebView } from "react-native-webview";
import { Appbar } from "react-native-paper";
import { Share } from "react-native";
export default function DocViewer({ uri, onPress }) {
  const onPressShare = async () => {
    try {
      await Share.share({
        url: uri,
      });
    } catch (error) {}
  };
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="close" onPress={onPress} />
        <Appbar.Content title="Attachment" />
        <Appbar.Action icon="share" onPress={onPressShare} />
      </Appbar.Header>

      <WebView source={{ uri: uri }} />
    </>
  );
}
