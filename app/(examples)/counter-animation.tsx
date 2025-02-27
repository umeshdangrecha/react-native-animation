import CounterAnimationComponent from "@/components/CounterAnimation/CounterAnimation";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

const CounterAnimation = () => {
  const [number, setNumber] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const random = parseInt((Math.random() * 10000000).toString());
  //     setNumber(random);
  //   }, 10 * 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // });
  return (
    <View style={styles.container}>
      <CounterAnimationComponent value={number} fontSize={130} />

      <Button
        title="Random number"
        onPress={() => {
          const random = parseInt((Math.random() * 10000000).toString());
          setNumber(random);
        }}
      />
    </View>
  );
};

export default CounterAnimation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
