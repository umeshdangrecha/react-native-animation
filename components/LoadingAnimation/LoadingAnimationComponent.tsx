import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MotiView } from "moti";

const LoadingAnimationComponent = ({ size = 100 }: { size: number }) => {
  return (
    <MotiView
      from={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 0,
      }}
      animate={{
        width: size + 20,
        height: size + 20,
        borderRadius: (size + 20) / 2,
        borderWidth: (size + 20) / 10,
      }}
      transition={{
        type: "timing",
        duration: 1000,
        loop: true,
      }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: size / 10,
        borderColor: "#fff",
      }}
    />
  );
};

export default LoadingAnimationComponent;
