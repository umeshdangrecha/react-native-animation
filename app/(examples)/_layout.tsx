import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ExampleLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="onboarding-animation" />
    </Stack>
  );
};

export default ExampleLayout;
