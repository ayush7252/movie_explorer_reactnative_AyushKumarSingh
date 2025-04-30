import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import categories from '../Constants/SliderData'
import { width, height, scale, verticalScale, moderateScale } from '../Constants/Dimensions'

const HorizontalSlider = () => {
  return (
    <View style={styles.Container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.card}>
            <Text style={styles.cardText}>{category.title}</Text>
          </TouchableOpacity>
        ))}
        </ScrollView>

        
    </View>
  )
}

export default HorizontalSlider

const styles = StyleSheet.create({
    Container: {
        paddingVertical: verticalScale(10),
    },
    categoryScroll: {
        paddingHorizontal: scale(10),
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: verticalScale(20),
        marginRight: scale(10),
        width: scale(100),
        height: verticalScale(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:verticalScale(1)
    },
    cardText:{
        color:'#fff'
    }
})