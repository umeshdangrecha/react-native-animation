import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const _spacing = 4;
const _dotSize = 16;
const _duration = 400;
const _delay = 200;
const _translateY = 5;
const _dotsCount = 3;

const DotLoaderThree = () => {
  const dots = Array.from({ length: _dotsCount }, () => useSharedValue(0));

  useEffect(() => {
    dots.forEach((dot, index) => {
      dot.value = withDelay(
        index * _delay,
        withRepeat(
          withSequence(
            withTiming(-_translateY, { duration: _duration }),
            withTiming(_translateY, { duration: _duration })
          ),
          -1,
          true
        )
      );
    });
  }, [dots]);

  const animatedStyles = dots.map((dot) =>
    useAnimatedStyle(() => ({
      transform: [{ translateY: dot.value }],
    }))
  );

  return (
    <View style={styles.container}>
      {dots.map((_, index) => (
        <Animated.View
          key={index}
          style={[styles.dot, animatedStyles[index]]}
        />
      ))}
    </View>
  );
};

export default DotLoaderThree;

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: _spacing },
  dot: {
    width: _dotSize,
    aspectRatio: 1,
    backgroundColor: "#000",
    borderRadius: _dotSize / 2,
  },
});
