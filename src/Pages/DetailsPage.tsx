import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import WebView from "react-native-webview";

const DetailsPage = ({ route }) => {
  const { data } = route?.params;
  // console.log(data);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView style={styles.container} source={{ uri: data?.show?.url }} />
    </SafeAreaView>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
