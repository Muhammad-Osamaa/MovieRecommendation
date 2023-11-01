import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const searchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}?api_key=${API_KEY}&query=${query}`,
        );
        setResults(response.data.results);
      } catch (error) {
        console.error('Error searching for movies:', error);
      } finally {
        setLoading(false);
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
            color={Constants.logoColor}
          />
          <Text style={styles.heading}>Search Results</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={Constants.textColor}
        />
      ) : (
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
      )}
    </View>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Constants.baseColor,
  },
  header: {
    paddingBottom: 10,
    elevation: 3,
  },
  heading: {
    color: Constants.logoColor,
    fontSize: 22,
    marginLeft: 16,
    fontWeight: 'bold'
  },
  resultItem: {
    marginBottom: 20,
  },
  image: {
    width: width - 32,
    height: (width - 32) * 1.5,
    borderRadius: 8,
    marginTop:10,
  },
  title: {
    fontSize: 18,
    color: Constants.textColor,
    marginTop: 8,
    fontWeight: 'bold',
  },
  releaseDate: {
    color: Constants.textColor,
    fontWeight: '600',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
