import {
  Alert,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardTypeOptions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale, verticalScale} from '../Constants/Dimensions';
import {deleteMovie} from '../AxiosRoutes/AxiosRoutes';
import { updateMovie } from '../AxiosRoutes/AxiosRoutes'; 


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

const MovieCard = ({data, handleReload}: {data: MovieData; handleReload: () => void}) => {
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

  const Field = ({label, keyName, keyboardType = 'default'}: {label: string; keyName: keyof typeof editedData; keyboardType?: KeyboardTypeOptions}) => (
    <View style={{marginBottom: verticalScale(10)}}>
      <Text style={styles.inputHeading}>{label}</Text>
      <TextInput
        value={editedData[keyName]?.toString() || ''}
        onChangeText={text =>
          setEditedData(prev => ({...prev, [keyName]: text}))
        }
        style={styles.InputContainer}
        placeholder={data?.[keyName]?.toString() || `Enter ${label}`}
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
        streaming_platform: data.streaming_platform || editedData.streamingPlatform,
      });
      console.log('Updated movie:', updated);
  
      if (updated) {
        Alert.alert('Success', 'Movie updated successfully');
        setselected(false);
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
    <View testID='MovieCardContainer'>
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
        transparent={true}
        visible={selected}
        onRequestClose={() => setselected(false)}
        testID="ModalMainContainer">
        <View style={styles.MainModalContainer}>
          <View style={styles.ModalContainer}>
            <TouchableOpacity
              onPress={() => setselected(false)}
              style={styles.CrossBtn}>
              <Image
                source={require('../assets/Icons/cross.png')}
                style={{width: verticalScale(25), height: verticalScale(25)}}
              />
            </TouchableOpacity>

            {isAdmin ? (
              <ScrollView>
                <View style={styles.imageArea}>
                  <Image
                    source={{uri: editedData.poster || data.poster_url}}
                    style={styles.poster} testID="PosterImage"
                  />
                  <TouchableOpacity
                    style={[styles.chooseBtn, {backgroundColor: '#fff'}]}
                    onPress={handleSave}>
                    <Text>Save Data</Text>
                  </TouchableOpacity>
                </View>

                <Field label="Title" keyName="title" />
                <Field label="Genre" keyName="genre" />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Field
                    label="Year"
                    keyName="releaseYear"
                    keyboardType="numeric"
                  />
                  <Field
                    label="Rating"
                    keyName="rating"
                    keyboardType="numeric"
                  />
                </View>
                <Field label="Director" keyName="director" />
                <Field label="Description" keyName="description" />
                <Field label="Duration" keyName="duration" />
                <Field label="Premium (true/false)" keyName="isPremium" />
                <Field label="Main Lead" keyName="mainLead" />
                <Field label="Streaming Platform" keyName="streamingPlatform" />
                <Field label="Poster URL" keyName="poster" />
                <Field label="Banner URL" keyName="banner" />
              </ScrollView>
            ) : (
              <ScrollView>
                <View style={styles.ModalDataTop}>
                  <Image
                    source={{uri: data.poster_url}}
                    style={styles.poster} testID="PosterImage"
                  />
                </View>
                <View style={styles.ModalDataCenter}>
                  <Text style={[styles.title, {color: '#000'}]}>
                    {data.title}{' '}
                    <Text style={styles.ModalSubTitle}>
                      ({data.release_year})
                    </Text>
                  </Text>
                  <Text style={styles.ModalSubTitle2}>{data.genre}</Text>
                  <View style={styles.RatingSection}>
                    <Image
                      source={require('../assets/Icons/star.png')}
                      style={styles.RatingIcon}
                    />
                    <Text
                      style={[
                        styles.ModalSubTitle2,
                        {marginTop: verticalScale(-2)},
                      ]}>
                      {data.rating}
                    </Text>
                  </View>
                  <Text style={styles.ModalSubTitle}>
                    Director:{' '}
                    <Text style={styles.ModalSubTitle2}>{data.director}</Text>
                  </Text>
                  <Text style={styles.ModalSubTitle}>Description:</Text>
                  <Text style={styles.ModalSubTitle2}>{data.description}</Text>
                </View>
                <TouchableOpacity style={styles.WatchBtn}>
                  <Text style={{color: '#fff'}}>Watch Now</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
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
    width: verticalScale(280),
  },
  poster: {
    width: verticalScale(80),
    height: verticalScale(110),
    borderRadius: verticalScale(10),
    resizeMode: 'contain',
  },
  posterContainer: {
    width: verticalScale(80),
    height: verticalScale(110),
    borderRadius: verticalScale(10),
  },
  cardContent: {
    marginLeft: verticalScale(15),
    justifyContent: 'flex-start',
    paddingTop: verticalScale(20),
  },
  title: {
    color: '#fff',
    fontSize: verticalScale(16),
  },
  subText: {
    color: '#fff',
    fontSize: verticalScale(15),
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
  chooseBtn: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ddd',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: verticalScale(10),
  },
  CrossBtn: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  MainModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
  },
  ModalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 10,
    maxHeight: '90%',
  },
  imageArea: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ModalDataTop: {
    alignItems: 'center',
    marginBottom: 10,
  },
  ModalDataCenter: {
    paddingHorizontal: 10,
  },
  ModalSubTitle: {
    fontSize: verticalScale(14),
    fontWeight: '500',
    color: '#444',
  },
  ModalSubTitle2: {
    fontSize: verticalScale(13),
    color: '#666',
    marginVertical: 4,
  },
  RatingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  WatchBtn: {
    backgroundColor: '#000',
    padding: 12,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});
