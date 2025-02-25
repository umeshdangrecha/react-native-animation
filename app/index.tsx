import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const RootScreen = () => {
  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: "/(examples)/onboarding-animation",
        }}
      >
        1. Onboarding Animation
      </Link>
    </View>
  );
};

export default RootScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
