import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale } from '../Constants/Dimensions';
import Card from './Card';
import { useSelector } from 'react-redux';

const LatestMovies = () => {
  const [AllLetest, setAllLetest] = useState([]);
  const { movies } = useSelector(state => state.movies);

  useEffect(() => {
    const trendingMovies = () => {
      const filteredData = movies.filter((item: { release_year: number; }) => item.release_year >= 2020);
      setAllLetest(filteredData);
    };
    trendingMovies();
  }, [movies]);

  return (
    <View style={styles.MainContainer}>
      <Text style={{ color: '#fff', fontSize: scale(20), fontWeight: 'bold', marginLeft: scale(10) }}>
        Latest Release
      </Text>
      <FlatList
        data={AllLetest}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    marginTop: verticalScale(20),
  },
});

export default LatestMovies;
