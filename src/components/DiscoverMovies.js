import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {IMAGE_POSTER_URL} from '../configs/tmdbConfig';
import Constants from '../assets/Colors/Constants';
import Card from './card';

const DiscoverMovies = () => {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);

  const getMovies = async () => {
    try {
      let response = await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=125ffb0958a93add2e78c6b803f41ab9',
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('data==>', data);

      const images = data.results.map(movie => ({
        poster: `${IMAGE_POSTER_URL}${movie.poster_path}`,
        title: movie.title,
      }));
      setImages(images);
      setMovies(data.results);
    } catch (error) {
      console.error('ErrorImages:', error);
    }
  };
  const getDiscoverMovies = async () => {
    try {
      let response = await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=125ffb0958a93add2e78c6b803f41ab9',
      );
      if (!response.ok) {
        throw new Error('Network response was not fine for DiscoveryMovies');
      }
      const data = await response.json();
      console.log('DiscoveryMoviesData====>>>', data);
      const movie = data.results.map(movie => ({
        poster: `${IMAGE_POSTER_URL}${movie.poster_path}`,
        title: movie.title,
      }));
      setMovies(movie);
    } catch (error) {
      console.error('ErrorMovies:', error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  useEffect(() => {
    getDiscoverMovies();
  }, []);
  return (
    <View style={styles.container}>
      <SliderBox
        images={images.map(image => image.poster)}
        dotColor={Constants.secondaryColor}
      />
      <FlatList
        data={movies}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Card movie={item} />}
      />
    </View>

    // <View>
    //   <SliderBox images={images} dotColor={Constants.secondaryColor} />
    //   <ScrollView movies={movies} />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
  },
  poster: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default DiscoverMovies;
