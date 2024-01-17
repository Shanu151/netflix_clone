import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { Typography } from "../../typography/typography";
import HomeCard from "./HomeCard";

const HomeList = ({ item, index }) => {
  const { data, title } = item;
  return (
    <View style={{ flex: 1 }}>
      <Text style={Typography.subHeading}>{title}</Text>
      <FlatList
        data={data}
        nestedScrollEnabled
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={HomeCard}
      />
    </View>
  );
};

export default HomeList;

const styles = StyleSheet.create({
  img_container: {
    height: Dimensions.get("screen").height * 0.161,
    width: Dimensions.get("screen").height * 0.103,
    backgroundColor: "red",
  },
  contentContainerStyle: {
    rowGap: 5,
    columnGap: 5,
    alignItems: "center",
  },
});
