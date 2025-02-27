import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RingIndicatoryComponent from "@/components/RingIndicator/RingIndicatoryComponent";

const RingIndicator = () => {
  return (
    <View style={styles.container}>
      <RingIndicatoryComponent />
    </View>
  );
};

export default RingIndicator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
