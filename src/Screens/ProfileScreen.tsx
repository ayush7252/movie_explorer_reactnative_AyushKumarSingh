import {Alert, Image, StyleSheet, Text, TouchableOpacity, View, Linking} from 'react-native';
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

  <View style={styles.InfoSection}>
    <Text style={styles.SectionHeading}>Name</Text>
    <Text style={styles.nameTxt}>Ayush Kumar Singh</Text>
  </View>

  <View style={styles.InfoSection}>
    <Text style={styles.SectionHeading}>Email</Text>
    <Text style={styles.nameTxt}>{userEmail}</Text>
  </View>

  <View style={styles.InfoSection}>
    <Text style={styles.SectionHeading}>Role</Text>
    <Text style={styles.nameTxt}>{userRole}</Text>
  </View>

  <Text style={styles.connectHeading}>Connect With Us</Text>

  <View style={styles.SocialContainer}>
    <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/7307585258')}>
      <Image source={require('../assets/Icons/whatsapp.png')} style={styles.socialIcon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => Linking.openURL('mailto:ayushkumarsingh793@gmail.com')}>
      <Image source={require('../assets/Icons/gmail.png')} style={styles.socialIcon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/yourpage')}>
      <Image source={require('../assets/Icons/instagram.png')} style={styles.socialIcon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/in/yourprofile')}>
      <Image source={require('../assets/Icons/linkedin.png')} style={styles.socialIcon} />
    </TouchableOpacity>
  </View>
</View>

  
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingHorizontal: verticalScale(20),
    paddingTop: verticalScale(30),
  },
  ProfileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(30),
    marginTop:verticalScale(30)
  },
  ProfilePic: {
    height: verticalScale(120),
    width: verticalScale(120),
    borderRadius: scale(80),
    borderWidth: verticalScale(3),
    borderColor: '#FFD700',
    resizeMode: 'cover',
    tintColor:'#fff'
  },
  InfoSection: {
    backgroundColor: '#1a1a1a',
    paddingVertical: verticalScale(15),
    paddingHorizontal: verticalScale(20),
    borderRadius: verticalScale(16),
    marginBottom: verticalScale(15),
    borderWidth: 1,
    borderColor: '#2f2f2f',
  },
  SectionHeading: {
    color: '#888',
    fontSize: verticalScale(12),
    marginBottom: verticalScale(5),
  },
  nameTxt: {
    color: '#fff',
    fontSize: verticalScale(18),
    fontWeight: '500',
  },
  connectHeading: {
    color: '#888',
    fontSize: verticalScale(14),
    fontWeight: '600',
    textAlign: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(10),
  },
  
  SocialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  
  socialIcon: {
    height: verticalScale(30),
    width: verticalScale(30),
    tintColor: '#FFD700',
  },
  
});

