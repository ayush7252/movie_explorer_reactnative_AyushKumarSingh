
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../Screens/HomeScreen'
import SplashScreen from '../Screens/SplashScreen'
import AuthrizationScreen from '../Screens/AuthorizationScreen'
import FooterNavigation from './FooterNavigation'
import Payment from '../Components/Payment'

const MainNavigation = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer >
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Auth" component={AuthrizationScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Footer" component={FooterNavigation} options={{headerShown:false}}/>
            <Stack.Screen name="Payment" component={Payment} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation