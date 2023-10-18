import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Constants from '../assets/Colors/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const API_KEY = '125ffb0958a93add2e78c6b803f41ab9';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185'; // Adjust the image size as needed

const formatDate = dateString => {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const SearchBar = ({route}) => {
  const [query, setQuery] = useState(route.params.query);
  const [results, setResults] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}?api_key=${API_KEY}&query=${query}`,
        );
        setResults(response.data.results);
      } catch (error) {
        console.error('Error searching for movies:', error);
      }
    };
    if (query) {
      searchMovies();
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={styles.iconContainer}>
          <Ionicons
            name="arrow-back-sharp"
            size={24}
            color={Constants.baseColor}
          />
          <Text style={styles.heading}>Search Results</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.resultItem}>
            <Image
              source={{
                uri: `${IMAGE_BASE_URL}/${item.poster_path}`, // Use the poster path for the image
              }}
              style={styles.image} // Adjust the image size as needed
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.releaseDate}>
              {formatDate(item.release_date)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Constants.backgroundColor,
  },
  header: {
    paddingBottom: 10,
    elevation: 3,
  },
  heading: {
    color: Constants.baseColor,
    fontSize: 22,
    marginLeft: 16,
  },
  resultItem: {
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    color: Constants.baseColor,
    marginTop: 8,
  },
  releaseDate: {
    color: Constants.baseColor,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
});

export default SearchBar;
