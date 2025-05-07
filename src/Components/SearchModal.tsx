import { FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale, verticalScale } from '../Constants/Dimensions'
import BollywoodData from '../Constants/BolywoodData'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux'

const SearchModal = ({data}) => {
    const { movies } = useSelector(state => state.movies); 
  const [AllMovies, setAllMovies] = useState([]);

  useEffect(() => {
    if (data) {
      const filteredData = movies.filter(item =>
        item.title.toLowerCase().includes(data.toLowerCase())
      );
      setAllMovies(filteredData);
    } else {
      setAllMovies([]);
    }
  }, [data, movies]); 
  return (
    <View style={styles.container}>
        {data ? (
            <FlatList
                data={AllMovies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <MovieCard data={item} />
                )}
                ListEmptyComponent={<View style={{alignItems:'center'}}><Text style={styles.text}>No Data Found for "{data}"</Text></View>}
             />
        ) : (
            <View style={styles.EnterMovieTitle}>
                <Text style={styles.text}>Enter movie title to search</Text>
            </View>
        )}

    </View>
  )
}

export default SearchModal

const styles = StyleSheet.create({
    container: {
        flex:1,
        // backgroundColor: '#000',
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
    }
})