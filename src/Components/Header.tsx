import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import {
  width,
  scale,
  verticalScale,
  moderateScale,
} from '../Constants/Dimensions';
import { useNavigation } from '@react-navigation/native';
import SearchModal from './SearchModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isTablet = width >= 768;

const Header = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [SearchVisible, setSearchVisible] = useState(false);
  const [isGuest, setisGuest] = useState(false);

  const handlleBackPress = () => {
    setSearchVisible(false);
    setSearchText('');
  }

  const handleLogout = async() => {
    try {
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('currentUser');
      Alert.alert('Are you sure', 'You want to logout?', [
        {
          text: 'Cancel',
          onPress: () =>ToastAndroid.show('Logout cancelled', ToastAndroid.SHORT),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            ToastAndroid.show('Logout successful', ToastAndroid.SHORT);
            navigation.replace('Auth');
          },
        },
      ]);
      // navigation.replace('Auth');
    } catch (error) {
      Alert.alert('Logout failed', 'Something went wrong while logging out.')
    }
  }

  const handleSearch = async () => {
    const role = await AsyncStorage.getItem('userRole');
    if (role === 'user' || role === 'supervisor') {
      setSearchVisible(!SearchVisible);
    } else {
      Alert.alert('To access this feature, you need to login to the app.');
    }
  }

  useEffect(() => {
    const Guest = async () => {
      const role = await AsyncStorage.getItem('userRole');
      if (role === 'user' || role === 'supervisor') {
        setisGuest(true);
      }
    }
    Guest()
  }, []);

  return (
    <View
      style={[
        styles.container,
        isTablet && styles.tabletContainer,
      ]}
      testID="header-container"
    >
      <TouchableOpacity
        style={[
          styles.iconWrapper,
          isTablet && styles.tabletIconWrapper,
        ]}
        testID="home-icon-wrapper"
      >
        <Image
          source={require('../assets/Icons/www.png')}
          style={[
            styles.icon,
            isTablet && styles.tabletIcon,
          ]}
          testID="home-icon"
        />
      </TouchableOpacity>
      <Text style={styles.Heading} testID="heading">
        Movie <Text style={{color:'#FFD700'}}>Explorer</Text>
      </Text>
      <TouchableOpacity
        style={[
          styles.iconWrapper,
          isTablet && styles.tabletIconWrapper,
        ]}
        onPress={() => handleSearch()}
        testID="search-icon-wrapper"
      >
        <Image
          source={require('../assets/Icons/search.png')}
          style={[
            styles.icon,
            {height: verticalScale(19), width: verticalScale(19)},
            isTablet && styles.tabletIcon,
          ]}
          testID="search-icon"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconWrapper,
          isTablet && styles.tabletIconWrapper,
        ]}
        onPress={() => { handleLogout() }}
        testID="logout-icon-wrapper"
      >
        {isGuest ? (
          <Image
            source={require('../assets/Icons/logout.png')}
            style={[
              styles.icon,
              {height: verticalScale(19), width: verticalScale(19)},
              isTablet && styles.tabletIcon,
            ]}
            testID="logout-icon"
          />
        ) : (
          <Image
            source={require('../assets/Icons/login.png')}
            style={[
              styles.icon,
              {height: verticalScale(19), width: verticalScale(19)},
              isTablet && styles.tabletIcon,
            ]}
            testID="login-icon"
          />
        )}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={SearchVisible}
        testID="search-modal"
      >
        <View style={styles.ModalContainer}>
          <View style={styles.Container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderBottomWidth: verticalScale(1),
                borderBottomColor: '#181C14',
                width: '100%',
                paddingBottom: verticalScale(10),
              }}
            >
              <TouchableOpacity onPress={() => handlleBackPress()} testID="back-button">
                <Image
                  source={require('../assets/Icons/left-arrow.png')}
                  style={{
                    width: verticalScale(20),
                    height: verticalScale(20),
                    marginRight: scale(10),
                    tintColor: '#fff',
                  }}
                  testID="back-arrow"
                />
              </TouchableOpacity>
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search for movies ..."
                placeholderTextColor="#fff"
                style={[styles.Search, isTablet && styles.SearchTablet]}
                testID="search-input"
              />
            </View>
            <SearchModal data={searchText} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(70),
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: verticalScale(20),
  },
  tabletContainer: {
    height: verticalScale(80),
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(20),
  },
  iconWrapper: {
    padding: moderateScale(8),
  },
  tabletIconWrapper: {
    padding: moderateScale(12),
  },
  icon: {
    width: scale(28),
    height: scale(28),
    tintColor: '#fff',
  },
  tabletIcon: {
    width: scale(22),
    height: scale(22),
  },
  Search: {
    width: '90%',
    height: verticalScale(34),
    backgroundColor: 'rgba(193, 189, 189, 0.3)',
    borderRadius: scale(20),
    paddingHorizontal: scale(15),
    fontSize: moderateScale(16),
    color: '#fff',
  },
  SearchTablet: {
    width: '70%',
    height: verticalScale(40),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: scale(20),
    paddingHorizontal: scale(10),
    fontSize: moderateScale(14),
    color: '#000',
  },
  Heading: {
    fontSize: verticalScale(25),
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: scale(10),
  },
  ModalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0 ,0 ,0 ,0.7)',
  },
  Title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
  },
  Container: {
    height: verticalScale(450),
    width: verticalScale(300),
    backgroundColor: 'rgb(67, 64, 64)',
    alignItems: 'center',
    borderBottomRightRadius: verticalScale(25),
    borderBottomLeftRadius: verticalScale(25),
    padding: verticalScale(10),
  },
  ModalCloseIcon: {
    width: verticalScale(25),
    height: verticalScale(25),
    top: verticalScale(10),
  },
});
