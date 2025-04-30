import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BollywoodData from '../Constants/BolywoodData'
import CoruselData from '../Constants/CarouselData'
import SearchCard from './SearchCard'

type movie = {
    id: number;
    name: string;
    image: string;
    type: string;
    year ?: number;
    rating ?: number;
    actor ?: string;
    description ?: string;
    views: string | number;
}

const GenreMovies = ({data}) => {
    if (!data) return null;

    let movies: movie[] = [];

    if (data === 'Bollywood') {
        movies = BollywoodData;
    } else if (data === 'Corusel') {
        movies = CoruselData;
    } else if (data === 'All') {
        movies = [...CoruselData,...BollywoodData];
    }
  return (
    <View style={styles.MainContainer}>
        <Text style={{color:'#000', fontSize: 20, fontWeight: 'bold'}}>{data} Movies</Text>
        <ScrollView>
        {movies.map((item, index) => (
            <SearchCard key={index} data={item}/>
        ))}
        </ScrollView>
    </View>
  )
}

export default GenreMovies

const styles = StyleSheet.create({
    MainContainer: {
        height :'92%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
    }
})