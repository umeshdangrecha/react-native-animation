import { AnimatedButton } from "@/components/AnimatedPressable/AnimatedPressable";
import { Href, router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const buttons: { key: string; path: Href; label: string }[] = [
  {
    key: "onboarding-animation",
    path: "/(examples)/onboarding-animation",
    label: "1. Onboarding Animation",
  },
  {
    key: "counter-animation",
    path: "/(examples)/counter-animation",
    label: "2. Counter Animation",
  },
];

const RootScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        data={buttons}
        renderItem={({ item }) => {
          return (
            <AnimatedButton
              onPress={() => {
                router.navigate(item.path);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{item.label}</Text>
            </AnimatedButton>
          );
        }}
      />
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
