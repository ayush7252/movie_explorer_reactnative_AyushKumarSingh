import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { scale, verticalScale } from '../Constants/Dimensions';
import GenreMovies from '../Components/GenreMovies';

const genres = [
  'All',
  'Bollywood',
  'Action',
  'Thriller',
  'Adventure',
  'Horror',
  'Drama',
  'Romance',
];

const AllMovies = () => {
  const [SelectedGenre, setSelectedGenre] = useState('All');

  return (
    <View style={styles.MainContainer}>
      <View style={styles.subcontainer}>
        <Text style={styles.MainTitle}>All Movies</Text>
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: verticalScale(10)}}>
          {genres.map((genre, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.block,
                SelectedGenre === genre && styles.selectedBlock,
              ]}
              onPress={() => setSelectedGenre(genre)}
            >
              <Text
                style={styles.blockText}
              >
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <GenreMovies data={SelectedGenre}/>
      </View>
    </View>
  );
};

export default AllMovies;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  Title: {
    fontSize: verticalScale(70),
    fontWeight: 'bold',
    color: '#fff',
  },
  MainTitle: {
    fontSize: verticalScale(30),
    fontWeight: 'bold',
    color: '#fff',
  },
  subcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: verticalScale(10),
    paddingTop: verticalScale(30),
  },
  block: {
    backgroundColor: '#fff',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: verticalScale(20),
    marginRight: verticalScale(10),
    height : scale(38)
  },
  selectedBlock: {
    backgroundColor: '#FFD700', 
  },
  blockText: {
    color: '#000',
    fontWeight: 'bold',
    lineHeight: verticalScale(10),
  },
});
