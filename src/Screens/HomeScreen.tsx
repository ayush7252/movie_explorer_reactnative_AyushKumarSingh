import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import HorizontalSlider from '../Components/HorizontalSlider'
import Card from '../Components/Card'
import Carousel from '../Components/Carousel'
import BollywoodCard from '../Components/BollywoodCard'

import FooterNavigation from '../Navigation/FooterNavigation'
import { NavigationContainer } from '@react-navigation/native'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
      {/* <HorizontalSlider /> */}
      <Carousel />
      <BollywoodCard />
      <BollywoodCard />
      <BollywoodCard />
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