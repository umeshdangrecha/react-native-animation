import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import OnboardingAnimationComponent from "@/components/OnboardingAnimation/OnboardingAnimation";

const OnboardingAnimation = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={styles.container}>
      <OnboardingAnimationComponent
        activeIndex={selectedIndex}
        onIndexChange={setSelectedIndex}
        total={4}
      />
    </View>
  );
};

export default OnboardingAnimation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});
