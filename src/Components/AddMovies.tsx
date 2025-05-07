import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {verticalScale} from '../Constants/Dimensions';
import {createMovie} from '../AxiosRoutes/AxiosRoutes'; // ✅ import the API function

const AddMovies = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState<any>({
    title: '',
    genre: '',
    releaseYear: '',
    rating: '',
    director: '',
    description: '',
    duration: '',
    isPremium: '',
    mainLead: '',
    streamingPlatform: '',
    poster: '',
    banner: '',
  });

  const handleChange = (field: any, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const processedData = {
        title: formData.title,
        genre: formData.genre,
        release_year: formData.releaseYear,
        rating: parseFloat(formData.rating),
        director: formData.director,
        description: formData.description,
        duration: formData.duration,
        isPremium: formData.isPremium === 'true',
        main_lead: formData.mainLead,
        streaming_platform: formData.streamingPlatform,
        poster_url: formData.poster, // must be a valid File/Blob if you're uploading
        banner_url: formData.banner, // same here
      };

      const result = await createMovie(processedData);
      console.log(result);
      if (result) {
        Alert.alert('Success', 'Movie added successfully!');
        setIsVisible(false);
        setFormData({
          title: '',
          genre: '',
          releaseYear: '',
          rating: '',
          director: '',
          description: '',
          duration: '',
          isPremium: '',
          mainLead: '',
          streamingPlatform: '',
          poster: '',
          banner: '',
        });
      } else {
        Alert.alert('Error', 'Movie creation failed');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View testID="MainContainer">
      <View>
        <TouchableOpacity
          onPress={() => {
            // Alert.alert('hello');
            setIsVisible(true);
          }}
          testID="addButton">
          <Image
            source={require('../assets/Icons/add.png')}
            style={styles.addIcon}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        // onRequestClose={() => setIsVisible(false)}
        testID="addMovieModal">
        <View style={styles.modalBackground}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled">
              <View style={styles.modalContainer} testID="ModalContainer">
                <TouchableOpacity
                  onPress={() => setIsVisible(false)}
                  style={styles.closeButton}
                  testID="closeButton">
                  <Image
                    source={require('../assets/Icons/cross.png')}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>

                <Text style={styles.modalTitle}>Add New Movie</Text>

                {[
                  'title',
                  'genre',
                  'releaseYear',
                  'rating',
                  'director',
                  'description',
                  'duration',
                  'isPremium',
                  'mainLead',
                  'streamingPlatform',
                  'poster_url',
                  'banner_url',
                ].map((field, index) => (
                  <TextInput
                    key={index}
                    style={styles.input}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    placeholderTextColor={'#000'}
                    value={formData[field]}
                    onChangeText={value => handleChange(field, value)}
                    keyboardType={
                      ['releaseYear', 'rating'].includes(field)
                        ? 'numeric'
                        : 'default'
                    }
                    testID={`${field}Input`}
                  />
                ))}

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                  testID="saveButton">
                  <Text style={styles.saveButtonText}>Save Movie</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default AddMovies;

const styles = StyleSheet.create({
  addIcon: {
    width: verticalScale(30),
    height: verticalScale(25),
    resizeMode: 'contain',
    tintColor: '#fff',
    left: verticalScale(60),
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modalContainer: {
    width: verticalScale(270),
    maxWidth: 350,
    backgroundColor: 'rgb(147, 145, 145)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    elevation: 8,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeIcon: {
    width: 28,
    height: 28,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    backgroundColor: 'rgb(240, 237, 237)',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  saveButton: {
    backgroundColor: '#e50914',
    padding: 14,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  keyboardAvoidingContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
});
