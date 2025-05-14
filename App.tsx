import { Alert, PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MainNavigation from './src/Navigation/MainNavigation'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import messaging from '@react-native-firebase/messaging';
import { StripeProvider } from '@stripe/stripe-react-native'


const App = () => {
  useEffect(()=>{
    requestpermission()
  },[])

  const requestpermission = async()=>{
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    if(granted === PermissionsAndroid.RESULTS.GRANTED){
      // Alert.alert('Permission granted')
      getToken();
    }else{
      Alert.alert('Permission denied')
    }
  };
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const getToken = async()=>{
    const token = await messaging().getToken();
    console.log("token" , token)
  }

  return (
      // <SplashScreen />
      // <AuthrizationScreen />
      // <HomeScreen />
      <StripeProvider publishableKey='pk_test_51RMMhm4Z4eanZ4WIYtfMvS6wiqyLDzEoYrRsJ2QaTauX4ZDvAqYCAcgMJjnVi24PfqR0KiTyTEHD2e2rG2CMcwp3002lBSG5J8'>
        <Provider store={store}>
        <MainNavigation />
      </Provider>
      </StripeProvider>
      // <AllMovies />
  )
}

export default App

const styles = StyleSheet.create({})