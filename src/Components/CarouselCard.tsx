import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import { moderateScale, scale, verticalScale, width } from '../Constants/Dimensions';

const CarouselCard = ({ item, testID }) => {
  const [selected, setselected] = useState(false);

  return (
    <View testID={testID}>
      <View style={[styles.card]}>
        <ImageBackground
          source={{ uri: item.poster_url }}
          style={styles.posterBackground}
          resizeMode="cover"
        >
          <View style={styles.MovieTitle}>
            <View>
              <Text 
                style={{ color: '#000', fontSize: scale(20), fontWeight: 'bold' }} 
                testID={`movie-title-${item.id}`} // Added testID here
              >
                {item.title}
              </Text>
              <Text 
                style={{ color: '#000', fontSize: scale(15) }} 
                testID={`movie-genre-${item.id}`} // Added testID here
              >
                {item.genre}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.rightMovieTitle}
              onPress={() => setselected(!selected)}
              testID={`toggle-modal-${item.id}`}
            >
              <Image
                source={require('../assets/Icons/right-up.png')}
                style={styles.ModalIcon}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={selected}
        onRequestClose={() => {
          setselected(!selected);
        }}
        testID={`modal-${item.id}`}
      >
        <View style={styles.ModalScreen}>
          <View style={styles.ModalContainer}>
            <Text style={styles.ModalTitle}>Movie Details</Text>
            <TouchableOpacity
              onPress={() => setselected(!selected)}
              style={styles.CrossBtn}
              testID={`close-modal-${item.id}`}
            >
              <Image
                source={require('../assets/Icons/cross.png')}
                style={{ width: verticalScale(25), height: verticalScale(25) }}
              />
            </TouchableOpacity>
            <View>
              <View style={styles.ModalDataTop}>
                <Image source={{ uri: item.poster_url }} style={styles.poster} />
              </View>
              <View style={styles.ModalDataCenter}>
                <Text style={[styles.title, { color: '#000' }]} testID={`movie-title-modal-${item.id}`}>
                  {item.title}{' '}
                  <Text
                    style={[styles.subTitle, { fontWeight: '400', fontSize: verticalScale(10), color: '#000' }]}
                    testID={`movie-year-${item.id}`} 
                  >
                    ({item.release_year})
                  </Text>
                </Text>
                <Text
                  style={[styles.subTitle, { color: '#000', fontWeight: '400', fontSize: verticalScale(10) }]}
                  testID={`movie-genre-modal-${item.id}`} 
                >
                  {item.genre}
                </Text>
                <View style={styles.RatingSection}>
                  <Image
                    source={require('../assets/Icons/star.png')}
                    style={styles.RatingIcon}
                  />
                  <Text
                    style={[styles.subTitle, { color: '#000', marginLeft: verticalScale(5) }]}
                    testID={`movie-rating-${item.id}`}
                  >
                    {item.rating}
                  </Text>
                </View>
                <Text
                  style={[styles.subTitle, { color: '#000', fontWeight: 'bold', marginTop: verticalScale(10) }]}
                  testID={`movie-duration-${item.id}`} 
                >
                  Duration :-{' '}
                  <Text
                    style={[styles.subTitle, { color: '#000', fontWeight: '400' }]}
                    testID={`movie-duration-value-${item.id}`}
                  >
                    {item.duration} hrs.
                  </Text>
                </Text>
                <Text
                  style={[styles.subTitle, { color: '#000', fontWeight: 'bold', marginTop: verticalScale(10) }]}
                  testID={`movie-director-${item.id}`} 
                >
                  Director :-{' '}
                  <Text
                    style={[styles.subTitle, { color: '#000', fontWeight: '400' }]}
                    testID={`movie-director-value-${item.id}`}
                  >
                    {item.director}
                  </Text>
                </Text>
                <Text
                  style={[styles.subTitle, { color: '#000', fontWeight: 'bold', marginTop: verticalScale(10) }]}
                  testID={`movie-description-title-${item.id}`} 
                >
                  Description :-
                </Text>
                <Text
                  style={[styles.subTitle, { color: '#000', fontWeight: '400', marginTop: verticalScale(5), lineHeight: verticalScale(18) }]}
                  testID={`movie-description-${item.id}`}
                >
                  {item.description}
                </Text>
              </View>
              <View>
                <TouchableOpacity style={styles.WatchBtn}>
                  <Text testID={`watch-now-${item.id}`}>Watch Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CarouselCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: verticalScale(20),
    borderRadius: verticalScale(12),
    overflow: 'hidden',
    width: width - verticalScale(40),
  },
  title: {
    fontSize: verticalScale(18),
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: verticalScale(10),
    marginLeft: verticalScale(20),
  },
  posterBackground: {
    width: '100%',
    height: verticalScale(300),
  },
  icon: {
    width: verticalScale(15),
    height: verticalScale(15),
  },
  Views: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: verticalScale(5),
    borderRadius: verticalScale(20),
    borderWidth: verticalScale(1),
    borderColor: '#000',
    top: verticalScale(10),
    right: verticalScale(10),
  },
  MovieTitle: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: verticalScale(10),
    left: verticalScale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: verticalScale(10),
    width: verticalScale(240),
    paddingHorizontal: verticalScale(10),
    borderRadius: verticalScale(20),
    borderWidth: verticalScale(1),
    borderColor: '#000',
  },
  Modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  ModalIcon: {
    width: verticalScale(25),
    height: verticalScale(25),
    tintColor: '#fff',
  },
  rightMovieTitle: {
    backgroundColor: 'rgba(133, 132, 132, 0.5)',
    padding: verticalScale(4),
    borderRadius: verticalScale(20),
  },
  ModalCloseIcon: {
    width: verticalScale(25),
    height: verticalScale(25),
    bottom: verticalScale(10),
  },
  ModalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalContainer: {
    width: width * 0.9,
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
  poster: {
    width: scale(150),
    height: verticalScale(170),
    borderRadius: scale(10),
    resizeMode: 'cover',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTitle: {
    color: '#fff',
    fontSize: 15,
  },
});
