import React, { useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Animated } from 'react-native';
import slides from './SlidesData';
import OnBoardingItem from './OnBoardingItem';
import Paginator from './Paginator';
import { LinearGradient } from 'expo-linear-gradient';

function OnBoarding() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
          
          <LinearGradient
      colors={["#EE9CA7", "#FFDDE1"]}
      start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}

          >

      <FlatList
        data={slides}
        renderItem={({ item }) => <OnBoardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        />
      <View style={styles.dots}>
      <Paginator  data={slides} scrollX={scrollX} />

      </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots  :{
    marginBottom : 10 ,
  },
});

export default OnBoarding;
