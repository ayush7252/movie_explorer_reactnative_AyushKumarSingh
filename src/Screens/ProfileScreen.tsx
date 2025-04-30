import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale } from '../Constants/Dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen = () => {

  const [userEmail, setuserEmail] = useState('')
  const [userRole, setuserRole] = useState('')
  useEffect(()=> {
    const getUserData = async()=>{
      try{
        const email = await AsyncStorage.getItem('userEmail')
        setuserEmail(email)
        const role = await AsyncStorage.getItem('userRole')
        setuserRole(role);
        
      }catch(err){
        Alert.alert('Error fetching data');
      }
    };
    getUserData();
  },[]);
  return (
    <View style={styles.MainContainer}>
      <View style={styles.ProfileImageContainer}>
        <Image 
        source={require('../assets/Icons/user.png')}
        style={styles.ProfilePic}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{userRole}</Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>{userEmail}</Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>Ayush Kumar Singh</Text>
      </View>
      
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor:'#000',
    paddingHorizontal:verticalScale(20)
  },
  ProfileImageContainer: {
    height:verticalScale(250),
    justifyContent:'center',
    alignItems:'center',
  },
  ProfilePic: {
    height:verticalScale(100),
    width:verticalScale(100),
    borderRadius: scale(70),
    borderWidth:verticalScale(3),
    tintColor:'#fff',
    borderColor:'#fff',
  },
  nameContainer: {
    height:verticalScale(50),
    backgroundColor:'#3C3D37',
    borderRadius:verticalScale(30),
    borderWidth:(3),
    borderColor:'grey',
    justifyContent:'center',
    paddingHorizontal:verticalScale(20)
  },
  nameTxt: {
    fontSize:verticalScale(22),
    lineHeight:verticalScale(20),
    color:'#fff'
  }
  
});
