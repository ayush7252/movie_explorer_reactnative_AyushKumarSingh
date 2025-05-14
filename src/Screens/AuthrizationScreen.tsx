import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  Alert,
  ActivityIndicator,
  ToastAndroid,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {
  width,
  height,
  scale,
  verticalScale,
  moderateScale,
} from '../Constants/Dimensions';
import {
  GetCurrentUser,
  getSubscriptionStatus,
  GetSubscriptionStatus,
  LoginRequest,
  sendTokenToBackend,
  signUpRequest,
} from '../AxiosRoutes/AxiosRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { NavigationProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const AuthrizationScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const isLogin = mode === 'login';
  const isTablet = width >= 568;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mobileNumber, setmobileNumber] = useState('')

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = {
        user: {
          email,
          password,
        },
      };

      const res = await LoginRequest(data);
      const {id, role: userRole, email: userEmail, token: userToken} = res.data;
      console.log(res.data);

      if (id >= 0) {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userRole', userRole);
        const currentUser = await GetCurrentUser();
        if (currentUser) {
          await AsyncStorage.setItem(
            'currentUser',
            JSON.stringify(currentUser),
          );
          console.log('Current user saved in AsyncStorage', currentUser);
        }
        const subscriptionStatus = await getSubscriptionStatus()
        await AsyncStorage.setItem('SubscriptionStatus' , subscriptionStatus.plan_type);


        navigation.navigate('Footer');
        ToastAndroid.show('Login successful', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Login failed');
      }
    } catch (err: any) {
      console.log('Login error:', err);
      const errorMessage =
        err?.response?.data?.errors?.[0] || 'Something went wrong';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const data = {
        user: {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
          mobile_number: mobileNumber,
        },
      };

      const res = await signUpRequest(data);
      const {id, token} = res.data;
      console.log(res)
      console.log(id , token);
      if (id >= 0 && token) {
        const fcmToken = await messaging().getToken();
        await sendTokenToBackend({
          userId: id.toString(),
          token: fcmToken,
          authToken: token,
        });
        // (navigation as any).replace('Footer');
        ToastAndroid.show('Successfully registered Please Login', ToastAndroid.SHORT)
      } else {
        ToastAndroid.show('Error during SignUp', ToastAndroid.SHORT)
      }
    } catch (err: any) {
      console.log('Sign-up error:', err);
      const errors = err.response?.data?.errors;
      Alert.alert('Sign-up failed', `* ${errors.join('\n\n* ')}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ImageBackground
      source={require('../assets/Images/Background5.jpg')}
      style={[
        styles.background,
        isTablet && {
          paddingTop: verticalScale(15),
          paddingHorizontal: scale(50),
        },
      ]}
      blurRadius={4}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
          <Image
            source={require('../assets/Icons/left-arrow.png')}
            style={[
              styles.icon,
              isTablet && {
                width: verticalScale(20),
                height: verticalScale(20),
                marginTop: verticalScale(30),
              },
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Movie Explorer</Text>
        <View style={{width: 24}} />
      </View>

      <View>
        <Image source={require('../assets/Images/a.png')} style={styles.logo} />
      </View>

      <View
        style={[
          styles.tabContainer,
          isTablet && {marginTop: verticalScale(10)},
        ]}>
        <TouchableOpacity
          style={[styles.tab, isLogin && styles.activeTab]}
          onPress={() => setMode('login')}>
          <Text style={[styles.tabText, isLogin && styles.activeTabText]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, !isLogin && styles.activeTab]}
          onPress={() => setMode('signup')}>
          <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.form, isTablet && {marginTop: verticalScale(10)}]}>
        {!isLogin && (
          <View
            style={[
              styles.inputWrapper,
              isTablet && {
                paddingHorizontal: scale(15),
                marginVertical: verticalScale(12),
              },
            ]}>
            <Image
              source={require('../assets/Icons/user.png')}
              style={[
                styles.inputIcon,
                isTablet && {
                  height: verticalScale(24),
                  width: verticalScale(24),
                },
              ]}
            />
            <TextInput
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="#4f4e4d"
            />
          </View>
        )}

        <View
          style={[
            styles.inputWrapper,
            isTablet && {
              paddingHorizontal: scale(15),
              marginVertical: verticalScale(12),
            },
          ]}>
          <Image
            source={require('../assets/Icons/mail.png')}
            style={[
              styles.inputIcon,
              isTablet && {height: verticalScale(24), width: verticalScale(24)},
            ]}
          />
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor="#4f4e4d"
          />
        </View>

        <View
          style={[
            styles.inputWrapper,
            isTablet && {
              paddingHorizontal: scale(15),
              marginVertical: verticalScale(12),
            },
          ]}>
          <Image
            source={require('../assets/Icons/padlock.png')}
            style={[
              styles.inputIcon,
              isTablet && {height: verticalScale(24), width: verticalScale(24)},
            ]}
          />
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
            placeholderTextColor="#4f4e4d"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} testID="eye-icon">
            <Image
              source={
                showPassword
                  ? require('../assets/Icons/hide.png')
                  : require('../assets/Icons/view.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        {!isLogin && (
          <View>
            <View
            style={[
              styles.inputWrapper,
              isTablet && {
                paddingHorizontal: scale(15),
                marginVertical: verticalScale(12),
              },
            ]}>
            <Image
              source={require('../assets/Icons/padlock.png')}
              style={[
                styles.inputIcon,
                isTablet && {
                  height: verticalScale(24),
                  width: verticalScale(24),
                },
              ]}
            />
            <TextInput
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              placeholderTextColor="#4f4e4d"
            />
          </View>
          <View
          style={[
            styles.inputWrapper,
            isTablet && {
              paddingHorizontal: scale(15),
              marginVertical: verticalScale(12),
            },
          ]}>
          <Image
            source={require('../assets/Icons/padlock.png')}
            style={[
              styles.inputIcon,
              isTablet && {height: verticalScale(24), width: verticalScale(24)},
            ]}
          />
          <TextInput
            placeholder="Enter your Phone No."
            value={mobileNumber}
            onChangeText={setmobileNumber}
            style={styles.input}
            placeholderTextColor="#4f4e4d"
          />
        </View>
          </View>
          
        )}

        <View style={styles.optionsRow}>
          {isLogin && (
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
          )}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#f56b2a"
            style={styles.loader}
            testID="activity-indicator"
          />
        ) : (
          <TouchableOpacity
            style={[
              styles.primaryButton,
              isTablet && {
                paddingVertical: verticalScale(10),
                marginVertical: verticalScale(5),
              },
            ]}
            onPress={isLogin ? handleLogin : handleSignUp}>
            <Text
              style={[
                styles.primaryButtonText,
                isTablet && {
                  fontSize: moderateScale(16),
                  lineHeight: verticalScale(20),
                },
              ]}>
              {isLogin ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.or}>— Or login with —</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity
            style={[
              styles.socialBtn,
              isTablet && {padding: verticalScale(10)},
            ]}>
            <Image
              source={require('../assets/Icons/google.png')}
              style={[
                styles.socialIcon,
                isTablet && {width: scale(30), height: verticalScale(30)},
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default AuthrizationScreen;

const styles = StyleSheet.create({
  loader: {
    marginVertical: verticalScale(20),
  },
  background: {
    flex: 1,
    paddingTop: verticalScale(30),
    paddingHorizontal: scale(20),
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: scale(24),
    height: scale(24),
    tintColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
  },
  logo: {
    width: verticalScale(200),
    height: verticalScale(120),
    alignSelf: 'center',
    // marginTop: verticalScale(20),
    marginBottom: verticalScale(-20),
    tintColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff30',
    borderRadius: verticalScale(30),
    overflow: 'hidden',
    marginTop: verticalScale(20),
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },
  tabText: {
    color: '#fff',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(18),
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    marginTop: verticalScale(20),
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#ffffff70',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(10),
  },
  inputIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: '#888',
  },
  input: {
    flex: 1,
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(10),
    color: '#4f4e4d',
    fontSize: moderateScale(18),
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(10),
  },
  forgot: {
    color: '#ddd',
    fontSize: moderateScale(12),
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: verticalScale(5),
  },
  primaryButton: {
    backgroundColor: '#f56b2a',
    paddingVertical: verticalScale(12),
    borderRadius: verticalScale(25),
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  or: {
    textAlign: 'center',
    color: '#ccc',
    lineHeight: verticalScale(20),
    marginVertical: verticalScale(10),
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(20),
  },
  socialBtn: {
    backgroundColor: '#fff',
    padding: verticalScale(8),
    borderRadius: scale(10),
    marginHorizontal: scale(10),
  },
  socialIcon: {
    width: scale(16),
    height: scale(16),
  },
  footerText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: verticalScale(10),
  },
  eyeIcon: {
    width: scale(25),
    height: scale(25),
    tintColor: '#4f4e4d',
    position: 'absolute',
    right: scale(15),
    top: verticalScale(-10),
  }
});
