import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/HomeScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import PremiumScreen from '../Screens/PremiumScreen'
import AllMovies from '../Screens/AllMovies'
import {scale , verticalScale , width , height} from '../Constants/Dimensions'

const Tab = createBottomTabNavigator()

const FooterNavigation = () => {
  return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle : {
                position: 'absolute',
                bottom: verticalScale(25),
                marginHorizontal: scale(20),
                height: verticalScale(45),
                backgroundColor: 'rgba(35, 35, 35, 0.85)',
                borderRadius: verticalScale(30),
                paddingTop:verticalScale(5)
            },
            tabBarShowLabel: false,
        }} 
         >
            <Tab.Screen name="Home" component={HomeScreen} 
            options={{headerShown:false,
                    tabBarIcon: ({focused}) => (
                        <Image
                        source={require('../assets/Icons/home.png')}
                        style={{height:verticalScale(20),
                                width: verticalScale(20),
                                tintColor:focused ? '#FFD700' : '#fff'}}
                        />
                    )
            }}/>
            <Tab.Screen name="Premium" component={PremiumScreen} 
            options={{headerShown:false,
                tabBarIcon: ({focused}) => (
                    <Image
                    source={require('../assets/Icons/premium.png')}
                    style={{height:verticalScale(20),
                            width: verticalScale(20),
                            tintColor:focused ? '#FFD700' : '#fff'}}
                    />
                )
            }}/>
            <Tab.Screen name="AllMovies" component={AllMovies} 
            options={{headerShown:false,
                tabBarIcon: ({focused}) => (
                    <Image
                    source={require('../assets/Icons/List.png')}
                    style={{height:verticalScale(20),
                            width: verticalScale(20),
                            tintColor:focused ? '#FFD700' : '#fff'}}
                    />
                )
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} 
            options={{headerShown:false,
                tabBarIcon: ({focused}) => (
                    <Image
                    source={require('../assets/Icons/user.png')}
                    style={{height:verticalScale(20),
                            width: verticalScale(20),
                            tintColor:focused ? '#FFD700' : '#fff'}}
                    />
                )
            }}/>
        </Tab.Navigator>
  )
}

export default FooterNavigation

const styles = StyleSheet.create({
    icon: {
        
    }
})