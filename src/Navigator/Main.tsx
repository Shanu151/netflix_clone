import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationTab from "../Tabs/NavigationTab";
import { BackHandler, SafeAreaView } from "react-native";
import { navigationRef } from "./utils";
import HomeScreen from "../Screens/HomeScreen";
import SearchScreen from "../Screens/SearchScreen";
import DownloadScreen from "../Screens/DownloadScreen";
import MoreScreen from "../Screens/MoreScreen";
import ComingSoonScreen from "../Screens/ComingSoonScreen";
import { Theme } from "../Theme";
const Tab = createBottomTabNavigator();

// @refresh reset
const MainNavigator = ({ navigation }) => {
  const [isPopup, setIspopup] = useState(false);
  const [userList, setUserList] = useState<any>([]);
  const [currentCount, setCurrentCount] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <Tab.Navigator
        tabBar={(props) => (
          <NavigationTab
            key={Math.floor(Math.random() * 105000000)}
            {...props}
          />
        )}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Home"
          key={Math.floor(Math.random() * 100030000)}
          component={HomeScreen}
          options={{
            tabBarIconStyle: { display: "none" },
            tabBarLabelPosition: "beside-icon",
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIconStyle: { display: "none" },
            tabBarLabelPosition: "beside-icon",
          }}
        />
        <Tab.Screen
          name="Coming Soon"
          component={ComingSoonScreen}
          key={Math.floor(Math.random() * 100000200)}
          options={{
            tabBarIconStyle: { display: "none" },
            tabBarLabelPosition: "beside-icon",
          }}
        />
        <Tab.Screen
          name="Download"
          component={DownloadScreen}
          key={Math.floor(Math.random() * 100000200)}
          options={{
            tabBarIconStyle: { display: "none" },
            tabBarLabelPosition: "beside-icon",
          }}
        />

        <Tab.Screen
          name="More"
          component={MoreScreen}
          key={Math.floor(Math.random() * 10000000)}
          options={{
            tabBarIconStyle: { display: "none" },
            tabBarLabelPosition: "beside-icon",
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MainNavigator;
