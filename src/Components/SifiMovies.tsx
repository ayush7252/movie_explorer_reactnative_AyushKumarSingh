import { FlatList, StyleSheet, Text, View ,ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import BollywoodData from '../Constants/BolywoodData'
import { scale, verticalScale , width} from '../Constants/Dimensions';
import Card from './Card';
import { useSelector } from 'react-redux';

const SifiMovies = () => {

  const [allMovies, setallMovies] = useState([])
  const [AllLetest, setAllLetest] = useState([])
  const { movies } = useSelector(state => state.movies);
  useEffect(()=>{
    const fetchMovies = ()=>{ 
      setallMovies(movies);
    }
    const trendingMovies = ()=>{
      const filteredData = allMovies.filter((item)=> item.genre === "Si-Fi")
      setAllLetest(filteredData)
    }
    fetchMovies();
    trendingMovies();
  },[allMovies])
  return (
    <View style={styles.MainContainer}>
        <Text style={{color:'#fff', fontSize: scale(20), fontWeight:'bold', marginLeft:scale(10)}}>Si-Fi Movies</Text>
      <FlatList
      data={AllLetest}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <Card item={item} />
        )}
       
      />
    </View>
  )
}

export default SifiMovies

const styles = StyleSheet.create({
    MainContainer: {
        marginTop:verticalScale(20),
    },
    
})