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
    </Stack>
  );
};

export default ExampleLayout;
