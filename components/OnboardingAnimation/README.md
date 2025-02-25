# Onboarding / Pagination Animation

## Description

I have created pagination/onboarding animation where we have n{4} 4 pages. 2 buttons and n dots those will filled on unfilled based on which page is currently user viewing

Button -> Back will move to prev page
Button -> Continue will move to next page also I am changing button title if user reached to last page as (Finish).

Lets Understand code

Note: I haven't followed best practices please focus on logic only

## Imports

```ts
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
```

## Constant variables

```ts
const _spacing = 8; // for spacing b/w dots and page
const _buttonHeight = 42; // height of buttons
const _layoutTransition = LinearTransition.springify()
  .damping(80)
  .stiffness(200); // Layout animation

const _dotContainer = 24; // dot container height
const _dotSize = _dotContainer / 3; // dot size
const _activeDot = "#fff"; // active dot color
const _inactiveDot = "#aaa"; // inactive dot color
```

## Custom Button component

I have created a custom animated button component which have entering, exiting and layout animation

```ts
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
```

## Dot Component

Props

```ts
index; // need this for applying condition  for animation
animation; // this is shared value for animating/interpolating dot color
```

Lets breakdown the animation part (style)

```ts
const stylez = useAnimatedStyle(() => {
  return {
    backgroundColor: interpolateColor(
      animation.value, // shared value
      [index - 1, index, index + 1], // input range
      [_inactiveDot, _activeDot, _activeDot] // output range
    ),
  };
});
```

```ts
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
```

## Pagination indicator

This component will highlight active pages/visited pages
You can see I am increasing width based on shared value

```ts
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
```

## Pagination Component

This component will render dots with full animation

```ts
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
```

## Main Component

```ts
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
```
