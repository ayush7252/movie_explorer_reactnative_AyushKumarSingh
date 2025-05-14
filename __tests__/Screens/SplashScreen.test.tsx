import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import SplashScreen from '../../src/screens/SplashScreen';
import {GetAllMovies, getSubscriptionStatus} from '../../src/AxiosRoutes/AxiosRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

// Mocks
jest.mock('../../src/AxiosRoutes/AxiosRoutes', () => ({
  GetAllMovies: jest.fn(),
  getSubscriptionStatus: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('SplashScreen', () => {
  const mockNavigation = { replace: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders splash screen elements', () => {
    const {getByText, getByTestId} = render(<SplashScreen navigation={mockNavigation} />);
    expect(getByText('Welcome to Movie Explorer')).toBeTruthy();
  });

  it('navigates to "Footer" if userRole exists', async () => {
    (GetAllMovies as jest.Mock).mockResolvedValue([]);
    (getSubscriptionStatus as jest.Mock).mockResolvedValue({ plan_type: 'premium' });
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('admin');

    render(<SplashScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(GetAllMovies).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalled();
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('SubscriptionStatus', 'premium');
      expect(mockNavigation.replace).toHaveBeenCalledWith('Footer');
    });
  });

  it('navigates to "Home" if no userRole', async () => {
    (GetAllMovies as jest.Mock).mockResolvedValue([]);
    (getSubscriptionStatus as jest.Mock).mockResolvedValue({ plan_type: 'free' });
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    render(<SplashScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(mockNavigation.replace).toHaveBeenCalledWith('Home');
    });
  });

  it('navigates to "Auth" on fetch error', async () => {
    (GetAllMovies as jest.Mock).mockRejectedValue(new Error('API failed'));
    (getSubscriptionStatus as jest.Mock).mockRejectedValue(new Error('No status'));

    render(<SplashScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(mockNavigation.replace).toHaveBeenCalledWith('Auth');
    });
  });

  it('stores subscription status correctly', async () => {
    (GetAllMovies as jest.Mock).mockResolvedValue([]);
    (getSubscriptionStatus as jest.Mock).mockResolvedValue({ plan_type: 'free' });
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('user');

    render(<SplashScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('SubscriptionStatus', 'free');
    });
  });
});
