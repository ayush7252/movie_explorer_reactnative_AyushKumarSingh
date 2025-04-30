import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  width,
  height,
  scale,
  verticalScale,
  moderateScale,
} from '../Constants/Dimensions';

const isTablet = width >= 568;

const Card = ({item}) => {
  const [selected, setselected] = useState(false);
  return (
    <View>
      <View style={styles.card}>
        <ImageBackground
          source={{uri: item.image}}
          style={styles.poster}
          resizeMode="cover">
          <View style={styles.cardContent}>
            <Text style={styles.title}>
              {item.name}{' '}
              <Text
                style={[
                  styles.subTitle,
                  {fontWeight: '400', fontSize: verticalScale(10)},
                ]}>
                ( {item.year} )
              </Text>
            </Text>
            <Text style={styles.subTitle}>{item.type}</Text>
          </View>
          <TouchableOpacity
            style={styles.details}
            onPress={() => setselected(!selected)}>
            <Text>Details</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={selected}
        onRequestClose={() => {
          setselected(!selected);
        }}>
        <View style={styles.ModalScreen}>
          <View style={styles.ModalContainer}>
            <Text style={styles.ModalTitle}>Movie Details</Text>
            <TouchableOpacity
              onPress={() => setselected(!selected)}
              style={styles.CrossBtn}>
              <Image
                source={require('../assets/Icons/cross.png')}
                style={{width: verticalScale(25), height: verticalScale(25)}}
              />
            </TouchableOpacity>
            <View>
              <View style={styles.ModalDataTop}>
                <Image source={{uri: item.image}} style={styles.poster} />
              </View>
              <View style={styles.ModalDataCenter}>
                <Text style={[styles.title, {color: '#000'}]}>
                  {item.name}{' '}
                  <Text
                    style={[
                      styles.subTitle,
                      {
                        fontWeight: '400',
                        fontSize: verticalScale(10),
                        color: '#000',
                      },
                    ]}>
                    ( {item.year} )
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
                  {item.type}
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
                  {item.views} views
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
                  Actor :-{' '}
                  <Text
                    style={[
                      styles.subTitle,
                      {color: '#000', fontWeight: '400'},
                    ]}>
                    {item.actor}
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
    // height: isTablet ? height * 0.8 : height * 0.9,
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
