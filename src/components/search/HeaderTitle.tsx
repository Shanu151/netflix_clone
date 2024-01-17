import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Typography } from "../../typography/typography";

const HeaderTitle = () => {
  return (
    <Text style={[Typography.subHeading, { paddingHorizontal: 16 }]}>
      Top Searches
    </Text>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({});
