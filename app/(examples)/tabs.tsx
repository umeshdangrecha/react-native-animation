import TabsComponent, { TabItem } from "@/components/Tabs/TabsComponent";
import { MotiView } from "moti";
import React, { useState } from "react";
import { View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = ["#FF005C", "#FFBD00", "#00B3E6", "#00CC96", "gold"];

const data: TabItem[] = [
  {
    icon: "LifeBuoy",
    label: "Buoy",
  },
  {
    icon: "Fish",
    label: "Fresh fish",
  },
  { icon: "Sailboat", label: "Sail" },
  { icon: "Ship", label: "Ship it" },
  { icon: "ShipWheel", label: "Manage it" },
];

const Tabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <TabsComponent
        data={data}
        selectedIndex={selectedIndex}
        onChange={onChange}
        activeBackgroundColor="black"
        inactiveBackgroundColor="grey"
        activeColor="white"
        inactiveColor="black"
      />
      <Animated.View
        key={selectedIndex}
        entering={FadeInRight.springify().damping(80).stiffness(200)}
        exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
        style={{
          flex: 1,
          backgroundColor: tabs[selectedIndex],
          borderRadius: 8,
          marginTop: 8,
        }}
      />
    </SafeAreaView>
  );
};

export default Tabs;
