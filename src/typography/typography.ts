import { StyleSheet } from "react-native";
import { Theme } from "../Theme";

export const Typography = StyleSheet.create({
  main_heading: {
    fontSize: 46,
    fontWeight: "700",
    lineHeight: 62,
    fontFamily: "NotoSans",
    color: Theme.white,
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "NotoSans",
    color: Theme.white,
  },
  subHeading: {
    fontSize: 26,
    fontWeight: "700",
    fontFamily: "NotoSans",
    color: Theme.white,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 27,
    fontFamily: "NotoSans",
    color: Theme.white,
  },
  body_medium: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    fontFamily: "NotoSans",
    color: Theme.white,
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    fontFamily: "NotoSans",
  },
  caption: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    fontFamily: "NotoSans",
    color: Theme.white,
  },
  cap: {
    fontSize: 10,
    fontWeight: "400",
    fontFamily: "NotoSans",
    color: Theme.white,
  },
  label: {
    fontSize: 12,
    fontWeight: "300",
    lineHeight: 18,
    fontFamily: "NotoSans",
    color: Theme.inActiveColor,
  },
  Signup_text: {
    fontSize: 12,
    fontFamily: "NotoSans",
  },
  btn_text: {
    fontSize: 15,
    fontFamily: "NotoSans",
  },
});
