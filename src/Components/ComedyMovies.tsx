import { FlatList, StyleSheet, Text, View ,ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import BollywoodData from '../Constants/BolywoodData'
import { scale, verticalScale , width} from '../Constants/Dimensions';
import Card from './Card';
import { useSelector } from 'react-redux';

const ComedyMovies = () => {

  const [allMovies, setallMovies] = useState<{ id: number; genre: string; [key: string]: any }[]>([])
  const [AllLetest, setAllLetest] = useState<{ id: number; genre: string; [key: string]: any }[]>([])
  const { movies } = useSelector(state => state.movies);
  useEffect(()=>{
    const fetchMovies = ()=>{ 
      setallMovies(movies);
    }
    const trendingMovies = ()=>{
      const filteredData = allMovies.filter((item)=> item.genre === "Comedy")
      setAllLetest(filteredData)
    }
    fetchMovies();
    trendingMovies();
  },[allMovies])
  return (
    <View style={styles.MainContainer}>
        <Text style={{color:'#fff', fontSize: scale(20), fontWeight:'bold', marginLeft:scale(10)}}>Comedy Movies</Text>
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

export default ComedyMovies

const styles = StyleSheet.create({
    MainContainer: {
        marginTop:verticalScale(20),
    },
    
})