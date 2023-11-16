import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import Constants from '../assets/Colors/Constants';

const SplashScreen = ({navigation}) => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const animationDuration = 1000;
    const easingFunction = Easing.inOut(Easing.ease);

    const fadeInAnimation = Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: animationDuration,
      easing: easingFunction,
      useNativeDriver: true,
    });

    const scaleAnimation = Animated.timing(scaleAnim, {
      toValue: 1.2,
      duration: animationDuration,
      easing: easingFunction,
      useNativeDriver: true,
    });
    const bounceAnimation = Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 1,
      tension: 20,
      useNativeDriver: true,
    });

    Animated.parallel([
      fadeInAnimation,
      scaleAnimation,
      bounceAnimation,
    ]).start();

    const delay = 2000;
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation, fadeInAnim, scaleAnim, bounceAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.main,
          {opacity: fadeInAnim, transform: [{scale: scaleAnim}]},
        ]}>
        <Animated.Text
          style={[styles.text, {transform: [{scale: bounceAnim}]}]}>
          Movie Recommendation
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.baseColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
