import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../Components/Header'
import Carousel from '../Components/Carousel'
import LatestMovies from '../Components/LatestMovies'
import ActionMovies from '../Components/ActionMovies'
import ComedyMovies from '../Components/ComedyMovies'

const HomeScreen = () => {
  return (
    <View style={styles.container} testID="home-container">
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
      <Carousel />
      <LatestMovies />
      <ActionMovies />
      <ComedyMovies />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#000'
    }
})