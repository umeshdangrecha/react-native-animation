import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { icons } from "lucide-react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";
import { MotiProps, MotiView } from "moti";
import { motifySvg } from "moti/svg";

type IconNames = keyof typeof icons;

const _spacing = 4;

export type TabItem = {
  icon: IconNames;
  label: string;
};

type TabsComponentProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
};

type IconProp = {
  name: IconNames;
} & MotiProps;
function Icon({ name, ...rest }: IconProp) {
  //   const IconComponent = motifySvg(icons[name])();
  const IconComponent = icons[name];

  return <IconComponent size={16} {...rest} />;
}

const TabsComponent = (props: TabsComponentProps) => {
  const {
    data,
    onChange,
    selectedIndex,
    activeBackgroundColor,
    activeColor,
    inactiveBackgroundColor,
    inactiveColor,
  } = props;

  return (
    <View style={{ flexDirection: "row", gap: _spacing }}>
      {data.map((item, index) => {
        const isSelected = selectedIndex === index;
        console.log(isSelected);
        return (
          <MotiView
            key={index}
            // style={{ borderRadius: 8 }}
            animate={{
              backgroundColor: isSelected
                ? activeBackgroundColor
                : inactiveBackgroundColor,
              borderRadius: 8,
              overflow: "hidden",
            }}
            layout={LinearTransition.springify().damping(80).stiffness(200)}
          >
            <Pressable
              onPress={() => onChange(index)}
              style={{
                padding: _spacing * 3,
                justifyContent: "center",
                alignItems: "center",
                gap: _spacing,
                flexDirection: "row",
              }}
            >
              <Icon
                animate={{
                  color: isSelected ? activeColor : inactiveColor,
                }}
                name={item.icon}
              />
              {isSelected && (
                <Animated.Text
                  entering={FadeInRight.springify().damping(80).springify(200)}
                  exiting={FadeOutRight.springify().damping(80).stiffness(200)}
                  style={{ color: activeColor }}
                >
                  {item.label}
                </Animated.Text>
              )}
            </Pressable>
          </MotiView>
        );
      })}
    </View>
  );
};

export default TabsComponent;

const styles = StyleSheet.create({});
