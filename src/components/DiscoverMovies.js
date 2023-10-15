import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {GET} from '../services/API';
import {SliderBox} from 'react-native-image-slider-box';

const DiscoverMovies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const response = await GET('https://api.themoviedb.org/3/discover/movie');
      setMovies(response.results);
    };

    getMovies();
  }, []);
  return (
    <View>
      <Text>Discover Movies</Text>
    </View>
  );
};
export default DiscoverMovies;
