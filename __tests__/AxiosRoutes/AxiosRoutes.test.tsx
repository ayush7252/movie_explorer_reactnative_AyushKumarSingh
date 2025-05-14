import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  signUpRequest,
  LoginRequest,
  GetAllMovies,
  createMovie,
  getSubscriptionStatus,
  GetCurrentUser,
} from '../../src/AxiosRoutes/AxiosRoutes';

import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mock = new MockAdapter(axios);

describe('API Tests', () => {
  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  describe('createMovie', () => {
    const movieData = {
      title: 'Test Movie',
      genre: 'Action',
      release_year: '2025',
      director: 'John Doe',
      duration: '120',
      description: 'A test movie description',
      main_lead: 'Jane Doe',
      streaming_platform: 'Netflix',
      rating: 4.5,
      isPremium: true,
      poster_url: 'https://example.com/poster.jpg',
      banner_url: 'https://example.com/banner.jpg',
    };

    it('should return null if token is missing', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      const result = await createMovie(movieData as any);
      expect(result).toBeNull();
    });

    it('should return null on server error', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('mocked-token');

      mock.onPost('https://movie-explorer-ror-aalekh-2ewg.onrender.com/movies/create')
        .reply(500);

      const result = await createMovie(movieData as any);
      expect(result).toBeNull();
    });
  });

  describe('GetCurrentUser', () => {
    it('should return null on error response', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('mocked-token');

      mock.onGet('https://movie-explorer-ror-aalekh-2ewg.onrender.com/users/current_user')
        .reply(500);

      const user = await GetCurrentUser();
      expect(user).toBeNull();
    });

    it('should return null if token is missing', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      const result = await GetCurrentUser();
      expect(result).toBeNull();
    });
  });


  describe('GetAllMovies', () => {

    it('should return null on error', async () => {
      mock.onGet('https://movie-explorer-ror-aalekh-2ewg.onrender.com/movies/all')
        .reply(500);

      const result = await GetAllMovies();
      expect(result).toBeNull();
    });
    it('should return null when movieData is empty', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('mocked-token');
      mock.onPost(/\/movies\/create/).reply(400);
      const result = await createMovie({} as any);
      expect(result).toBeNull();
    });
    
  });
});
