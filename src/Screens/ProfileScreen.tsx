import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {scale, verticalScale} from '../Constants/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {toggleNotifications} from '../AxiosRoutes/AxiosRoutes';

const ProfileScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [userToken, setuserToken] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const currentUserString = await AsyncStorage.getItem('currentUser');
        if (currentUserString) {
          const currentUser = JSON.parse(currentUserString);
          setUserEmail(currentUser.email);
          setUserRole(currentUser.role);
          setUserName(currentUser.name);
        } else {
          Alert.alert('No user data found in AsyncStorage');
        }
      } catch (err) {
        Alert.alert('Error fetching data from AsyncStorage');
      }
    };

    const fetchSubscriptionStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('SubscriptionStatus');
        setSubscriptionStatus(status ?? '');
      } catch (error) {
        console.error('Error fetching subscription status:', error);
        setSubscriptionStatus('Error fetching status');
      }
    };

    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setuserToken(token || '');
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    getUserData();
    fetchSubscriptionStatus();
    getToken();
  }, []);

  const toggleNotification = async () => {
    const newState = !notificationEnabled;
    setNotificationLoading(true);
    try {
      const res = await toggleNotifications(userToken, newState);
      if (res === 200) {
        ToastAndroid.show(
          `Notifications ${newState ? 'enabled' : 'disabled'}`,
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show(
          `Failed to update notification state`,
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.error('Error toggling notifications:', error);
    }
    setNotificationEnabled(newState);
    setNotificationLoading(false);
  };

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
        <Text style={styles.nameTxt}>{userName}</Text>
      </View>

      <View style={styles.InfoSection}>
        <Text style={styles.SectionHeading}>Email</Text>
        <Text style={styles.nameTxt}>{userEmail}</Text>
      </View>

      <View style={styles.InfoSection}>
        <Text style={styles.SectionHeading}>Role</Text>
        <Text style={styles.nameTxt}>{userRole}</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.InfoSection}>
          <Text style={styles.SectionHeading}>Subscription Status</Text>
          <Text style={styles.subscriptionTxt}>{subscriptionStatus}</Text>
        </View>
        <View style={styles.InfoSection}>
          <TouchableOpacity onPress={toggleNotification} disabled={notificationLoading}>
            {notificationLoading ? (
              <ActivityIndicator size="large" color="#FFD700" />
            ) : (
              <Image
                source={
                  notificationEnabled
                    ? require('../assets/Icons/notification_enabled.png')
                    : require('../assets/Icons/notification_disabled.png')
                }
                style={styles.socialIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.connectHeading}>Connect With Us</Text>

      <View style={styles.SocialContainer}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://wa.me/7307585258')}>
          <Image
            source={require('../assets/Icons/whatsapp.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('mailto:ayushkumarsingh793@gmail.com')
          }>
          <Image
            source={require('../assets/Icons/gmail.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://instagram.com')}>
          <Image
            source={require('../assets/Icons/instagram.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://linkedin.com/in/yourprofile')
          }>
          <Image
            source={require('../assets/Icons/linkedin.png')}
            style={styles.socialIcon}
          />
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
    marginTop: verticalScale(30),
  },
  ProfilePic: {
    height: verticalScale(80),
    width: verticalScale(80),
    tintColor: '#fff',
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
  subscriptionTxt: {
    color: '#fff',
    fontSize: verticalScale(16),
    fontWeight: '500',
  },
  connectHeading: {
    color: '#888',
    fontSize: verticalScale(14),
    fontWeight: '600',
    textAlign: 'center',
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