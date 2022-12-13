import React from "react";
import { Text, View, Image } from "react-native";
import LogoZebra from "../../assets/images/zebra_logo.png";
import { styles } from "./styles/FooterStyles";
const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Powered by</Text>
      <Image source={LogoZebra} style={styles.footerImage} />
    </View>
  );
};

export default Footer;
