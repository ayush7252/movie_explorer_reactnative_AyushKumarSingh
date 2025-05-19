import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  width,
  scale,
  verticalScale,
  moderateScale,
} from '../Constants/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const isTablet = width >= 568;

interface MovieItem {
  poster_url: string;
  title: string;
  release_year: number;
  genre: string;
  premium: boolean;
  rating: number;
  duration: string;
  streaming_platform: string;
  director: string;
  description: string;
}

const Card = ({item}: {item: MovieItem}) => {
  const [selected, setselected] = useState(false);
  const [isGuest, setisGuest] = useState(false);
  const [premiumMember, setpremiumMember] = useState(true);
  const [isSupervisor, setisSupervisor] = useState(false);

  useFocusEffect(
  useCallback(() => {
    const checkUserRole = async () => {
      const role = await AsyncStorage.getItem('userRole');
      setisSupervisor(role === 'supervisor');
    };

    const checkGuest = async () => {
      const role = await AsyncStorage.getItem('userRole');
      setisGuest(role === 'user' || role === 'supervisor');
    };

    const checkPremiumMembership = async () => {
      const status = await AsyncStorage.getItem('SubscriptionStatus');
      setpremiumMember(status !== 'premium');
      console.log(status)
    };

    checkUserRole();
    checkGuest();
    checkPremiumMembership();
  }, [])
);

  // useEffect(() => {
  //   const checkUserRole = async () => {
  //     const role = await AsyncStorage.getItem('userRole');
  //     if (role === 'supervisor') {
  //       setisSupervisor(true);
  //     }
  //   };

  //   const Guest = async () => {
  //     const role = await AsyncStorage.getItem('userRole');
  //     if (role === 'user' || role === 'supervisor') {
  //       setisGuest(true);
  //     }
  //   };
  //   const checkPremiumMenbership = async () => {
  //     const status = await AsyncStorage.getItem('SubscriptionStatus');
  //     if (status === 'premium') {
  //       console.log(status);
  //       setpremiumMember(false);
  //     }
  //   };
  //   checkUserRole();
  //   checkPremiumMenbership();
  //   Guest();
  // }, []);

  const isModalOpen = (item: {premium: boolean}) => {
    if (isGuest) {
      if (
        item.premium == true &&
        premiumMember == true &&
        isSupervisor == false
      ) {
        ToastAndroid.show('This is a premium movie.', ToastAndroid.SHORT);
      } else {
        setselected(!selected);
      }
    } else {
      Alert.alert('To access this feature , You need to login to the app.');
    }
  };
  return (
    <View testID="ModalContainer">
      <View style={styles.card}>
        <ImageBackground
          testID="poster"
          source={{uri: item.poster_url}}
          style={styles.poster}
          resizeMode="cover">
          <View style={styles.cardContent}>
            <Text testID="title" style={styles.title}>
              {item.title}{' '}
              <Text
                testID="release_year"
                style={[
                  styles.subTitle,
                  {fontWeight: '400', fontSize: verticalScale(10)},
                ]}>
                ( {item.release_year} )
              </Text>
            </Text>
            <Text testID="genre" style={styles.subTitle}>
              {item.genre}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {item.premium && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: verticalScale(-20),
                  right: verticalScale(10),
                }}>
                <TouchableOpacity>
                  <Image
                    testID="rating"
                    source={require('../assets/Icons/crown.png')}
                    style={{
                      width: verticalScale(20),
                      height: verticalScale(20),
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              testID="details_button"
              style={styles.details}
              onPress={() => isModalOpen(item)}>
              <Text>Details</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <Modal
        testID="ModalContainer"
        animationType="slide"
        transparent={true}
        visible={selected}
        onRequestClose={() => {
          setselected(!selected);
        }}>
        <View style={styles.ModalScreen}>
          <View style={styles.ModalContainer}>
            <Text testID="modal_title" style={styles.ModalTitle}>
              Movie Details
            </Text>
            <TouchableOpacity
              testID="modal_close_button"
              onPress={() => setselected(!selected)}
              style={styles.CrossBtn}>
              <Image
                source={require('../assets/Icons/cross.png')}
                style={{width: verticalScale(25), height: verticalScale(25)}}
              />
            </TouchableOpacity>
            <View>
              <View style={styles.ModalDataTop}>
                <Image source={{uri: item.poster_url}} style={styles.poster} />
              </View>
              <View style={styles.ModalDataCenter}>
                <Text style={[styles.title, {color: '#000'}]}>
                  {item.title}{' '}
                  <Text
                    style={[
                      styles.subTitle,
                      {
                        fontWeight: '400',
                        fontSize: verticalScale(10),
                        color: '#000',
                      },
                    ]}>
                    ( {item.release_year} )
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.subTitle,
                    {
                      fontWeight: '400',
                      fontSize: verticalScale(10),
                      color: '#000',
                      lineHeight: 20,
                    },
                  ]}>
                  {item.genre}
                </Text>
                <View style={styles.RatingSection}>
                  <Image
                    source={require('../assets/Icons/star.png')}
                    style={styles.RatingIcon}
                  />
                  <Text
                    style={[
                      styles.subTitle,
                      {color: '#000', marginLeft: verticalScale(5)},
                    ]}>
                    {item.rating}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.subTitle,
                    {
                      color: '#000',
                      fontWeight: 'bold',
                      marginTop: verticalScale(10),
                    },
                  ]}>
                  Duration :-{' '}
                  <Text
                    style={[
                      styles.subTitle,
                      {color: '#000', fontWeight: '400'},
                    ]}>
                    {item.duration} hrs.
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.subTitle,
                    {
                      color: '#000',
                      fontWeight: 'bold',
                      marginTop: verticalScale(10),
                    },
                  ]}>
                  Streaming Platform :-{' '}
                  <Text
                    style={[
                      styles.subTitle,
                      {color: '#000', fontWeight: '400'},
                    ]}>
                    {item.streaming_platform}
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.subTitle,
                    {
                      color: '#000',
                      fontWeight: 'bold',
                      marginTop: verticalScale(10),
                    },
                  ]}>
                  Director :-{' '}
                  <Text
                    style={[
                      styles.subTitle,
                      {color: '#000', fontWeight: '400'},
                    ]}>
                    {item.director}
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.subTitle,
                    {
                      color: '#000',
                      fontWeight: 'bold',
                      marginTop: verticalScale(10),
                    },
                  ]}>
                  Description :-
                </Text>
                <Text
                  testID="modal_description"
                  style={[
                    styles.subTitle,
                    {
                      color: '#000',
                      fontWeight: '400',
                      marginTop: verticalScale(5),
                      lineHeight: verticalScale(18),
                    },
                  ]}>
                  {item.description}
                </Text>
              </View>
              <View>
                <TouchableOpacity style={styles.WatchBtn}>
                  <Text>Watch Now</Text>
                </TouchableOpacity>
              </View>
              <View></View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(160),
    width: verticalScale(110),
    borderWidth: verticalScale(1),
    borderRadius: verticalScale(20),
    borderColor: '#fff',
    marginTop: verticalScale(30),
  },
  card: {
    margin: verticalScale(10),
    backgroundColor: '#000',
    borderRadius: scale(10),
  },
  poster: {
    width: scale(150),
    height: verticalScale(170),
    borderRadius: scale(10),
    resizeMode: 'cover',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    padding: scale(12),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
  },
  title: {
    color: '#fff',
    fontSize: scale(20),
    fontWeight: 'bold',
    lineHeight: verticalScale(15),
  },
  subTitle: {
    color: '#fff',
    fontSize: 15,
  },
  details: {
    bottom: verticalScale(10),
    width: verticalScale(70),
    backgroundColor: 'rgba(249, 247, 247, 0.7)',
    padding: verticalScale(8),
    borderRadius: verticalScale(10),
    alignItems: 'center',
  },
  ModalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalContainer: {
    width: isTablet ? width * 0.8 : width * 0.9,
    backgroundColor: '#fff',
    borderRadius: verticalScale(20),
    padding: verticalScale(20),
  },
  ModalTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  CrossBtn: {
    position: 'absolute',
    top: verticalScale(10),
    right: verticalScale(10),
  },
  ModalDataTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
    marginTop: verticalScale(20),
  },
  ModalDataCenter: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  RatingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: verticalScale(1),
    borderColor: '#D89216',
    padding: verticalScale(1),
    paddingHorizontal: verticalScale(6),
    borderRadius: verticalScale(20),
    backgroundColor: 'rgba(252, 221, 81, 0.42)',
  },
  RatingIcon: {
    height: verticalScale(15),
    width: verticalScale(15),
  },
  WatchBtn: {
    backgroundColor: '#CD1818',
    padding: verticalScale(10),
    borderRadius: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },
});
