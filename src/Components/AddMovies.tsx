import React, { useState } from 'react';
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
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { verticalScale } from '../Constants/Dimensions';
import { createMovie } from '../AxiosRoutes/AxiosRoutes';
import { launchImageLibrary } from 'react-native-image-picker';

interface ImageData {
  url: string;
  name: string;
  type: string;
}

interface FormData {
  title: string;
  genre: string;
  releaseYear: string;
  rating: string;
  director: string;
  description: string;
  duration: string;
  isPremium: string;
  mainLead: string;
  streamingPlatform: string;
  poster: ImageData | null;
  banner: ImageData | null;
}

const AddMovies = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    genre: '',
    releaseYear: '',
    rating: '',
    director: '',
    description: '',
    duration: '',
    isPremium: 'false',
    mainLead: '',
    streamingPlatform: '',
    poster: null,
    banner: null,
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (isNaN(parseFloat(formData.rating)) || isNaN(parseInt(formData.releaseYear))) {
      Alert.alert('Error', 'Rating and Release Year must be valid numbers');
      return;
    }

    try {
      const formDataToSend = new FormData();

      formDataToSend.append('movie[title]', formData.title);
      formDataToSend.append('movie[genre]', formData.genre);
      formDataToSend.append('movie[release_year]', formData.releaseYear);
      formDataToSend.append('movie[rating]', formData.rating);
      formDataToSend.append('movie[director]', formData.director);
      formDataToSend.append('movie[description]', formData.description);
      formDataToSend.append('movie[duration]', formData.duration);
      formDataToSend.append('movie[isPremium]', formData.isPremium);
      formDataToSend.append('movie[main_lead]', formData.mainLead);
      formDataToSend.append('movie[streaming_platform]', formData.streamingPlatform);

      if (formData.poster) {
        formDataToSend.append('movie[poster]', {
          uri: formData.poster.url,
          name: formData.poster.name,
          type: formData.poster.type,
        });
      }
      if (formData.banner) {
        formDataToSend.append('movie[banner]', {
          uri: formData.banner.url,
          name: formData.banner.name,
          type: formData.banner.type,
        });
      }

      const result = await createMovie(formDataToSend);
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
          isPremium: 'false',
          mainLead: '',
          streamingPlatform: '',
          poster: null,
          banner: null,
        });
      } else {
        Alert.alert('Error', 'Movie creation failed');
      }
    } catch (err) {
      console.error('Error saving movie:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const handleImagePick = async (type: 'poster' | 'banner') => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
    };
    try {
      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        Alert.alert('Info', 'Image selection cancelled');
        return;
      }
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Image selection failed');
        return;
      }
      const asset = result.assets?.[0];
      if (!asset?.uri) {
        Alert.alert('Error', 'No image selected');
        return;
      }
      console.log(`Selected ${type} URI:`, asset.uri);

      const imageData: ImageData = {
        url: asset.uri,
        name: asset.fileName || 'image.jpg',
        type: asset.type || 'image/jpeg',
      };

      setFormData((prev) => ({
        ...prev,
        [type]: imageData,
      }));
    } catch (error) {
      console.error(`Error picking ${type} image:`, error);
      Alert.alert('Error', 'Something went wrong while picking the image');
    }
  };
  const isValidUri = (uri: string | undefined): boolean => {
    return typeof uri === 'string' && uri.length > 0 && (uri.startsWith('file://') || uri.startsWith('http://') || uri.startsWith('https://'));
  };

  return (
    <View testID="MainContainer">
      <View>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          testID="addButton"
          accessibilityLabel="Open add movie modal"
        >
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
        onRequestClose={() => setIsVisible(false)}
        testID="addMovieModal"
      >
        <View style={styles.modalBackground}>
          <KeyboardAvoidingView
            behavior={'height'}
            style={styles.keyboardAvoidingContainer}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.modalContainer} testID="ModalContainer">
                  <TouchableOpacity
                    onPress={() => setIsVisible(false)}
                    style={styles.closeButton}
                    testID="closeButton"
                    accessibilityLabel="Close modal"
                  >
                    <Image
                      source={require('../assets/Icons/cross.png')}
                      style={styles.closeIcon}
                    />
                  </TouchableOpacity>

                  <Text style={styles.modalTitle}>Add New Movie</Text>

                  {([
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
                  ] as (keyof FormData)[]).map((field, index) => (
                    <TextInput
                      key={index}
                      style={styles.input}
                      placeholder={
                        field === 'isPremium'
                          ? 'Is Premium (true/false)'
                          : field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      placeholderTextColor={'#000'}
                      value={typeof formData[field] === 'string' ? formData[field] : ''}
                      onChangeText={(value) => handleChange(field, value)}
                      keyboardType={
                        ['releaseYear', 'rating'].includes(field)
                          ? 'numeric'
                          : 'default'
                      }
                      testID={`${field}Input`}
                    />
                  ))}

                  <Text style={styles.imageLabel}>Poster Image</Text>
                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => handleImagePick('poster')}
                    testID="posterPickerButton"
                    accessibilityLabel="Choose poster image"
                  >
                    <Text style={styles.imageButtonText}>Choose Poster</Text>
                  </TouchableOpacity>
                  {formData.poster?.url && isValidUri(formData.poster.url) ? (
                    <Image
                      source={{ uri: formData.poster.url }}
                      style={styles.imagePreview}
                      testID="posterPreview"
                      onError={(e) => console.error('Poster image error:', e.nativeEvent.error)}
                    />
                  ) : null}

                  <Text style={styles.imageLabel}>Banner Image</Text>
                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => handleImagePick('banner')}
                    testID="bannerPickerButton"
                    accessibilityLabel="Choose banner image"
                  >
                    <Text style={styles.imageButtonText}>Choose Banner</Text>
                  </TouchableOpacity>
                  {formData.banner?.url && isValidUri(formData.banner.url) ? (
                    <Image
                      source={{ uri: formData.banner.url }}
                      style={styles.imagePreview}
                      testID="bannerPreview"
                      onError={(e) => console.error('Banner image error:', e.nativeEvent.error)}
                    />
                  ) : null}

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    testID="saveButton"
                    accessibilityLabel="Save movie"
                  >
                    <Text style={styles.saveButtonText}>Save Movie</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default AddMovies;

const styles = StyleSheet.create({
  addIcon: {
    width: verticalScale(20),
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
    shadowOffset: { width: 0, height: 4 },
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
    color: '#000',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  imageLabel: {
    marginTop: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  imageButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#000',
  },
  imagePreview: {
    width: 150,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
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