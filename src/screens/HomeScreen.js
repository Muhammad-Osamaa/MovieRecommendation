// import React from 'react';
// import {Text, View} from 'react-native';
// import DiscoverMovies from '../components/DiscoverMovies';
// import Styles from '../components/Styles';
// import TrendingPeople from '../components/TrendingPeople';

// const HomeScreen = () => {
//   return (
//     <View style={Styles.sectionBg}>
//       <DiscoverMovies />
//       {/* <TrendingPeople /> */}
//     </View>
//   );
// };
// export default HomeScreen;
// MovieSearchScreen.js
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DiscoverMovies from '../components/DiscoverMovies';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from '../assets/Colors/Constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../components/SearchBar';

const API_KEY = '125ffb0958a93add2e78c6b803f41ab9';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

function HomeScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load movie categories from AsyncStorage on component mount
    loadCategoriesFromStorage();
  }, []);

  const loadCategoriesFromStorage = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('movieCategories');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.error('Error loading movie categories:', error);
    }
  };

  const saveCategoriesToStorage = async () => {
    try {
      await AsyncStorage.setItem('movieCategories', JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving movie categories:', error);
    }
  };
  const addCategory = category => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
      saveCategoriesToStorage();
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: Constants.baseColor,
        }}>
        <TextInput
          placeholder="Search Here"
          placeholderTextColor={Constants.textColor}
          value={query}
          onChangeText={setQuery}
          color={Constants.textColor}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchBar', {query})}>
          <Icon name="search" size={20} color={Constants.textColor} />
        </TouchableOpacity>
      </View>
      <DiscoverMovies />

      <Text style={{color: 'red', fontWeight: 'bold'}}>Movie Categories:</Text>
      {categories.map((category, index) => (
        <Text key={index}>{category}</Text>
      ))}
    </View>
  );
}

export default HomeScreen;
