import { FlatList, StyleSheet, Text, View , Image, ImageBackground, TouchableOpacity, Modal } from 'react-native'
import React,{useState} from 'react'
import CoruselData from '../Constants/CarouselData'
import { scale, verticalScale , width} from '../Constants/Dimensions';


const ITEM_WIDTH = width * 0.8;

const Carousel = () => {

  const [selected, setselected] = useState(false)
  return (
    <View>
      <Text style={styles.title}>Featured Movies</Text>
      <FlatList 
    data={CoruselData}
    horizontal
    pagingEnabled={true}
    snapToAlignment="center"
    snapToInterval={width}
    decelerationRate="normal"
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal:1 }}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={[styles.card]}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.poster}
          resizeMode="cover"
        >
          <View style={styles.Views}>
            <Image
              source={require('../assets/Icons/view.png')}
              style={styles.icon}
              resizeMode="cover"
             />
          <Text>
            {item.views}
          </Text>
          </View>
          <View style={styles.MovieTitle}>
            <View>
            <Text style={{color:'#000', fontSize: scale(20), fontWeight:'bold'}}>{item.name}</Text>
            <Text style={{color:'#000', fontSize: scale(15)}}>{item.type}</Text>
            </View>
            <TouchableOpacity style={styles.rightMovieTitle} onPress={() => setselected(!selected)}>
            <Image
              source={require('../assets/Icons/right-up.png')}
              style={styles.ModalIcon}
              resizeMode="cover"
             />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )}
  />
    <Modal
      animationType="slide"
      transparent={true}
      visible={selected}
      >
        <View style={styles.Modal}>
          <TouchableOpacity onPress={()=> setselected(!selected)}>
            <Image source={require('../assets/Icons/cross.png')} style={styles.ModalCloseIcon}
            />
          </TouchableOpacity>
          <View style={styles.ModalContainer}>
            <Text>fgdhfgjdjdskbjkds</Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
    card: {
        marginHorizontal: verticalScale(20),
        borderRadius: verticalScale(12),
        overflow: 'hidden',
        width: width-verticalScale(40),
      },
      title: {
        fontSize: verticalScale(18),
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: verticalScale(10),
        marginLeft: verticalScale(20),
      },
      poster: {
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
        width:verticalScale(240),
        paddingHorizontal: verticalScale(10),
        borderRadius: verticalScale(20),
        borderWidth: verticalScale(1),
        borderColor: '#000',
      },
      Modal: {
        justifyContent:'flex-end', 
        alignItems:'center', 
        backgroundColor:'rgba(0, 0, 0, 0.5)', 
        flex:1
      },
      ModalIcon: {
        width: verticalScale(25),
        height: verticalScale(25),
        tintColor:'#fff'
      },
      rightMovieTitle: {
        backgroundColor: 'rgba(133, 132, 132, 0.5)',
        padding: verticalScale(4),
        borderRadius: verticalScale(20),
      },
      ModalContainer: {
        height: verticalScale(450),
        width: verticalScale(300),
        borderRadius: verticalScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      ModalCloseIcon: {
        width: verticalScale(25),
        height: verticalScale(25),
        bottom: verticalScale(10),
      }
})