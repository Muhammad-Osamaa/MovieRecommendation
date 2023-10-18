import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, Animated, Easing} from 'react-native';
import Constants from '../assets/Colors/Constants';

const SplashScreen = ({navigation}) => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const delay = 2000;

    Animated.parallel([
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.elastic(2),
      }),
      Animated.timing(rotateAnim, {
        toValue: 360,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation, fadeInAnim, scaleAnim, rotateAnim]);

  const rotateStyle = {
    transform: [
      {scale: scaleAnim},
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.main, {opacity: fadeInAnim}, rotateStyle]}>
        <Text style={styles.text}>Movie Recommendation</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Constants.baseColor,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 26,
    fontStyle: 'italic',
    color: Constants.logoColor,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
