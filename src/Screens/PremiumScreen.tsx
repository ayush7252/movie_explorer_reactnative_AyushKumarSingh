import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from '../Constants/Dimensions'

const PremiumScreen = () => {
  return (
    <View style={styles.MainContainer}>
      <ScrollView>
      <View style={styles.PremiumCard}>
        <View style={styles.textArea}>
          <View style={styles.txtArea}>
            <Text style={styles.titleTxt}>Premium</Text>
            <Text style={styles.titleTxt}>Membership</Text>
          </View>
          <View style={styles.badgeicon}>
            <Image
            source={require('../assets/Icons/stars.png')}
            style={styles.stars}
             />
          </View>

        </View>
        <View>
        <Text style={styles.subTitle}>Features Activated</Text>
        <View style={{flexDirection:'row'}}>
          <Image source={require('../assets/Icons/checkmark.png')}  style={styles.checkMark}/>
        <Text>Ad-Free Experience</Text>
        </View>
        <Text>Exclusive Content</Text>
        <Text>Early Access to New Releases</Text>
        <Text>Full HD & 4K Streaming</Text>
        <Text>Global Content Access</Text>
        <Text>Monthly Surprises</Text>
        </View>

      </View>
{/* second card */}
      <View style={styles.PremiumCard}>
        <View style={styles.textArea}>
          <View style={styles.txtArea}>
            <Text style={styles.titleTxt}>Premium</Text>
            <Text style={styles.titleTxt}>Membership</Text>
          </View>
          <View style={styles.badgeicon}>
            <Image
            source={require('../assets/Icons/stars.png')}
            style={styles.stars}
             />
          </View>

        </View>
        <View>
        <Text style={styles.subTitle}>Features Activated</Text>
        </View>

      </View>
      </ScrollView>
      
    </View>
  )
}

export default PremiumScreen

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingHorizontal: verticalScale(20),
    backgroundColor:'#000',
    paddingTop:verticalScale(45),
    paddingBottom:verticalScale(40)
  },
  PremiumCard: {
    height:verticalScale(530),
    backgroundColor:'rgba(107, 107, 107, 0.5)',
    borderRadius:verticalScale(30),
    marginBottom:verticalScale(50)
  },
  textArea: {
    height:'40%',
    backgroundColor:'rgb(62, 65, 254)',
    borderRadius:verticalScale(30),
  },
  txtArea: {
    width:'100%',
    height:'40%',
    alignItems:'center',
    justifyContent:'center',
  },
  titleTxt: {
    fontSize:verticalScale(33),
    fontWeight:'900',
    lineHeight:verticalScale(33),
    color:'#fff',
  },
  stars: {
    height:verticalScale(95),
    width: verticalScale(95),
    tintColor:'#fff',
  },
  badgeicon: {
    justifyContent:'center',
    alignItems:'center',
  },
  subTitle: {
    fontSize:verticalScale(15),
    color:'#fff',
  },
  checkMark: {
    height:verticalScale(20),
    width:verticalScale(20)
  }
  
})