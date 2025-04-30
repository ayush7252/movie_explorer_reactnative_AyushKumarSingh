import { FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from '../Constants/Dimensions'
import BollywoodData from '../Constants/BolywoodData'
import SearchCard from './SearchCard'

const SearchModal = ({data}) => {
    const filteredData = BollywoodData.filter(item =>{
        return item.name.toLowerCase().includes(data.toLowerCase())
    })
  return (
    <View style={styles.container}>
        {data ? (
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <SearchCard data={item} />
                )}
                ListEmptyComponent={<View style={{alignItems:'center'}}><Text style={styles.text}>No Data Found for "{data}"</Text></View>}
             />
        ) : (
            <View style={styles.EnterMovieTitle}>
                <Text style={styles.text}>Enter movie title to search</Text>
            </View>
        )}

    </View>
  )
}

export default SearchModal

const styles = StyleSheet.create({
    container: {
        flex:1,
        // backgroundColor: '#000',
        width: '100%',
    },
    EnterMovieTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: verticalScale(20),
    },
    text: {
        fontSize: verticalScale(18),
        fontWeight: '500',
        color: 'rgba(227, 223, 223, 0.47)',
    }
})