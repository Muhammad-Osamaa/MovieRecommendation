import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {IMAGE_POSTER_URL} from '../configs/tmdbConfig';

const Card = ({movie}) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.poster}
        source={{uri: `${IMAGE_POSTER_URL}${movie.poster_path}`}}
      />
      <Text style={styles.title}>{movie.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
  },
  poster: {
    width: 150,
    height: 200,
    borderRadius: 8,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Card;
