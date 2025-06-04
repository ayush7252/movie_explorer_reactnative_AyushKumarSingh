import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardTypeOptions,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale, verticalScale} from '../Constants/Dimensions';
import {deleteMovie, updateMovie} from '../AxiosRoutes/AxiosRoutes';
import LinearGradient from 'react-native-linear-gradient';

interface MovieData {
  id: string;
  title: string;
  genre: string;
  release_year: string;
  rating: string;
  director: string;
  description: string;
  duration: string;
  premium: boolean;
  main_lead: string;
  streaming_platform: string;
  poster_url: string;
  banner_url: string;
}

const MovieCard = ({
  data,
  handleReload,
}: {
  data: MovieData;
  handleReload: () => void;
}) => {
  const [isAdmin, setisAdmin] = useState(false);
  const [selected, setselected] = useState(false);
  const [editedData, setEditedData] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    rating: '',
    director: '',
    description: '',
    duration: '',
    isPremium: '',
    mainLead: '',
    streamingPlatform: '',
    poster: '',
    banner: '',
  });

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await AsyncStorage.getItem('userRole');
      if (role?.toLowerCase() === 'supervisor') {
        setisAdmin(true);
      }
    };

    if (data) {
      setEditedData({
        title: data.title || '',
        genre: data.genre || '',
        releaseYear: data.release_year || '',
        rating: data.rating || '',
        director: data.director || '',
        description: data.description || '',
        duration: data.duration || '',
        isPremium: data.premium?.toString() || '',
        mainLead: data.main_lead || '',
        streamingPlatform: data.streaming_platform || '',
        poster: data.poster_url || '',
        banner: data.banner_url || '',
      });
    }

    fetchUserRole();
  }, [data]);

  const Field = ({
    label,
    keyName,
    keyboardType = 'default',
  }: {
    label: string;
    keyName: keyof typeof editedData;
    keyboardType?: KeyboardTypeOptions;
  }) => (
    <View style={{marginBottom: verticalScale(10)}}>
      <Text style={styles.inputHeading}>{label}</Text>
      <TextInput
        value={editedData[keyName]?.toString() || ''}
        onChangeText={text =>
          setEditedData(prev => ({...prev, [keyName]: text}))
        }
        style={styles.InputContainer}
        placeholder={(() => {
          const movieDataKeyMap: Record<string, keyof MovieData> = {
            title: 'title',
            genre: 'genre',
            releaseYear: 'release_year',
            rating: 'rating',
            director: 'director',
            description: 'description',
            duration: 'duration',
            isPremium: 'premium',
            mainLead: 'main_lead',
            streamingPlatform: 'streaming_platform',
            poster: 'poster_url',
            banner: 'banner_url',
          };
          const movieKey = movieDataKeyMap[keyName as string];
          // @ts-ignore
          return data && movieKey && data[movieKey] !== undefined
            ? data[movieKey]?.toString()
            : `Enter ${label}`;
        })()}
        keyboardType={keyboardType}
      />
    </View>
  );

  const handleSave = async () => {
    try {
      const updated = await updateMovie(parseInt(data.id, 10), {
        ...editedData,
        isPremium: editedData.isPremium === 'true',
        rating: parseFloat(editedData.rating) || 0,
        release_year: data.release_year || editedData.releaseYear,
        main_lead: data.main_lead || editedData.mainLead,
        streaming_platform:
          data.streaming_platform || editedData.streamingPlatform,
      });
      if (updated) {
        Alert.alert('Success', 'Movie updated successfully');
        setselected(false);
        handleReload();
      } else {
        Alert.alert('Error', 'Failed to update movie');
      }
    } catch (error) {
      console.error('Error saving movie:', error);
      Alert.alert('Error', 'An error occurred while saving the movie.');
    }
  };

  const handleLongPress = async () => {
    const role = await AsyncStorage.getItem('userRole');

    if (role?.toLowerCase() === 'supervisor') {
      Alert.alert(
        'Delete Movie',
        'Are you sure you want to delete this movie?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              const success = await deleteMovie(parseInt(data.id, 10));
              if (success) {
                handleReload();
                setselected(false);
              }
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      Alert.alert('You do not have permission to delete this movie.');
    }
  };

  return (
    <View testID="MovieCardContainer">
      <TouchableOpacity
        style={styles.container}
        onPress={() => setselected(!selected)}
        onLongPress={isAdmin ? handleLongPress : undefined}>
        <View style={styles.posterContainer}>
          <Image source={{uri: data.poster_url}} style={styles.poster} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subText}>{data.release_year}</Text>
          <View style={styles.rating}>
            <Image
              source={require('../assets/Icons/star.png')}
              style={styles.RatingIcon}
            />
            <Text style={styles.subText}>{data.rating}</Text>
          </View>
          <Text style={styles.subText}>{data.genre}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={selected}
        onRequestClose={() => setselected(false)}
        testID="ModalMainContainer">
        <ImageBackground
          source={{uri: data.banner_url}}
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

            {isAdmin ? (
              <View style={styles.adminModalContentBox}>
                <ScrollView
                  contentContainerStyle={styles.adminScrollContent}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.imageArea}>
                    <Image
                      source={{uri: editedData.poster || data.poster_url}}
                      style={styles.poster}
                      testID="PosterImage"
                    />
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Basic Info</Text>
                    <Field label="Title" keyName="title" />
                    <Field label="Genre" keyName="genre" />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View style={{flex: 1, marginRight: 8}}>
                        <Field label="Year" keyName="releaseYear" keyboardType="numeric" />
                      </View>
                      <View style={{flex: 1}}>
                        <Field label="Rating" keyName="rating" keyboardType="numeric" />
                      </View>
                    </View>
                    <Field label="Director" keyName="director" />
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <Field label="Description" keyName="description" />
                    <Field label="Duration" keyName="duration" />
                    <Field label="Premium (true/false)" keyName="isPremium" />
                    <Field label="Main Lead" keyName="mainLead" />
                    <Field label="Streaming Platform" keyName="streamingPlatform" />
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Media</Text>
                    <Field label="Poster URL" keyName="poster" />
                    <Field label="Banner URL" keyName="banner" />
                  </View>
                  <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>Save Data</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            ) : (
              <ScrollView
                contentContainerStyle={styles.ModalContent}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.ModalTitle}>Movie Details</Text>
                <View style={styles.ModalDataTop}>
                  <Image source={{uri: data.poster_url}} style={styles.Modalposter} />
                </View>
                <View style={styles.ModalDataCenter}>
                  <Text style={[styles.title, {color: '#fff'}]}>
                    {data.title}{' '}
                    <Text
                      style={[
                        styles.subTitle,
                        {
                          fontWeight: '400',
                          fontSize: verticalScale(12),
                          color: '#ccc',
                        },
                      ]}>
                      ({data.release_year})
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.subTitle,
                      {color: '#ddd'},
                    ]}>
                    {data.genre}
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
                      {data.rating}
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
                    <Text style={{fontWeight: '400'}}>{data.duration} min</Text>
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
                    <Text style={{fontWeight: '400'}}>{data.director}</Text>
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
                    {data.description}
                  </Text>
                </View>
                <TouchableOpacity style={styles.WatchBtn} onPress={()=>{ToastAndroid.show('Enjoy watching!',ToastAndroid.SHORT)}}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Watch Now
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </LinearGradient>
        </ImageBackground>
      </Modal>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#363535',
    padding: verticalScale(10),
    borderRadius: verticalScale(10),
    marginVertical: verticalScale(10),
    alignItems: 'center',
    height: verticalScale(120),
    width: verticalScale(265),
  },
  poster: {
    width: verticalScale(80),
    height: verticalScale(110),
    borderRadius: verticalScale(10),
    // resizeMode:'contain',
  },
  Modalposter: {
    width: verticalScale(130),
    height: verticalScale(180),
    borderRadius: verticalScale(20),
    resizeMode:'cover'
  },
  posterContainer: {
    width: verticalScale(80),
    height: verticalScale(110),
    borderRadius: verticalScale(10),
  },
  cardContent: {
    marginLeft: verticalScale(15),
    justifyContent: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: verticalScale(15),
    lineHeight:verticalScale(16)
  },
  subText: {
    color: '#fff',
    fontSize: verticalScale(13),
    marginVertical: verticalScale(5),
  },
  RatingIcon: {
    width: verticalScale(15),
    height: verticalScale(15),
    marginRight: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputHeading: {
    fontSize: verticalScale(12),
    color: '#333',
    marginBottom: 4,
  },
  InputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: verticalScale(8),
    height: verticalScale(40),
    color: '#000',
    fontSize: verticalScale(14),
  },
  CrossBtn: {
    position: 'absolute',
    top: verticalScale(15),
    right: verticalScale(15),
    zIndex: 100,
  },
  crossIcon: {
    width: verticalScale(28),
    height: verticalScale(28),
  },
  MainModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
  },
  fullScreenBackground: {
    flex: 1,
  },
  gradientOverlay: {
    flex: 1,
    paddingHorizontal: verticalScale(20),
    paddingTop: verticalScale(50),
  },
  adminModalContentBox: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    marginHorizontal: 0,
    marginTop: verticalScale(35),
    padding: verticalScale(16),
    flex: 1,
  },
  imageArea: {
    alignItems: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: verticalScale(16),
    fontWeight: '700',
    marginBottom: verticalScale(8),
    color: '#444',
  },
  saveBtn: {
    backgroundColor: '#007BFF',
    paddingVertical: verticalScale(12),
    borderRadius: verticalScale(8),
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: verticalScale(14),
  },
  adminScrollContent: {
    paddingBottom: verticalScale(20),
  },
  ModalContent: {
    paddingBottom: verticalScale(30),
  },
  ModalTitle: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: verticalScale(10),
    alignSelf: 'center',
  },
  ModalDataTop: {
    alignItems: 'center',
    marginBottom: 10,
  },
  ModalDataCenter: {
    paddingHorizontal: 10,
  },
  RatingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  WatchBtn: {
    backgroundColor: 'rgb(255, 34, 30)',
    marginTop: verticalScale(15),
    padding: verticalScale(10),
    borderRadius: verticalScale(8),
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 120,
  },
  subTitle: {
    color: '#fff',
    fontSize: 15,
    lineHeight:verticalScale(17)
  },
});