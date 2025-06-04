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

type GenreMoviesProps = {
  data: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleReload: () => void;
};

const GenreMovies = ({data, page, setPage, handleReload}: GenreMoviesProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const {movies} = useSelector(state => state.movies);
  const perPage = 10;

  const genreMovie = useMemo(() => {
    if (!data) return [];
    return data === 'All' ? movies : movies.filter(item => item.genre === data);
  }, [data, movies]);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await GetAllMovies(page, perPage);
      console.log(response);

      if (response && response.length > 0) {
        dispatch(setMovies([...movies, ...response]));
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
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

      <FlatList
        data={genreMovie}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MovieCard data={item} testID={`movie-card-${item.id}`} handleReload={handleReload} />
        )}
        testID={`genre-movies-list-${data}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
        contentContainerStyle={{
          paddingBottom: verticalScale(150),
        }}
        ListFooterComponent={
          loading ? (
            <View
              style={{
                marginTop: verticalScale(10),
                marginBottom: verticalScale(130),
              }}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View
            style={{alignItems: 'center', marginTop: verticalScale(20)}}></View>
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
