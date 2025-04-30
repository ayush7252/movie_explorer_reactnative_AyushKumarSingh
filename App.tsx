import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplashScreen from './src/Screens/SplashScreen'
import AuthrizationScreen from './src/Screens/AuthrizationScreen'
import HomeScreen from './src/Screens/HomeScreen'
import MainNavigation from './src/Navigation/MainNavigation'
import { NavigationContainer } from '@react-navigation/native'
import FooterNavigation from './src/Navigation/FooterNavigation'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

const App = () => {
  return (
      // <SplashScreen />
      // <AuthrizationScreen />
      // <HomeScreen />
      <Provider store={store}>
        <MainNavigation />
      </Provider>
  )
}

export default App

const styles = StyleSheet.create({})