import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

const Theme = {
  default: {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      primary: "#061f5d", // primary color for the app, usually the brand color.
      accent: "#a6cfd8", // secondary color for the app which complements the primary color.
      background: "mintcream", // background color for pages, such as lists.
      surface: "#FFFFFF", // background color for elements containing content, such as cards.
      disabled: "rgba(0, 0, 0, 0.38)", // color for disabled elements.
      placeholder: "rgba(0, 0, 0, 0.54)", // color for placeholder text, such as input placeholder.
      error: "red", // color for errored element
      card: "rgb(18, 18, 18)", // color or card element

      // Text
      text: "#FFF", // text color for content
      secondaryText: "#061f5d", // Second most used color for text
      tertiaryText: "#000", // Third used color for text

      // Button Color
      // buttonBG: '#a6cfd8'
    },
    fonts: {},
  },
};
export default Theme;
