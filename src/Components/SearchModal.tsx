import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { verticalScale } from '../Constants/Dimensions';
import MovieCard from './MovieCard';
import axios from 'axios';
import { fetchMoviesByTitle } from '../AxiosRoutes/AxiosRoutes';

const SearchModal = ({ data }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (data) {
        fetchMoviesFromAPI(data);
      } else {
        setAllMovies([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [data]);

  const fetchMoviesFromAPI = async (query: any) => {
    try {
      setLoading(true);
      const response = await fetchMoviesByTitle(query);
      setAllMovies(response);
    } catch (error) {
      console.error('API error:', error);
      setAllMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReload = () => {
    if (data) {
      fetchMoviesFromAPI(data);
    }
  };

  return (
    <View style={styles.container}>
      {data ? (
        loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={allMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard data={item} handleReload={handleReload} />}
            ListEmptyComponent={
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.text}>No Data Found for "{data}"</Text>
              </View>
            }
          />
        )
      ) : (
        <View style={styles.EnterMovieTitle}>
          <Text style={styles.text}>Enter movie title to search</Text>
        </View>
      )}
    </View>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  EnterMovieTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: verticalScale(20),
  },
  text: {
    fontSize: verticalScale(18),
    fontWeight: '500',
    color: 'rgba(227, 223, 223, 0.47)',
  },
});
