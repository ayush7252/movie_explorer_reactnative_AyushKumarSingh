import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale } from '../Constants/Dimensions';
import GenreMovies from '../Components/GenreMovies';
import AddMovies from '../Components/AddMovies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetAllMovies } from '../AxiosRoutes/AxiosRoutes';
import { useDispatch } from 'react-redux';
import { setMovies } from '../redux/slices/movieSlice';



const genres = [
  'All',
  'Si-Fi',
  'Action',
  'Thriller',
  'Drama',
  'Romance',
];

const AllMovies = () => {
  const [SelectedGenre, setSelectedGenre] = useState('All');
  const [isAdmin, setisAdmin] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    const FetchRole = async()=>{  
      const role = await AsyncStorage.getItem('userRole');
      if(role === 'supervisor'){
        setisAdmin(true);
      }
    }
    FetchRole();
  },[])

  const handleReload = async() => {
    console.log("GetAllMoviesGetAllMovies");
    try {
      const data = await GetAllMovies(1, 10);
      dispatch(setMovies(data));
      Alert.alert('Data updated successfully');
    } catch (err) {
      Alert.alert('Failed to update data');
      console.error(err);
    }
  };
  


  return (
    <View style={styles.MainContainer}>
      <View style={styles.subcontainer}>
        {isAdmin && (
          <TouchableOpacity onPress={()=>handleReload()}>
            <Image source={require('../assets/Icons/refresh.png')} style={{width: 25,height: 25,resizeMode: 'contain',tintColor:'#fff', right:verticalScale(50)}}/>
          </TouchableOpacity>
        )}
        <Text style={styles.MainTitle}>All Movies</Text>
        <View>
        {isAdmin && (
          <AddMovies />
        )}
        </View>
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: verticalScale(10),}}>
          {genres.map((genre, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.block,
                SelectedGenre === genre && styles.selectedBlock,
              ]}
              onPress={() => setSelectedGenre(genre)}
            >
              <Text
                style={styles.blockText}
              >
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <GenreMovies data={SelectedGenre}/>
      </View>
    </View>
  );
};

export default AllMovies;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  Title: {
    fontSize: verticalScale(70),
    fontWeight: 'bold',
    color: '#fff',
  },
  MainTitle: {
    fontSize: verticalScale(30),
    fontWeight: 'bold',
    color: '#fff',
  },
  subcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: verticalScale(10),
    paddingTop: verticalScale(30),
    flexDirection:'row'
  },
  block: {
    backgroundColor: '#fff',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: verticalScale(20),
    marginRight: verticalScale(10),
    height : scale(38)
  },
  selectedBlock: {
    backgroundColor: '#FFD700', 
  },
  blockText: {
    color: '#000',
    fontWeight: 'bold',
    lineHeight: verticalScale(10),
  },
});
