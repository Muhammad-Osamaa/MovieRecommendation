import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {IMAGE_POSTER_URL} from '../configs/tmdbConfig';
import Constants from '../assets/Colors/Constants';

const Card = ({movie}) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.poster}
        source={{uri: `${IMAGE_POSTER_URL}${movie.poster_path}`}}
      />
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
    backgroundColor: Constants.textColor,
  },
  poster: {
    width: cardWidth - 20,
    height: cardHeight - 50,
    borderRadius: 8,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: cardWidth - 20,
    color: Constants.baseColor,
  },
});

export default Card;
