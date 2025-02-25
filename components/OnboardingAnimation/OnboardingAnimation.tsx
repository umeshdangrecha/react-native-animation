import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useMemo } from "react";
import Animated, {
  AnimatedProps,
  FadeInDown,
  FadeInLeft,
  FadeOutLeft,
  FadeOutUp,
  interpolateColor,
  LinearTransition,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

const _spacing = 8;
const _buttonHeight = 42;
const _layoutTransition = LinearTransition.springify()
  .damping(80)
  .stiffness(200);

const _dotContainer = 24;
const _dotSize = _dotContainer / 3;
const _activeDot = "#fff";
const _inactiveDot = "#aaa";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
function Button({ children, style, ...rest }: AnimatedProps<PressableProps>) {
  return (
    <AnimatedPressable
      style={[
        {
          height: _buttonHeight,
          borderRadius: _buttonHeight / 2,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: _spacing * 2,
        },
        style,
      ]}
      entering={FadeInLeft.springify().damping(80).stiffness(200)}
      exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
      layout={_layoutTransition}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}

function Dot({
  index,
  animation,
}: {
  index: number;
  animation: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [index - 1, index, index + 1],
        [_inactiveDot, _activeDot, _activeDot]
      ),
    };
  });
  return (
    <View
      style={{
        width: _dotContainer,
        height: _dotContainer,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          stylez,
          {
            width: _dotSize,
            height: _dotSize,
            borderRadius: _dotSize,
          },
        ]}
      />
    </View>
  );
}

function PaginationIndicator({
  animation,
}: {
  animation: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      width: _dotContainer + animation.value * _dotContainer,
    };
  });
  return (
    <Animated.View
      style={[
        stylez,
        {
          backgroundColor: "#29BE56",
          height: _dotContainer,
          borderRadius: _dotContainer,
          position: "absolute",
          left: 0,
          right: 0,
        },
      ]}
    />
  );
}

export function Pagination({
  selectedIndex,
  total,
}: {
  selectedIndex: number;
  total: number;
}) {
  const animation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      damping: 80,
      stiffness: 200,
    });
  });
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <PaginationIndicator animation={animation} />
        {[...Array(total).keys()].map((i) => {
          return <Dot key={`dot-${i}`} index={i} animation={animation} />;
        })}
      </View>
    </View>
  );
}
const OnboardingAnimationComponent = (props: {
  total: number;
  activeIndex: number;
  onIndexChange: (newIndex: number) => void;
}) => {
  const { activeIndex, onIndexChange, total } = props;

  const isAtLastIndex = useMemo(
    () => activeIndex === total - 1,
    [activeIndex, total]
  );

  return (
    <View style={{ padding: _spacing, gap: _spacing * 2 }}>
      <Pagination selectedIndex={activeIndex} total={total} />
      <View
        style={{
          flexDirection: "row",
          gap: _spacing,
        }}
      >
        {activeIndex != 0 && (
          <Button
            style={{ backgroundColor: "#ddd" }}
            onPress={() => {
              if (activeIndex <= 0) return;
              onIndexChange(activeIndex - 1);
            }}
          >
            <Text>Back</Text>
          </Button>
        )}
        <Button
          style={{ backgroundColor: "#036BFB", flex: 1 }}
          onPress={() => {
            if (isAtLastIndex) return;
            onIndexChange(activeIndex + 1);
          }}
        >
          {isAtLastIndex ? (
            <Animated.Text
              key="Finish"
              style={{ color: "#fff" }}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
            >
              Finish
            </Animated.Text>
          ) : (
            <Animated.Text
              key="Continue"
              style={{ color: "#fff" }}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              layout={_layoutTransition}
            >
              Continue
            </Animated.Text>
          )}
        </Button>
      </View>
    </View>
  );
};

export default OnboardingAnimationComponent;

const styles = StyleSheet.create({});
