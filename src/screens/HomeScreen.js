import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DiscoverMovies from '../components/DiscoverMovies';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from '../assets/Colors/Constants';
import {Colors} from '../assets/Colors';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
const API_KEY = '125ffb0958a93add2e78c6b803f41ab9';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

function HomeScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const toastRef = useRef(null);

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
  const handleSearch = () => {
    if (query.trim() === '') {
      console.log('Empty query detected');
      if (toastRef.current) {
        toastRef.current.show({
          type: 'info',
          position: 'bottom',
          text1: 'Please enter a movie name for searching',
          visibilityTime: 3000,
          autoHide: true,
          customStyles: {
            text1: {
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff',
            },
            container: {
              backgroundColor: 'darkblue',
              borderWidth: 1,
              borderColor: 'white',
            },
          },
        });
      } else {
        navigation.navigate('SearchBar', {query});
        setQuery('');
      }
    }
    return (
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
              <Icon
                name="search"
                size={20}
                color={Constants.logoColor}
                style={styles.searchIcon}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.searchInput}
              placeholder="Search Here"
              placeholderTextColor={Constants.logoColor}
              value={query}
              onChangeText={setQuery}
              color={Constants.textColor}
            />
            <Text style={styles.header}>Movies</Text>
          </View>
          <DiscoverMovies />
        </View>
        <Toast ref={toastRef} />
      </KeyboardAwareScrollView>
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.baseColor,
  },
  header: {
    flex: 2,
    color: Constants.logoColor,
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Constants.borderColor,
  },
  searchInput: {
    flex: 1,
    paddingRight: 10,
    color: Constants.textColor,
  },
  searchIcon: {
    marginRight: 5,
  },
});
export default HomeScreen;
