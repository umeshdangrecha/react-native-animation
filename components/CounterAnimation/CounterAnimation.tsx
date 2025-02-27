import { MotiView } from "moti";
import React, { useState } from "react";
import { Text, TextProps, View } from "react-native";

const numbers = [...Array(10).keys()];
const _stagger = 100;

function Tick({
  children,
  style,
  fontSize,
  ...rest
}: TextProps & { fontSize: number }) {
  return (
    <Text
      {...rest}
      style={[
        style,
        {
          fontSize,
          lineHeight: fontSize * 1.1,
          fontVariant: ["tabular-nums"],
          fontWeight: "900",
        },
      ]}
    >
      {children}
    </Text>
  );
}

function TickerList({
  number,
  fontSize,
  index,
}: {
  number: number;
  fontSize: number;
  index: number;
}) {
  return (
    <View style={{ height: fontSize, overflow: "hidden" }}>
      <MotiView
        transition={{
          delay: index * _stagger,
          damping: 80,
          stiffness: 200,
        }}
        animate={{
          translateY: -fontSize * 1.1 * number,
        }}
      >
        {numbers.map((num, index) => {
          return (
            <Tick key={`tick-${index}`} fontSize={fontSize}>
              {num}
            </Tick>
          );
        })}
      </MotiView>
    </View>
  );
}

const Ticker = ({
  value = 12345,
  fontSize = 50,
}: {
  value: number;
  fontSize?: number;
}) => {
  const splittedValue = value.toString().split("");
  const [newFontSize, setNewFontSize] = useState(fontSize);

  return (
    <View>
      <Text>Prop font size {fontSize}</Text>
      <Text>new font size {newFontSize}</Text>

      <Tick
        fontSize={fontSize}
        numberOfLines={1}
        adjustsFontSizeToFit
        onTextLayout={(e) => {
          const mat = e.nativeEvent.lines[0];
          console.log(e.nativeEvent.lines[0]);
          setNewFontSize(parseInt((mat.ascender * 0.85).toString()));
        }}
      >
        {value}
      </Tick>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {splittedValue.map((number, index) => {
          return (
            <TickerList
              key={`counter-value-${index}`}
              number={parseInt(number)}
              fontSize={newFontSize}
              index={index}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Ticker;
