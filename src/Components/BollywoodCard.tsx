import { FlatList, StyleSheet, Text, View ,ImageBackground } from 'react-native'
import React from 'react'
import BollywoodData from '../Constants/BolywoodData'
import { scale, verticalScale , width} from '../Constants/Dimensions';
import Card from './Card';

const BollywoodCard = () => {
  return (
    <View style={styles.MainContainer}>
        <Text style={{color:'#fff', fontSize: scale(20), fontWeight:'bold', marginLeft:scale(10)}}>Bollywood Movies</Text>
      <FlatList
      data={BollywoodData}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <Card item={item} />
        )}
       
      />
    </View>
  )
}

export default BollywoodCard

const styles = StyleSheet.create({
    MainContainer: {
        marginTop:verticalScale(20),
    },
    
})