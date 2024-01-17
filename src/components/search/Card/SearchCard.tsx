import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Theme } from "../../../Theme";
import { Typography } from "../../../typography/typography";
import { getSearchData } from "../../../services/SearchData";
import { navigate } from "../../../Navigator/utils";

const SearchCard = ({ item, index }) => {
  const searchimg = require("../../../Assets/Images/searchimg.png");
  const play = require("../../../Assets/Images/play.png");

  const image = item?.show?.image?.original;

  return (
    <Pressable
      style={styles.container}
      key={index}
      onPress={() => navigate("DetailsPage", { data: item })}
    >
      {image && (
        <Image
          source={{ uri: image }}
          alt="No image"
          style={styles.image_style}
        />
      )}
      {!image && (
        <Image source={searchimg} alt="No image" style={styles.image_style} />
      )}
      <View style={styles.sub_container}>
        <Text style={Typography.caption}>{item?.show?.name}</Text>
        <Image source={play} />
      </View>
    </Pressable>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Theme.selectionColor,
  },
  image_style: {
    height: Dimensions.get("screen").height * 0.076,
    width: Dimensions.get("screen").height * 0.146,
    resizeMode: "cover",
  },
  sub_container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 5,
    justifyContent: "space-between",
  },
});
