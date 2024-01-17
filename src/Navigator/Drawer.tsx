import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import MainNavigator from "./Main";
import { Theme } from "../Theme";

const Drawers = ({ navigation }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "transparent" },
      }}
      drawerContent={() => {
        return <View style={styles.container}></View>;
      }}
    >
      <Drawer.Screen
        options={{ title: "" }}
        name="Main"
        component={MainNavigator}
      />
    </Drawer.Navigator>
  );
};

export default Drawers;

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get("screen").height * 0.15,
    width: Dimensions.get("screen").width * 0.3,
    flex: 1,
    backgroundColor: Theme.white,
  },
});
