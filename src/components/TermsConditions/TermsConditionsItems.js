import React, { Fragment } from "react";
import { View, Text } from "react-native";
import { TERMS_CONDITIONS } from "../../screens/TermsConditions/TermsData";
import { styles } from "./styles/TermsConditionsItemStyles";

export default function TermsConditionsItems() {
  return (
    <View style={styles.termsConditionsContainer}>
      {TERMS_CONDITIONS.map((item, index) => {
        return (
          <Fragment key={index}>
            <View style={styles.termConditionItemContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            {item.paragraphs.map((paragraph, paragraphIndex) => {
              let paragraphText = paragraph.text.replace(/(\r\n|\n|\r)/gm, "");
              paragraphText = paragraphText.replace(/ +(?= )/g, "");
              return (
                <View key={paragraphIndex} style={styles.paragraphContainer}>
                  <Text
                    style={{ fontWeight: paragraph.isBold ? "800" : undefined }}
                  >
                    {paragraphText}{" "}
                    {paragraph.appendedText ? (
                      <Text>{paragraph.appendedText}</Text>
                    ) : null}
                  </Text>
                </View>
              );
            })}
          </Fragment>
        );
      })}
    </View>
  );
}
