import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {GET} from '../services/API';
import {SliderBox} from 'react-native-image-slider-box';
import {IMAGE_POSTER_URL} from '../configs/tmdbConfig';
import Constants from '../assets/Colors/Constants';

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
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <View>
      <SliderBox images={images} dotColor={Constants.secondaryColor} />
    </View>
  );
};
export default DiscoverMovies;
