import {ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    width,
    height,
    scale,
    verticalScale,
    moderateScale,
  } from '../Constants/Dimensions';
const SplashScreen = ({navigation}) => {

    const isTablet = width >= 600 

  return (
    <ImageBackground
        source={require('../assets/Images/Movie_Background.jpg')}
        style = {styles.background}
        resizeMode="cover"
        blurRadius={2}
        >
            <View style={styles.topContainer}>
                <Text style={[styles.title , isTablet && styles.titleTablet]}>Welcome to Movie Explorer</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={[styles.subtitle , isTablet && styles.subtitleTablet]}>Discover your next favorite movie</Text>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Auth')}}>
                    <Text style={styles.BtnText}>Get Started</Text>
                </TouchableOpacity>
            </View>

    </ImageBackground>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:verticalScale(50),
    },
    bottomContainer: {
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        paddingBottom:verticalScale(50),
    },
    title: {
        fontSize:moderateScale(28),
        fontWeight:"bold",
        color: 'white',
        marginBottom:verticalScale(10),
        textAlign:'center',
    },
    titleTablet: {
        fontSize: moderateScale(36),
        marginBottom: verticalScale(15),
      },
      subtitle: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        color: '#f8c537',
        marginBottom: verticalScale(35),
        textAlign: 'center',
      },
      subtitleTablet: {
        fontSize: moderateScale(28),
        marginBottom: verticalScale(20),
      },
      button: {
        backgroundColor: '#ffffff30',
        width: verticalScale(250),
        borderRadius:verticalScale(30),
        height:50,
        justifyContent:'center',
        paddingTop:verticalScale(7)
      },
      BtnText: {
        fontSize:moderateScale(23),
        color: 'white',
        marginBottom:verticalScale(10),
        textAlign:'center',
      }
})