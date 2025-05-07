import { Alert, PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MainNavigation from './src/Navigation/MainNavigation'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import messaging from '@react-native-firebase/messaging';


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
      <Provider store={store}>
        <MainNavigation />
      </Provider>
      // <AllMovies />
  )
}

export default App

const styles = StyleSheet.create({})