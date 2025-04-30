import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SearchCard = ({data}) => {
  return (
    <View style={styles.container}>
        <View style={styles.posterContainer}>
            <Image
            source={{uri: data.image}} 
            style={styles.poster}
            />
        </View>
        <View style={styles.cardContent}>
        <Text style={{color: '#fff', fontSize: 20}}>{data.name}</Text>
        <Text style={{color: '#fff', fontSize: 15}}>{data.year}</Text>
        <Text style={{color: '#fff', fontSize: 15}}>{data.rating}</Text>
        <Text style={{color: '#fff', fontSize: 15}}>{data.type}</Text>
        </View>
    </View>
  )
}

export default SearchCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 10,
        marginBlock: 10,
        alignItems: 'center',
        height: 140,
        width: '100%',
        
    },
    poster: {
        width: 80,
        height: 110,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    posterContainer: {
        width: 80,
        height: 110,
        borderRadius: 10,
        // marginBottom: 10,
        // justifyContent:'flex-start',
        // alignItems: 'center',
    },
    cardContent: {
        marginLeft: 15, 
        height: 150,
        justifyContent:'flex-start',
        paddingTop: 20, 
   }
})