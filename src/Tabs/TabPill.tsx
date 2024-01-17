import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Theme } from "../Theme";

interface TabPillProps {
  active?: boolean;
  text: string;
}

const TabPill = ({ active, text }: TabPillProps) => {
  const styles = StyleSheet.create({
    wrapper: {
      paddingHorizontal: 8,
      paddingVertical: 10,
      width: "auto",
      display: "flex",
      alignSelf: "flex-start",
      borderRadius: 10,
    },
    text: {
      fontSize: 11,
      lineHeight: 20,
      fontWeight: "500",
      color: Theme.pendingcolor,
    },
  });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default TabPill;
