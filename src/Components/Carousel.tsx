import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { verticalScale, width } from '../Constants/Dimensions';
import CarouselCard from './CarouselCard';

const Carousel = () => {
  const [allMovies, setallMovies] = useState([]);
  const [AllCarousel, setAllCarousel] = useState([]);

  const { movies } = useSelector(state => state.movies);

  useEffect(() => {
    setallMovies(movies);
  }, [movies]);

  useEffect(() => {
    const filteredData = allMovies.filter(item => item.rating >= 8);
    setAllCarousel(filteredData);
  }, [allMovies]);

  return (
    <View testID="carousel-container">
      <Text style={styles.title} testID="carousel-title">Trending Movies</Text>
      <FlatList
        testID="carousel-flatlist"
        data={AllCarousel}
        horizontal
        pagingEnabled={true}
        snapToAlignment="center"
        snapToInterval={width}
        decelerationRate="normal"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 1 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CarouselCard item={item} testID={`carousel-card-${item.id}`} />
        )}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: verticalScale(20),
    borderRadius: verticalScale(12),
    overflow: 'hidden',
    width: width - verticalScale(40),
  },
  title: {
    fontSize: verticalScale(18),
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: verticalScale(10),
    marginLeft: verticalScale(20),
  },
  poster: {
    width: '100%',
    height: verticalScale(300),
  },
  icon: {
    width: verticalScale(15),
    height: verticalScale(15),
  },
  Views: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: verticalScale(5),
    borderRadius: verticalScale(20),
    borderWidth: verticalScale(1),
    borderColor: '#000',
    top: verticalScale(10),
    right: verticalScale(10),
  },
  MovieTitle: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: verticalScale(10),
    left: verticalScale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: verticalScale(10),
    width: verticalScale(240),
    paddingHorizontal: verticalScale(10),
    borderRadius: verticalScale(20),
    borderWidth: verticalScale(1),
    borderColor: '#000',
  },
  Modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  ModalIcon: {
    width: verticalScale(25),
    height: verticalScale(25),
    tintColor: '#fff',
  },
  rightMovieTitle: {
    backgroundColor: 'rgba(133, 132, 132, 0.5)',
    padding: verticalScale(4),
    borderRadius: verticalScale(20),
  },
  ModalContainer: {
    height: verticalScale(450),
    width: verticalScale(300),
    borderRadius: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  ModalCloseIcon: {
    width: verticalScale(25),
    height: verticalScale(25),
    bottom: verticalScale(10),
  },
});
