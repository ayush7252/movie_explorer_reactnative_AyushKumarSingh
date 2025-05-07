import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

export const signUpRequest = async (data) => {
  return axios.post(
    'https://movie-explorer-ror-aalekh-2ewg.onrender.com/users',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
export const LoginRequest = async (data) => {
  return axios.post(
    'https://movie-explorer-ror-aalekh-2ewg.onrender.com/users/sign_in',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const GetAllMovies = async(page = 1, perPage = 10) => {
  try{
    const res = await axios.get(`https://movie-explorer-ror-aalekh-2ewg.onrender.com/api/v1/movies?page=${page}&per_page=${perPage}`)
    return res.data.movies
  }catch(error){
    console.log("Error fetching",error);
    return null;
  }
} 

type MovieFormData = {
  title: string;
  genre: string;
  release_year: string;
  director: string;
  duration: string;
  description: string;
  main_lead: string;
  streaming_platform: string;
  rating: number;
  isPremium: boolean;
  poster_url?: string;
  banner_url?: string;
};

type Movie = {
  id: number;
  title: string;
  genre: string;
  release_year: string;
  director: string;
  duration: string;
  description: string;
  main_lead: string;
  streaming_platform: string;
  rating: number;
  isPremium: boolean;
  poster_url?: string;
  banner_url?: string;
};

export const createMovie = async (formData: MovieFormData): Promise<Movie | null> => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    console.log("Retrieved token:", token); 
    if (!token) {
      Alert.alert("You need to sign in first.");
      throw new Error("No authentication token found");
    }

    const movieFormData = new FormData();
    movieFormData.append("movie[title]", formData.title);
    movieFormData.append("movie[genre]", formData.genre);
    movieFormData.append("movie[release_year]", formData.release_year);
    movieFormData.append("movie[director]", formData.director);
    movieFormData.append("movie[duration]", formData.duration);
    movieFormData.append("movie[description]", formData.description);
    movieFormData.append("movie[main_lead]", formData.main_lead);
    movieFormData.append("movie[streaming_platform]", formData.streaming_platform);
    movieFormData.append("movie[rating]", formData.rating);
    movieFormData.append("movie[premium]", String(formData.isPremium));
    if (formData.poster_url) {
      movieFormData.append("movie[poster]", formData.poster_url);
    }
    if (formData.banner_url) {
      movieFormData.append("movie[banner]", formData.banner_url);
    }

    const response = await axios.post('https://movie-explorer-ror-aalekh-2ewg.onrender.com/api/v1/movies' , movieFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
      },
    });

    type Movie = {
      id: number;
      title: string;
      genre: string;
      release_year: string;
      director: string;
      duration: string;
      description: string;
      main_lead: string;
      streaming_platform: string;
      rating: number;
      isPremium: boolean;
      poster_url?: string;
      banner_url?: string;
    };

    const movie: Movie = response.data.movie;
    console.log("Movie created successfully:", movie);
    return movie;
  } catch (error: any) {
    console.error("Error creating movie:", error.message, error.response?.data);
    const errorMessage = error.response?.data?.error || "Failed to create movie";
    console.error(errorMessage);
    return null;
  }
};

export const deleteMovie = async (id: number): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    console.log("Retrieved token:", token);
    if (!token) {
      Alert.alert("You need to sign in first.");
      throw new Error("No authentication token found");
    }

    await axios.delete(`https://movie-explorer-ror-aalekh-2ewg.onrender.com/api/v1/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log(`Movie with ID ${id} deleted successfully`);
    Alert.alert("Movie deleted successfully!");
    return true;
  } catch (error: any) {
    console.error("Error deleting movie:", error.message, error.response?.data);
    const errorMessage = error.response?.data?.error || "Failed to delete movie";
    Alert.alert(errorMessage);
    return false;
  }
};

