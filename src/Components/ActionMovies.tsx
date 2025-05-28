import { FlatList, StyleSheet, Text, View ,ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale, verticalScale , width} from '../Constants/Dimensions';
import Card from './Card';
import { useSelector } from 'react-redux';

const ActionMovies = () => {

  const [allMovies, setallMovies] = useState([])
  const [AllLetest, setAllLetest] = useState([])
  const { movies } = useSelector(state => state.movies);
  useEffect(()=>{
    const fetchMovies = ()=>{ 
      setallMovies(movies);
    }
    const trendingMovies = ()=>{
      const filteredData = allMovies.filter((item)=> item.genre === "Action")
      setAllLetest(filteredData)
    }
    fetchMovies();
    trendingMovies();
  },[allMovies])
  return (
    <View style={styles.MainContainer} testID='MainContainer'>
        <Text style={{color:'#fff', fontSize: scale(20), fontWeight:'500', marginLeft:scale(10)}}>Action Movies</Text>
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

export default ActionMovies

const styles = StyleSheet.create({
    MainContainer: {
        marginTop:verticalScale(20),
    },
    
})