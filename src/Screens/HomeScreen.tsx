import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import HorizontalSlider from '../Components/HorizontalSlider'
import Card from '../Components/Card'
import Carousel from '../Components/Carousel'
import LatestMovies from '../Components/LatestMovies'

import FooterNavigation from '../Navigation/FooterNavigation'
import { NavigationContainer } from '@react-navigation/native'
import ActionMovies from '../Components/ActionMovies'
import ComedyMovies from '../Components/ComedyMovies'

const HomeScreen = () => {
  return (
    <View style={styles.container} testID="home-container">
      <Header />
      <ScrollView>
      {/* <HorizontalSlider /> */}
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