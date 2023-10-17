import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {IMAGE_POSTER_URL} from '../configs/tmdbConfig';
import Constants from '../assets/Colors/Constants';
import {ScrollView} from 'react-native';
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

      const images = data.results.map(movie => {
        return `${IMAGE_POSTER_URL}${movie.poster_path}`;
      });
      setImages(images);
    } catch (error) {
      console.error('ErrorImages:', error);
    }
  };
  const getDiscoverMovies = async () => {
    try {
      let response = await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=125ffb0958a93add2e78c6b803f41ab9',
      );
      if (!response.fine) {
        throw new Error('Network response was not fine for DiscoveryMovies');
      }
      const data = await response.json();
      console.log('DiscoveryMoviesData====>>>', data);
      const movie = data.results.map(movie => {
        return `${IMAGE_POSTER_URL}${movie.poster_path}`;
      });
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
    <ScrollView style={styles.container}>
      <SliderBox images={images} dotColor={Constants.secondaryColor} />
      <View style={styles.cardContainer}>
        {movies.map((movie, index) => (
          <Card key={index} movie={movie} />
        ))}
      </View>
    </ScrollView>
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
    padding: 20,
  },
});
export default DiscoverMovies;
