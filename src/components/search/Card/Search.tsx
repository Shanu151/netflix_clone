import { Image, Pressable, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Theme } from "../../../Theme";

const Search = ({ onTextChange }) => {
  const search = require("../../../Assets/Images/search.png");
  return (
    <Pressable style={styles.container}>
      <Image
        source={search}
        style={{ height: 20, width: 20, resizeMode: "contain" }}
      />
      <TextInput
        placeholderTextColor={Theme.placeholderTitle}
        onChangeText={onTextChange}
        style={{ color: "#FFF" }}
        placeholder="Search for a show, movie, genre, e.t.c."
      />
    </Pressable>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.selectionColor,
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    gap: 10,
  },
});
