import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {width, verticalScale, moderateScale} from '../Constants/Dimensions';
import {GetAllMovies, getSubscriptionStatus} from '../AxiosRoutes/AxiosRoutes';
import {useDispatch} from 'react-redux';
import {setMovies} from '../redux/slices/movieSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const SplashScreen = ({navigation}) => {
  const isTablet = width >= 600;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const checkInternetAndFetch = async () => {
    const netState = await NetInfo.fetch();

    if (!netState.isConnected) {
      ToastAndroid.show('No Internet Connection', ToastAndroid.LONG);
      setLoading(false);
      return;
    }

    const FetchMovie = async () => {
      setLoading(true);
      try {
        const data = await GetAllMovies();
        dispatch(setMovies(data));

        const role = await AsyncStorage.getItem('userRole');
        if (role) {
           await fetchSubscriptionStatus();
          navigation.replace('Footer');
        } else {
          navigation.replace('Home');
        }
      } catch (error) {
        console.log('Error:', error);
        navigation.replace('Auth');
      } finally {
        setLoading(false);
      }
    };

    const fetchSubscriptionStatus = async () => {
      try {
        const response = await getSubscriptionStatus();
        console.log('Subscription Status:', response.plan_type);
        const subStatus = "premium"
        await AsyncStorage.setItem('SubscriptionStatus', subStatus);
      } catch (error) {
        ToastAndroid.show('Loading Data', ToastAndroid.SHORT);
      }
    };

    await FetchMovie();
  };

  checkInternetAndFetch();
}, [loading]);


  return (
    <ImageBackground
      source={require('../assets/Images/bg2.jpg')}
      style={styles.background}
      resizeMode="cover">
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          width: verticalScale(300),
          flex: 1,
        }}>
        <View style={styles.topContainer}>
          <Text style={[styles.title, isTablet && styles.titleTablet]}>
            Welcome to Movie Explorer
          </Text>
          <View style={styles.LogoContainer}>
            <Image
              source={require('../assets/Images/a.png')}
              style={styles.logo}
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <ActivityIndicator size={50} color="#f8c537" animating={loading} />
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
  LogoContainer: {
    height: verticalScale(200),
    width: verticalScale(300),
    marginTop: verticalScale(60),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    right: verticalScale(30),
  },
  logo: {
    height: verticalScale(400),
    width: verticalScale(300),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
});
