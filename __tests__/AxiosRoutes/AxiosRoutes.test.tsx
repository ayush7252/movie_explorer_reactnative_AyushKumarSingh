import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  signUpRequest,
  LoginRequest,
  GetAllMovies,
  createMovie,
  deleteMovie,
} from '../../src/AxiosRoutes/AxiosRoutes';

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('signUpRequest should post user data', async () => {
    const mockData = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { data: { message: 'Signed up successfully' } };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await signUpRequest(mockData);

    expect(axios.post).toHaveBeenCalledWith(
      'https://movie-explorer-ror-aalekh-2ewg.onrender.com/users',
      mockData,
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(result.data.message).toBe('Signed up successfully');
  });

  it('LoginRequest should post login data', async () => {
    const mockData = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { data: { token: 'mocked_token' } };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await LoginRequest(mockData);

    expect(axios.post).toHaveBeenCalledWith(
      'https://movie-explorer-ror-aalekh-2ewg.onrender.com/users/sign_in',
      mockData,
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(result.data.token).toBe('mocked_token');
  });

  it('GetAllMovies should fetch paginated movies', async () => {
    const mockMovies = [{ id: 1, title: 'Movie A' }];
    (axios.get as jest.Mock).mockResolvedValue({ data: { movies: mockMovies } });

    const result = await GetAllMovies(1, 10);

    expect(axios.get).toHaveBeenCalledWith(
      'https://movie-explorer-ror-aalekh-2ewg.onrender.com/api/v1/movies?page=1&per_page=10'
    );
    expect(result).toEqual(mockMovies);
  });

  it('createMovie should send movie form data with auth token', async () => {
    const fakeToken = 'mocked_token';
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(fakeToken);

    const mockResponse = {
      data: {
        movie: {
          id: 1,
          title: 'Test Movie',
          genre: 'Action',
          release_year: '2024',
          director: 'John Doe',
          duration: '120',
          description: 'Some description',
          main_lead: 'Actor X',
          streaming_platform: 'Netflix',
          rating: 4.5,
          isPremium: true,
          poster_url: 'https://poster.jpg',
          banner_url: 'https://banner.jpg',
        },
      },
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await createMovie({
      title: 'Test Movie',
      genre: 'Action',
      release_year: '2024',
      director: 'John Doe',
      duration: '120',
      description: 'Some description',
      main_lead: 'Actor X',
      streaming_platform: 'Netflix',
      rating: 4.5,
      isPremium: true,
      poster_url: 'https://poster.jpg',
      banner_url: 'https://banner.jpg',
    });

    expect(axios.post).toHaveBeenCalled();
    expect(result?.title).toBe('Test Movie');
  });

  it('deleteMovie should delete a movie with auth token', async () => {
    const fakeToken = 'mocked_token';
    const movieId = 1;

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(fakeToken);
    (axios.delete as jest.Mock).mockResolvedValue({ status: 204 });

    const result = await deleteMovie(movieId);

    expect(axios.delete).toHaveBeenCalledWith(
      `https://movie-explorer-ror-aalekh-2ewg.onrender.com/api/v1/movies/${movieId}`,
      {
        headers: {
          Authorization: `Bearer ${fakeToken}`,
          Accept: 'application/json',
        },
      }
    );
    expect(result).toBe(true);
  });

  it('createMovie should return null if token is not found', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  
    const result = await createMovie({
      title: 'Test Movie',
      genre: 'Action',
      release_year: '2024',
      director: 'John Doe',
      duration: '120',
      description: 'Some description',
      main_lead: 'Actor X',
      streaming_platform: 'Netflix',
      rating: 4.5,
      isPremium: true,
      poster_url: 'https://poster.jpg',
      banner_url: 'https://banner.jpg',
    });
  
    expect(result).toBeNull();
  });  
    
});
