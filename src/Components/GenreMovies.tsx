import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import MovieCard from './MovieCard';
import {GetAllMovies} from '../AxiosRoutes/AxiosRoutes';
import {verticalScale} from '../Constants/Dimensions';

// redux
import {useDispatch, useSelector} from 'react-redux';
import {setMovies} from '../redux/slices/movieSlice';

const GenreMovies = ({data, page, setPage}) => {
  const dispatch = useDispatch();
  const {movies} = useSelector(state => state.movies);
  const [loading, setLoading] = useState(false);
  const perPage = 10;

  const genreMovie = useMemo(() => {
    if (!data) return [];
    return data === 'All' ? movies : movies.filter(item => item.genre === data);
  }, [data, movies]);

  const handleLoadMore = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await GetAllMovies(page, perPage);
      console.log(response);
      if (response) {
        const newMovies = response;
        dispatch(setMovies([...movies, ...newMovies]));
        setPage(prev => prev + 1);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load more movies');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={styles.MainContainer}
      testID={`genre-movies-container-${data}`}>
      <Text
        style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}
        testID={`genre-movies-title-${data}`}>
        {data} Movies
      </Text>

      <FlatList
        data={genreMovie}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MovieCard data={item} testID={`movie-card-${item.id}`} />
        )}
        testID={`genre-movies-list-${data}`}
        ListFooterComponent={
          <View
            style={{
              marginTop: verticalScale(10),
              marginBottom: verticalScale(130),
            }}>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <TouchableOpacity
                style={styles.LoadMore}
                onPress={handleLoadMore}
                disabled={loading}>
                <Text style={{color: '#fff', fontSize: verticalScale(15)}}>
                  Load More
                </Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </View>
  );
};

export default GenreMovies;

const styles = StyleSheet.create({
  MainContainer: {
    height: '92%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
  },
  LoadMore: {
    height: verticalScale(40),
    width: verticalScale(100),
    borderRadius: verticalScale(30),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
