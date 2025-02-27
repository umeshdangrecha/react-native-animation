import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WallPaperCarouselComponent from "@/components/WallPaperCarousel/WallPaperCarousel";

const WallPaperCarousel = () => {
  return (
    <View style={styles.container}>
      <WallPaperCarouselComponent />
    </View>
  );
};

export default WallPaperCarousel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});
