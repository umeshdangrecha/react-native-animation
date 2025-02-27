import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const url =
  "https://api.pexels.com/v1/search?query=mobile wallpaper&orientation=portrait";

const fetchPhotos = async () => {
  const res = await fetch(url, {
    headers: {
      Authorization: "zkb7oMqfk1qYwFmXMFfXq2xxv2T3I32gvvNzQBgHOmifmL0YANtiMvPc",
    },
  });

  const response = await res.json();

  if (res.status === 200) {
    return response;
  }
  return null;
};

const { width } = Dimensions.get("screen");

const _imageWidth = width * 0.7;
const _imageHeight = _imageWidth * 1.73;
const _spacing = 12;

const ImageComponent = ({
  index,
  src,
  activeIndex,
}: {
  src: string;
  index: number;
  activeIndex: SharedValue<number>;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [1.8, 1, 1.8]
          ),
        },
        {
          rotate: `${interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [10, 0, -10]
          )}deg`,
        },
      ],
    };
  });
  return (
    <View
      style={{
        height: _imageHeight,
        width: _imageWidth,
        overflow: "hidden",
        borderRadius: 16,
      }}
    >
      <Animated.Image source={{ uri: src }} style={[{ flex: 1 }, stylez]} />
    </View>
  );
};

const BackdropImage = ({
  index,
  src,
  activeIndex,
}: {
  src: string;
  index: number;
  activeIndex: SharedValue<number>;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        activeIndex.value,
        [index - 1, index, index + 1],
        [0, 1, 0]
      ),
    };
  });

  return (
    <Animated.Image
      source={{ uri: src }}
      style={[StyleSheet.absoluteFillObject, stylez]}
      blurRadius={50}
    />
  );
};
const WallPaperCarouselComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      (async () => {
        const res = await fetchPhotos();

        const photos = res.photos.map((item: any) => {
          return item.src.large;
        });

        setData(photos);
      })();
    }
  }, []);
  const activeIndex = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    activeIndex.value = e.contentOffset.x / (_imageWidth + _spacing);
  });

  if (!data) {
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={StyleSheet.absoluteFillObject}>
        {data?.map((src, index) => {
          return (
            <BackdropImage
              key={src}
              src={src}
              index={index}
              activeIndex={activeIndex}
            />
          );
        })}
      </View>
      <Animated.FlatList
        style={[{ flexGrow: 0 }]}
        horizontal
        pagingEnabled
        snapToInterval={_imageWidth + _spacing}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _imageWidth) / 2,
        }}
        keyExtractor={(item) => item}
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <ImageComponent
              src={item}
              index={index}
              activeIndex={activeIndex}
            />
          );
        }}
      />
    </View>
  );
};

export default WallPaperCarouselComponent;

const styles = StyleSheet.create({});
