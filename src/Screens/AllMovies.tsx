import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale, verticalScale} from '../Constants/Dimensions';
import GenreMovies from '../Components/GenreMovies';
import AddMovies from '../Components/AddMovies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetAllMovies} from '../AxiosRoutes/AxiosRoutes';
import {useDispatch} from 'react-redux';
import {setMovies} from '../redux/slices/movieSlice';

const genres = ['All', 'Si-Fi', 'Action', 'Comedy','Thriller', 'Drama', 'Romance'];

const AllMovies = () => {
  const [SelectedGenre, setSelectedGenre] = useState('All');
  const [isAdmin, setisAdmin] = useState(false);
  const [page, setpage] = useState(2);
  const dispatch = useDispatch();
  useEffect(() => {
    const FetchRole = async () => {
      const role = await AsyncStorage.getItem('userRole');
      if (role === 'supervisor') {
        setisAdmin(true);
      }
    };
    FetchRole();
  }, []);

  const handleReload = async () => {
    try {
      const data = await GetAllMovies(1, 10);
      dispatch(setMovies(data));
      setpage(2);
      ToastAndroid.show('Data Updated Successfully', ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show('Failed to update data', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={styles.MainContainer}>
      <View style={styles.subcontainer}>
        <Text style={styles.MainTitle}>All Movies</Text>
        <View>{isAdmin && <AddMovies handleReload={handleReload} />}</View>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{padding: verticalScale(10)}}>
          {genres.map((genre, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.block,
                SelectedGenre === genre && styles.selectedBlock,
              ]}
              onPress={() => setSelectedGenre(genre)}>
              <Text style={styles.blockText}>{genre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <GenreMovies data={SelectedGenre} page={page} setPage={setpage} handleReload={handleReload}/>
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
    flexDirection: 'row',
  },
  block: {
    backgroundColor: '#fff',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: verticalScale(20),
    marginRight: verticalScale(10),
    height: scale(38),
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
