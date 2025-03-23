import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DotLoaderThree from "@/components/Loaders/Dots/loader-3";

const loaders = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        padding: 20,
        alignItems: "center",
      }}
    >
      <DotLoaderThree />
    </View>
  );
};

export default loaders;

const styles = StyleSheet.create({});
