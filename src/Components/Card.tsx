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
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  width,
  scale,
  verticalScale,
  moderateScale,
} from '../Constants/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {LinearGradient} from 'react-native-linear-gradient';

const isTablet = width >= 568;

interface MovieItem {
  banner_url: string | undefined;
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
        setisGuest(role === 'user' || role === 'supervisor');
      };

      const checkPremiumMembership = async () => {
        const status = await AsyncStorage.getItem('SubscriptionStatus');
        setpremiumMember(status !== 'premium');
        console.log(status);
      };

      checkUserRole();
      checkPremiumMembership();
    }, []),
  );

  const isModalOpen = (item: {premium: boolean}) => {
    if (isGuest) {
      if (item.premium && premiumMember && !isSupervisor) {
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
      <TouchableHighlight style={styles.container} onPress={() => isModalOpen(item)}>
        <ImageBackground
          testID="poster"
          source={{uri: item.poster_url}}
          style={styles.poster}
          resizeMode="cover">
          {/* <View style={styles.cardContent}>
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
          </View> */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {item.premium && (
              <View
                style={{
                  marginTop: verticalScale(2),
                  left: verticalScale(35),
                  backgroundColor:"rgba(110, 111, 116, 0.8)",
                  borderRadius:verticalScale(20),
                  padding:verticalScale(4)

                  
                }}>
                <TouchableOpacity>
                  <Image
                    testID="rating"
                    source={require('../assets/Icons/crown.png')}
                    style={{
                      width: verticalScale(18),
                      height: verticalScale(18),
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            {/* <TouchableOpacity
              testID="details_button"
              // style={styles.details}
              onPress={() => isModalOpen(item)}>
              <Text></Text>
            </TouchableOpacity> */}
          </View>
        </ImageBackground>
      </TouchableHighlight>

      {/* <Modal
        testID="ModalContainer"
        animationType="slide"
        transparent={true}
        visible={selected}
        onRequestClose={() => setselected(!selected)}>
        <View style={styles.ModalScreen}>
          <View style={styles.ModalContainer}>
            <Text testID="modal_title" style={styles.ModalTitle}>Movie Details</Text>
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
                  <Text style={[styles.subTitle, {fontWeight: '400', fontSize: verticalScale(10), color: '#000'}]}>
                    ( {item.release_year} )
                  </Text>
                </Text>
                <Text style={[styles.subTitle, {fontWeight: '400', fontSize: verticalScale(10), color: '#000', lineHeight: 20}]}> {item.genre} </Text>
                <View style={styles.RatingSection}>
                  <Image source={require('../assets/Icons/star.png')} style={styles.RatingIcon} />
                  <Text style={[styles.subTitle, {color: '#000', marginLeft: verticalScale(5)}]}>{item.rating}</Text>
                </View>
                <Text style={[styles.subTitle, {color: '#000', fontWeight: 'bold', marginTop: verticalScale(10)}]}>Duration :- <Text style={[styles.subTitle, {color: '#000', fontWeight: '400'}]}>{item.duration} hrs.</Text></Text>
                <Text style={[styles.subTitle, {color: '#000', fontWeight: 'bold', marginTop: verticalScale(10)}]}>Streaming Platform :- <Text style={[styles.subTitle, {color: '#000', fontWeight: '400'}]}>{item.streaming_platform}</Text></Text>
                <Text style={[styles.subTitle, {color: '#000', fontWeight: 'bold', marginTop: verticalScale(10)}]}>Director :- <Text style={[styles.subTitle, {color: '#000', fontWeight: '400'}]}>{item.director}</Text></Text>
                <Text style={[styles.subTitle, {color: '#000', fontWeight: 'bold', marginTop: verticalScale(10)}]}>Description :-</Text>
                <Text testID="modal_description" style={[styles.subTitle, {color: '#000', fontWeight: '400', marginTop: verticalScale(5), lineHeight: verticalScale(18)}]}>{item.description}</Text>
              </View>
              <TouchableOpacity style={styles.WatchBtn}>
                <Text>Watch Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}

      <Modal
        animationType="slide"
        transparent={false}
        visible={selected}
        onRequestClose={() => setselected(false)}>
        <ImageBackground
          source={{uri: item.banner_url}}
          style={styles.fullScreenBackground}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
            style={styles.gradientOverlay}>
            <TouchableOpacity
              onPress={() => setselected(false)}
              style={styles.CrossBtn}>
              <Image
                source={require('../assets/Icons/cross.png')}
                style={styles.crossIcon}
              />
            </TouchableOpacity>

            <ScrollView
              contentContainerStyle={styles.ModalContent}
              showsVerticalScrollIndicator={false}>

              <View style={styles.ModalDataTop}>
              <Text style={styles.ModalTitle}>Movie Details</Text>
                <Image source={{uri: item.poster_url}} style={styles.poster} />
              </View>

              <View style={styles.ModalDataCenter}>
                <Text style={[styles.title, {color: '#fff'}]}>
                  {item.title}{' '}
                  <Text
                    style={[
                      styles.subTitle,
                      {
                        fontWeight: '400',
                        fontSize: verticalScale(12),
                        color: '#ccc',
                      },
                    ]}>
                    ({item.release_year})
                  </Text>
                </Text>

                <Text
                  style={[
                    styles.subTitle,
                    {color: '#ddd', marginBottom: verticalScale(10)},
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
                      {color: '#fff', marginLeft: verticalScale(6)},
                    ]}>
                    {item.rating}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.subTitle,
                    {
                      color: '#fff',
                      fontWeight: '600',
                      marginTop: verticalScale(15),
                    },
                  ]}>
                  Duration:{' '}
                  <Text style={{fontWeight: '400'}}>{item.duration} hrs.</Text>
                </Text>

                <Text
                  style={[
                    styles.subTitle,
                    {
                      color: '#fff',
                      fontWeight: '600',
                      marginTop: verticalScale(12),
                    },
                  ]}>
                  Director:{' '}
                  <Text style={{fontWeight: '400'}}>{item.director}</Text>
                </Text>

                <Text
                  style={[
                    styles.subTitle,
                    {
                      color: '#fff',
                      fontWeight: '600',
                      marginTop: verticalScale(18),
                      marginBottom: verticalScale(6),
                    },
                  ]}>
                  Description:
                </Text>

                <Text
                  style={[
                    styles.subTitle,
                    {
                      color: '#eee',
                      fontWeight: '400',
                      lineHeight: verticalScale(20),
                      textAlign: 'justify',
                    },
                  ]}>
                  {item.description}
                </Text>
              </View>

              <TouchableOpacity style={styles.WatchBtn} onPress={()=>{ToastAndroid.show(
                        'Enjoy Watching!',
                        ToastAndroid.SHORT,
                      );}}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  Watch Now
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </ImageBackground>
      </Modal>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(170),
    width: verticalScale(110),
    borderRadius: verticalScale(10),
    marginTop: verticalScale(20),
    resizeMode: 'contain',
    overflow: 'hidden',
    margin: verticalScale(5),
  },
  poster: {
    width: scale(138),
    height: verticalScale(170),
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardContent: {
    width: '100%',
    bottom: 0,
    padding: scale(12),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
  },
  title: {
    color: '#fff',
    fontSize: scale(20),
    fontWeight: '500',
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
    width: '90%',
    backgroundColor: 'white',
    borderRadius: verticalScale(20),
    padding: verticalScale(20),
    elevation: 5,
  },
  ModalTitle: {
    fontSize: verticalScale(20),
    fontWeight: '500',
    color: '#fff',
    marginBottom: verticalScale(20),
  },
  CrossBtn: {
    position: 'absolute',
    top: verticalScale(15),
    right: verticalScale(15),
  },
  ModalDataTop: {
    alignItems: 'center',
  },
  ModalDataCenter: {
    marginTop: verticalScale(10),
  },
  RatingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  RatingIcon: {
    width: verticalScale(18),
    height: verticalScale(18),
  },
  WatchBtn: {
    backgroundColor: 'rgb(252, 45, 45)',
    marginTop: verticalScale(15),
    padding: verticalScale(10),
    borderRadius: verticalScale(8),
    alignItems: 'center',
  },
  fullScreenBackground: {
    flex: 1,
  },
  gradientOverlay: {
    flex: 1,
    paddingHorizontal: verticalScale(20),
    paddingTop: verticalScale(50),
  },
  crossIcon: {
    width: verticalScale(28),
    height: verticalScale(28),
  },
  ModalContent: {
    paddingBottom: verticalScale(30),
  },
});
