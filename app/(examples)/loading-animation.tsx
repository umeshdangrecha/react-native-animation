import LoadingAnimationComponent from "@/components/LoadingAnimation/LoadingAnimationComponent";
import React from "react";
import { StyleSheet, View } from "react-native";

const LoadingAnimation = () => {
  return (
    <View style={styles.container}>
      <LoadingAnimationComponent size={100} />
    </View>
  );
};

export default LoadingAnimation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
