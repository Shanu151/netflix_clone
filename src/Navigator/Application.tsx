import React from "react";
import { StatusBar, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./utils";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Drawer screeen
import Drawer from "./Drawer";
import { Theme } from "../Theme";
import DetailsPage from "../Pages/DetailsPage";
const Stack = createNativeStackNavigator();
const LinkingConfig = {
  prefixes: ["netflix://"],
  config: {
    screens: {
      GoalPage: "GoalPage",
    },
  },
};

const ApplicationNavigator = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfig}
      fallback={<Text>Loading...</Text>}
    >
      <StatusBar
        backgroundColor={Theme.white}
        animated
        barStyle="dark-content"
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000" },
        }}
      >
        <Stack.Screen name="Drawer" component={Drawer} />
        <Stack.Screen
          name="DetailsPage"
          component={DetailsPage}
          options={{ headerShown: true, headerTitle: "Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default ApplicationNavigator;
