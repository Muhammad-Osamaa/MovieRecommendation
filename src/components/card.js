import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {IMAGE_POSTER_URL} from '../configs/tmdbConfig';
import Constants from '../assets/Colors/Constants';

const Card = ({movie}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [movie]);
  return (
    <View style={styles.cardContainer}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Constants.textColor} />
        </View>
      )}
      <Image
        style={[styles.poster, {opacity: loading ? 0 : 1}]}
        source={{uri: `${IMAGE_POSTER_URL}${movie.poster_path}`}}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
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
    position: 'relative',
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
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.primaryColor,
  },
});

export default Card;
