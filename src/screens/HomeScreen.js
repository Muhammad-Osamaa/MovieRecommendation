import React from 'react';
import {Text, View} from 'react-native';
import DiscoverMovies from '../components/DiscoverMovies';
import Styles from '../components/Styles';
import TrendingPeople from '../components/TrendingPeople';

const HomeScreen = () => {
  return (
    <View style={Styles.sectionBg}>
      <DiscoverMovies />
      {/* <TrendingPeople /> */}
    </View>
  );
};
export default HomeScreen;
