import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from '../Constants/Dimensions'

const PremiumScreen = () => {
  const premiumFeatures = [
    'Ad-Free Experience',
    'Exclusive Content',
    'Early Access to New Releases',
    'Full HD & 4K Streaming',
    'Global Content Access',
    'Monthly Surprises',
  ];
  return (
    <View style={styles.MainContainer}>
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
             <Text style={styles.text}>$299</Text>
          </View>
        </View>
        <View style={styles.contentArea}>
        <Text style={styles.subTitle}>Features Activated</Text>
        <FlatList
        data={premiumFeatures}
        keyExtractor={(item , index) => index.toString()}
        renderItem={({item})=>(
          <View style={styles.featureItem}>
             <Image
            source={require('../assets/Icons/checkmark.png')}
            style={styles.checkMark}
          />
          <Text style={styles.text}>{item}</Text>
          </View>
        )}
         />
         <View style={{alignItems:'center'}}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>Buy Now</Text>
          </TouchableOpacity>
         </View>
        </View>
      </View>
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
    fontSize:verticalScale(24),
    color:'#fff',
    marginBottom:verticalScale(20)
  },
  featureItem: {
    flexDirection:'row',
    alignItems:'center',
  },
  checkMark: {
    height:verticalScale(22),
    width:verticalScale(22)
  },
  contentArea: {
    paddingHorizontal:verticalScale(10),
    paddingTop:verticalScale(10)
  },
  text: {
    fontSize:verticalScale(16),
    color:'#fff',
    marginVertical:scale(10),
    marginLeft:verticalScale(10),
    lineHeight:verticalScale(16)
  },
  btn: {
    width:'50%',
    height:verticalScale(40),
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:verticalScale(30),
    marginTop:verticalScale(20)
  },
  btnTxt: {
    fontSize:verticalScale(24),
    color:'#fff',
    lineHeight:verticalScale(24),
  }
  
})