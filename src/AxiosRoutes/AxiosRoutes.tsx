import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';

// const API_URL = 'https://movie-explorer-ror-aalekh-2ewg.onrender.com';
const API_URL = 'https://movie-explorer-ror-abhinav.onrender.com';

// 1. Signup API
export const signUpRequest = async (data: {
  user?: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    mobile_number: string;
  };
  email?: string;
  password?: string;
}) => {
  return axios.post(`${API_URL}/users`, data, {
    headers: {'Content-Type': 'application/json'},
  });
};

// 2. Login API
export const LoginRequest = async (data: {
  user?: {email: string; password: string};
  email?: string;
  password?: string;
  
}) => {
  return axios.post(`${API_URL}/users/sign_in`, data, {
    headers: {'Content-Type': 'application/json'},
  });
};

// 3. Get All Movies
export const GetAllMovies = async (page = 1, perPage = 10) => {
  try {
    const res = await axios.get(
      `${API_URL}/api/v1/movies?page=${page}&per_page=${perPage}`,
    );
    return res.data.movies;
  } catch (error) {
    console.log('Error fetching:', error);
    return null;
  }
};

// 4. Movie Types
type MovieFormData = {
  banner: any;
  poster: any;
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

interface Movie {
  id: number;
  title: string;
  genre: string;
  release_year: number;
  rating: number;
  director: string;
  description: string;
  duration: number;
  isPremium: boolean;
  main_lead: string;
  streaming_platform: string;
  poster_url?: string;
  banner_url?: string;
}

// 5. Create Movie
export const createMovie = async (
  formData: MovieFormData,
): Promise<Movie | null> => {
  console.log(formData)
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('You need to sign in first.');
      throw new Error('No authentication token found');
    }

    const movieFormData = new FormData();
    movieFormData.append('movie[title]', formData.title);
    movieFormData.append('movie[genre]', formData.genre);
    movieFormData.append('movie[release_year]', formData.release_year);
    movieFormData.append('movie[director]', formData.director);
    movieFormData.append('movie[duration]', formData.duration);
    movieFormData.append('movie[description]', formData.description);
    movieFormData.append('movie[main_lead]', formData.main_lead);
    movieFormData.append(
      'movie[streaming_platform]',
      formData.streaming_platform,
    );
    movieFormData.append('movie[rating]', formData.rating);
    movieFormData.append('movie[premium]', String(formData.isPremium));
    if (formData.poster_url)
      movieFormData.append('movie[poster]', formData.poster_url);
    if (formData.banner_url)
      movieFormData.append('movie[banner]', formData.banner_url);
    // console.log('vhdffdsjbvjkdb', movieFormData)
    const response = await axios.post(
      `${API_URL}/api/v1/movies`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );

    const movie: Movie = response.data.movie;
    console.log('Movie created successfully:', movie);
    console.log(response.data);
    return movie;
  } catch (error: any) {
    // console.error('Error creating movie:', error.message, error.response?.data);
    // Alert.alert(error.response?.data?.error || 'Failed to create movie');
    throw error.response?.data?.errors || null;
  }
}

// 6. Delete Movie
export const deleteMovie = async (id: number): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('You need to sign in first.');
      throw new Error('No authentication token found');
    }

    await axios.delete(`${API_URL}/api/v1/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    Alert.alert('Movie deleted successfully!');
    return true;
  } catch (error: any) {
    console.error('Error deleting movie:', error.message, error.response?.data);
    Alert.alert(error.response?.data?.error || 'Failed to delete movie');
    return false;
  }
};

// 7. Update Movie
export const updateMovie = async (
  id: number,
  formData: MovieFormData,
): Promise<boolean | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const movieFormData = new FormData();
    movieFormData.append('movie[title]', formData.title);
    movieFormData.append('movie[genre]', formData.genre);
    movieFormData.append('movie[release_year]', formData.release_year);
    movieFormData.append('movie[director]', formData.director);
    movieFormData.append('movie[duration]', formData.duration);
    movieFormData.append('movie[description]', formData.description);
    movieFormData.append('movie[main_lead]', formData.main_lead);
    movieFormData.append(
      'movie[streaming_platform]',
      formData.streaming_platform,
    );
    movieFormData.append('movie[rating]', formData.rating);
    movieFormData.append('movie[premium]', String(formData.isPremium));
    if (formData.poster) movieFormData.append('movie[poster]', formData.poster);
    if (formData.banner) movieFormData.append('movie[banner]', formData.banner);

    const response = await axios.patch(
      `${API_URL}/api/v1/movies/${id}`,
      movieFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );

    console.log('Movie updated successfully:', response.data.movie);
    return true;
  } catch (error: any) {
    console.error('Error updating movie:', error.message, error.response?.data);
    return null;
  }
};

// 8. Get Current User
type User = {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  role: string;
};

export const GetCurrentUser = async (): Promise<User | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('You need to sign in first.');
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_URL}/api/v1/current_user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    console.log('User fetched successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user:', error.message, error.response?.data);
    return null;
  }
};

// 9. Get Subscription Status
interface SubscriptionStatus {
  plan_type: string;
  status: string;
  expiry_date?: string;
}

export const getSubscriptionStatus = async (): Promise<SubscriptionStatus> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      // Alert.alert('You need to sign in first.');
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_URL}/api/v1/subscriptions/status`, {
      headers: {Authorization: `Bearer ${token}`},
    });

    if ('error' in response.data) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error: any) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.error || 'Failed to fetch subscription status'
        : 'An unexpected error occurred',
    );
  }
};

interface SendTokenParams {
  userId: string;
  token: string;
  authToken: string;
}

export const sendTokenToBackend = async ({
  userId,
  token,
  authToken,
}: SendTokenParams): Promise<any> => {
  try {
    if (!userId || !token || !authToken) {
      throw new Error(
        'Missing required parameters (userId, token, or authToken).',
      );
    }

    console.log('Sending FCM token to backend:', token);
    console.log('User ID:', userId);
    console.log('Using auth token:', authToken);

    const response = await fetch(`${API_URL}/api/v1/update_device_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        user_id: userId,
        device_token: token,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Failed to send device token: ${response.status} ${
          response.statusText
        } - ${errorData.message || 'Unknown error'}`,
      );
    }
    const data = await response.json();
    console.log('Device token sent to backend successfully:', data);
    return data;
  } catch (error) {
    console.error('Error sending device token to backend:', error);
    throw error;
  }
};

export const createSubscription = async (
  planType: string,
  token: string,
): Promise<string> => {
  try {
    if (!token) {
      throw new Error('No authentication token provided');
    }

    const response = await axios.post(
      `${API_URL}/api/v1/subscriptions`,
      {plan_type: planType,
        client_type:"mobile"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('API Response:', response.data);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    const checkoutUrl =
      response.data.checkoutUrl ||
      response.data.data?.checkoutUrl ||
      response.data.url;

    if (!checkoutUrl) {
      throw new Error('No checkout URL returned from server.');
    }

    return response.data;
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    throw new Error(error.message || 'Failed to initiate subscription');
  }
};

export const GetSubscriptionStatus = async (session_id : string) => {
  try {
    const res = await axios.get(
      `${API_URL}/api/v1/subscriptions/success?session_id=${session_id}`,
    );
    return res;
  } catch (error) {
    console.log('Error fetching:', error);
    return null;
  }
};


export const toggleNotifications = async (authToken: string , value: boolean) => {
  try {
    if (!authToken) {
      throw new Error('No authentication token provided');
    }
    const response = await axios.post(`${API_URL}/api/v1/toggle_notifications`, {
      notifications_enabled:value,
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    console.log("RESPONSE FOR NOTIFICATIONS: ", response.status);
    return response.status;
  } catch (error) {
    console.error('Error Accepting Notifications:', error);
    throw error;
  }
};
