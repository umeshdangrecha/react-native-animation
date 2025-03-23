import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ExampleLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="onboarding-animation"
        options={{ title: "Onboarding Animation" }}
      />
      <Stack.Screen
        name="counter-animation"
        options={{ title: "Counter Animation" }}
      />
      <Stack.Screen
        name="loading-animation"
        options={{ title: "Loading Animation" }}
      />
      <Stack.Screen
        name="ring-indicator"
        options={{ title: "Ring Indicator" }}
      />
      <Stack.Screen
        name="wall-paper-carousel"
        options={{ title: "WallPaper Carousel" }}
      />
      <Stack.Screen
        name="tabs"
        options={{ title: "Tabs", headerShown: false }}
      />
      <Stack.Screen name="loaders" options={{ title: "Loaders" }} />
    </Stack>
  );
};

export default ExampleLayout;
