import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {IMAGE_POSTER_URL} from '../configs/tmdbConfig';
import Constants from '../assets/Colors/Constants';
import Card from './card';

const DiscoverMovies = () => {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const {width, height} = Dimensions.get('window');

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
      setLoading(false);
    } catch (error) {
      console.error('ErrorImages:', error);
      setLoading(false);
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
      setLoading(false);
    } catch (error) {
      console.error('ErrorMovies:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getMovies();
    getDiscoverMovies();
  }, []);
  return (
    <View style={styles.container}>
      <SliderBox
        images={images.map(image => image.poster)}
        dotColor={Constants.secondaryColor}
        sliderBoxHeight={height * 0.5}
        paginationBoxStyle={{position: 'absolute', bottom: 0}}
      />
      <Text style={styles.title}>Recommended Movies</Text>
      {loading ? (
        <ActivityIndicator size="large" color={Constants.textColor} />
      ) : (
        <FlatList
          data={movies}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <Card movie={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.baseColor,
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
    fontSize: 16,
    color: Constants.baseColor,
    padding: 5,
    fontWeight: 'bold',
  },
});
export default DiscoverMovies;
