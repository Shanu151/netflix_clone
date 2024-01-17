import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Theme } from "../Theme";

const NavigationTab = ({ state, descriptors, navigation }: any) => {
  const home = require("../Assets/Images/home.png");
  const search = require("../Assets/Images/search.png");
  const coming = require("../Assets/Images/coming.png");
  const download = require("../Assets/Images/download.png");
  const more = require("../Assets/Images/more.png");

  return (
    <View style={[styles.wrapper]}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: index,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: index,
          });
        };
        // console.log();

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: "center" }}
            key={Math.random() * 10}
          >
            <View style={isFocused ? styles.activeTab : styles.tab}>
              {label == "Home" && (
                <Image
                  source={home}
                  tintColor={
                    isFocused ? Theme.pendingcolor : Theme.inActiveColor
                  }
                  style={styles.activeImageStyle}
                />
              )}
              {label == "Search" && (
                <Image
                  source={search}
                  tintColor={
                    isFocused ? Theme.pendingcolor : Theme.inActiveColor
                  }
                  style={styles.activeImageStyle}
                />
              )}
              {label == "Coming Soon" && (
                <Image
                  source={coming}
                  tintColor={
                    isFocused ? Theme.pendingcolor : Theme.inActiveColor
                  }
                  style={styles.activeImageStyle}
                />
              )}
              {label == "Download" && (
                <Image
                  source={download}
                  tintColor={
                    isFocused ? Theme.pendingcolor : Theme.inActiveColor
                  }
                  style={styles.activeImageStyle}
                />
              )}
              {label == "More" && (
                <Image
                  source={more}
                  tintColor={
                    isFocused ? Theme.pendingcolor : Theme.inActiveColor
                  }
                  style={styles.activeImageStyle}
                />
              )}
              <Text
                key={Math.floor(Math.random() * 100) + 1}
                style={[
                  styles.text,
                  {
                    color: isFocused ? Theme.pendingcolor : Theme.white,
                  },
                ]}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 5,
    marginVertical: 10,
    backgroundColor: Theme.selectionColor,
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    display: "flex",
    alignSelf: "flex-start",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  tab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  activeTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  text: {
    fontSize: 10,
    lineHeight: 16.5,
    fontWeight: "300",
    fontFamily: "NotoSans",
    color: Theme.white,
  },
  activeText: {
    fontSize: 10,
    lineHeight: 16.5,
    fontWeight: "300",
    fontFamily: "NotoSans",
  },
  activeImageStyle: {
    height: Dimensions.get("screen").height * 0.024,
    width: Dimensions.get("screen").height * 0.024,
    resizeMode: "contain",
  },
});

export default NavigationTab;
