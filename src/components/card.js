import React, {useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IMAGE_POSTER_URL} from '../configs/tmdbConfig';
import Constants from '../assets/Colors/Constants';

const Card = ({movie}) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <View style={styles.cardContainer}>
      <FastImage
        style={[styles.poster, {opacity: loading ? 0 : 1}]}
        source={{
          uri: `${IMAGE_POSTER_URL}${movie.poster_path}`,
          priority: FastImage.priority.low,
        }}
        onLoad={handleImageLoad}
        onError={handleImageLoad}
      />
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Constants.baseColor} />
        </View>
      )}
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {movie.title}
      </Text>
    </View>
  );
};
const cardWidth = 150;
const cardHeight = 240;

const styles = StyleSheet.create({
  cardContainer: {
    width: cardWidth,
    height: cardHeight,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  poster: {
    width: cardWidth - 20,
    height: cardHeight - 50,
    borderRadius: 8,
    borderColor: Constants.logoColor,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    maxWidth: cardWidth - 20,
    color: Constants.textColor,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});

export default Card;
