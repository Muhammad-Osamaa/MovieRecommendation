import React, {useState, useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import axios from 'axios';
import Constants from '../assets/Colors/Constants';

const API_KEY = '125ffb0958a93add2e78c6b803f41ab9';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

const SearchBar = ({route}) => {
  const [query, setQuery] = useState(route.params.query);
  const [results, setResults] = useState([]);

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
    <View>
      <Text style={{color: Constants.baseColor, fontSize: 22}}>
        Search Results
      </Text>

      <FlatList
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.release_date}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchBar;
