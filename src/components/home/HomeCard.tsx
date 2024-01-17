import { Pressable, StyleSheet, Text, Image, Dimensions } from "react-native";
import React from "react";
import { navigate } from "../../Navigator/utils";

const HomeCard = ({ item, index }) => {
  const image = item?.show?.image?.original;
  const searchimg = require("../../Assets/Images/searchimg.png");
  return (
    <Pressable
      style={styles.img_container}
      key={index}
      onPress={() => {
        navigate("DetailsPage", { data: item });
      }}
    >
      {image && <Image source={{ uri: image }} style={styles.img_container} />}
      {!image && <Image source={searchimg} style={styles.img_container} />}
    </Pressable>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  img_container: {
    height: Dimensions.get("screen").height * 0.161,
    width: Dimensions.get("screen").height * 0.103,
  },
  contentContainerStyle: {
    flexGrow: 1,
    rowGap: 5,
    columnGap: 5,
    alignItems: "center",
  },
});
