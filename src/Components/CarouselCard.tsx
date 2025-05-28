import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  moderateScale,
  scale,
  verticalScale,
  width,
} from '../Constants/Dimensions';

const CarouselCard = ({ item, testID, onModalChange }) => {
  const [selected, setselected] = useState(false);

  const toggleModal = () => {
    const newState = !selected;
    setselected(newState);
    onModalChange(newState ? item.id : null);
  };

  return (
    <View testID={testID}>
      <View style={styles.card}>
        <ImageBackground
          source={{uri: item.banner_url}}
          style={styles.posterBackground}
          resizeMode="cover">
          <LinearGradient
            colors={[
              'rgba(0, 0, 0, 0.91)',
              'rgba(0, 0, 0, 0.36)',
              'rgba(0,0,0,0)',
            ]}
            start={{x: 0.5, y: 1}}
            end={{x: 0.5, y: 0}}
            style={styles.MovieTitle}>
            <View>
              <Text
                style={styles.movieTitleText}
                testID={`movie-title-${item.id}`}>
                {item.title}
              </Text>
              <Text
                style={styles.movieGenreText}
                testID={`movie-genre-${item.id}`}>
                {item.genre}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.rightMovieTitle}
              onPress={toggleModal}
              testID={`toggle-modal-${item.id}`}>
              <Image
                source={require('../assets/Icons/right-up.png')}
                style={styles.ModalIcon}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={selected}
        onRequestClose={() => setselected(false)}
        testID={`modal-${item.id}`}>
        <ImageBackground
          source={{uri: item.banner_url}}
          style={styles.fullScreenBackground}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
            style={styles.gradientOverlay}>
            <TouchableOpacity
              onPress={() => setselected(false)}
              style={styles.CrossBtn}
              testID={`close-modal-${item.id}`}>
              <Image
                source={require('../assets/Icons/cross.png')}
                style={styles.crossIcon}
              />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.ModalContent} showsVerticalScrollIndicator={false}>
              <Text style={styles.ModalTitle}>Movie Details</Text>

              <View style={styles.ModalDataTop}>
                <Image source={{uri: item.poster_url}} style={styles.poster} />
              </View>

              <View style={styles.ModalDataCenter}>
                <Text
                  style={[styles.title, {color: '#fff'}]}
                  testID={`movie-title-modal-${item.id}`}>
                  {item.title}{' '}
                  <Text
                    style={[
                      styles.subTitle,
                      {
                        fontWeight: '400',
                        fontSize: verticalScale(12),
                        color: '#ccc',
                      },
                    ]}
                    testID={`movie-year-${item.id}`}>
                    ({item.release_year})
                  </Text>
                </Text>

                <Text
                  style={[styles.subTitle, {color: '#ddd', marginBottom: verticalScale(10)}]}
                  testID={`movie-genre-modal-${item.id}`}>
                  {item.genre}
                </Text>

                <View style={styles.RatingSection}>
                  <Image
                    source={require('../assets/Icons/star.png')}
                    style={styles.RatingIcon}
                  />
                  <Text
                    style={[styles.subTitle, {color: '#fff', marginLeft: verticalScale(6)}]}
                    testID={`movie-rating-${item.id}`}>
                    {item.rating}
                  </Text>
                </View>

                <Text
                  style={[styles.subTitle, {color: '#fff', fontWeight: '600', marginTop: verticalScale(15)}]}
                  testID={`movie-duration-${item.id}`}>
                  Duration: <Text style={{fontWeight: '400'}} testID={`movie-duration-value-${item.id}`}>{item.duration} hrs.</Text>
                </Text>

                <Text
                  style={[styles.subTitle, {color: '#fff', fontWeight: '600', marginTop: verticalScale(12)}]}
                  testID={`movie-director-${item.id}`}>
                  Director: <Text style={{fontWeight: '400'}} testID={`movie-director-value-${item.id}`}>{item.director}</Text>
                </Text>

                <Text
                  style={[styles.subTitle, {color: '#fff', fontWeight: '600', marginTop: verticalScale(18), marginBottom: verticalScale(6)}]}
                  testID={`movie-description-title-${item.id}`}>
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
                  ]}
                  testID={`movie-description-${item.id}`}>
                  {item.description}
                </Text>
              </View>

              <TouchableOpacity style={styles.WatchBtn}>
                <Text style={{color: '#fff', fontWeight: 'bold'}} testID={`watch-now-${item.id}`}>
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

export default CarouselCard;

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    width: width,
    height: verticalScale(200),
  },
  posterBackground: {
    width: '100%',
    height: verticalScale(200),
  },
  MovieTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    width: width,
    paddingHorizontal: verticalScale(15),
    paddingVertical: verticalScale(10),
    paddingTop: verticalScale(150),
    flex: 1,
  },
  movieTitleText: {
    color: '#fff',
    fontSize: scale(20),
    fontWeight: '500',
    lineHeight: verticalScale(20),
  },
  movieGenreText: {
    color: '#fff',
    fontSize: scale(15),
  },
  rightMovieTitle: {
    backgroundColor: 'rgba(133, 132, 132, 0.5)',
    padding: verticalScale(4),
    borderRadius: verticalScale(20),
  },
  ModalIcon: {
    width: verticalScale(25),
    height: verticalScale(25),
    tintColor: '#fff',
  },
  fullScreenBackground: {
    flex: 1,
  },
  gradientOverlay: {
    flex: 1,
    paddingHorizontal: verticalScale(20),
    paddingTop: verticalScale(50),
  },
  CrossBtn: {
    position: 'absolute',
    top: verticalScale(15),
    right: verticalScale(15),
  },
  crossIcon: {
    width: verticalScale(28),
    height: verticalScale(28),
  },
  ModalContent: {
    paddingBottom: verticalScale(30),
  },
  ModalTitle: {
    fontSize: moderateScale(28),
    fontWeight: '500',
    color: '#fff',
    marginBottom: verticalScale(25),
    alignSelf: 'center',
  },
  ModalDataTop: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  poster: {
    width: scale(260),
    height: verticalScale(260),
    borderRadius: scale(12),
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  ModalDataCenter: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: verticalScale(5),
  },
  title: {
    fontSize: verticalScale(20),
    fontWeight: '500',
    marginVertical: verticalScale(10),
  },
  subTitle: {
    fontSize: verticalScale(14),
  },
  RatingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: verticalScale(1),
    borderColor: '#D89216',
    paddingVertical: verticalScale(2),
    paddingHorizontal: verticalScale(8),
    borderRadius: verticalScale(20),
    backgroundColor: 'rgba(252, 221, 81, 0.45)',
    marginTop: verticalScale(8),
  },
  RatingIcon: {
    height: verticalScale(16),
    width: verticalScale(16),
  },
  WatchBtn: {
    backgroundColor: '#CD1818',
    paddingVertical: verticalScale(14),
    borderRadius: verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(30),
    shadowColor: '#CD1818',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
});
