import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  width,
  verticalScale,
  moderateScale,
} from '../Constants/Dimensions';
import { GetAllMovies } from '../AxiosRoutes/AxiosRoutes';
import { useDispatch } from 'react-redux';
import { setMovies } from '../redux/slices/movieSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const isTablet = width >= 600;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Redux movie fetching
  useEffect(() => {
    const FetchMovie = async () => {
      try {
        const data = await GetAllMovies();
        dispatch(setMovies(data));
      } catch (error) {
        console.log(error);
      }
    };
    FetchMovie();
    handleUser();
  }, []);

  const handleUser = () => {
    setLoading(true); 
    setTimeout(async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        if (role) {
          navigation.navigate('Footer');
        } else {
          navigation.navigate('Home');
        }
      } catch (error) {
        console.log('Error fetching role:', error);
        navigation.navigate('Auth');
      } finally {
        setLoading(false);
      }
    }, 3500);
  };

  return (
    <ImageBackground
      source={require('../assets/Images/Background5.jpg')}
      style={styles.background}
      resizeMode="cover"
      blurRadius={1}
    >
      <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: verticalScale(300), flex: 1 }}>
        <View style={styles.topContainer}>
          <Text style={[styles.title, isTablet && styles.titleTablet]}>
            Welcome to Movie Explorer
          </Text>
          <View style={styles.LogoContainer}>
            <Image
            source={require('../assets/Images/a.png')}
            style= {styles.logo}
             />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {loading ? (
            <ActivityIndicator size={50} color="#f8c537" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleUser}>
              <Text style={styles.BtnText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: verticalScale(50),
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: verticalScale(50),
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  titleTablet: {
    fontSize: moderateScale(36),
    marginBottom: verticalScale(15),
  },
  button: {
    backgroundColor: '#ffffff50',
    width: verticalScale(250),
    borderRadius: verticalScale(30),
    height: 50,
    justifyContent: 'center',
    paddingTop: verticalScale(7),
  },
  BtnText: {
    fontSize: moderateScale(23),
    color: 'white',
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  LogoContainer: {
    height:verticalScale(200),
    width:verticalScale(300),
    // backgroundColor:'red',
    marginTop:verticalScale(60),
    // borderRadius:verticalScale(100),
    alignItems:'center',
    justifyContent:'center',
    overflow:'hidden'
  },
  logo: {
    height:verticalScale(400),
    width: verticalScale(300),
    resizeMode:'contain',
    tintColor:'#fff'
  }
});
