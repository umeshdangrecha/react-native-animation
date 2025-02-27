import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

const _size = 100;
const _color = "#6E01Ef";

const RingIndicatoryComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={[styles.dot, styles.center]}>
        {[...Array(3).keys()].map((index) => {
          return (
            <MotiView
              from={{
                opacity: 0.7,
                scale: 1,
              }}
              animate={{
                opacity: 0,
                scale: 3,
              }}
              transition={{
                type: "timing",
                duration: 2000,
                easing: Easing.out(Easing.ease),
                delay: index * 400,
                repeatReverse: false,
                loop: true,
              }}
              key={index}
              style={[StyleSheet.absoluteFillObject, styles.dot]}
            />
          );
        })}
        <Feather name="phone-outgoing" size={32} color="#fff" />
      </View>
    </View>
  );
};

export default RingIndicatoryComponent;

const styles = StyleSheet.create({
  dot: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: _color,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
