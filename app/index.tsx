import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { AnimatedButton } from "@/components/AnimatedPressable/AnimatedPressable";

const RootScreen = () => {
  return (
    <View style={styles.container}>
      <AnimatedButton
        onPress={() => {
          router.navigate("/(examples)/onboarding-animation");
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>1. Onboarding Animation</Text>
      </AnimatedButton>
    </View>
  );
};

export default RootScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 10,
    backgroundColor: "black",
  },
  buttonText: {
    color: "#fff",
  },
});
