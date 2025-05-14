import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProfileScreen from '../../src/screens/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AxiosRoutes from '../../src/AxiosRoutes/AxiosRoutes';

// Mock image asset
jest.mock('react-native/Libraries/Image/Image', () => 'Image');

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn((key) => {
      switch (key) {
        case 'currentUser':
          return Promise.resolve(
            JSON.stringify({
              email: 'test@example.com',
              name: 'Test User',
              role: 'user',
            })
          );
        case 'SubscriptionStatus':
          return Promise.resolve('Premium');
        case 'userToken':
          return Promise.resolve('fakeToken');
        default:
          return Promise.resolve(null);
      }
    }),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}));

// Mock Linking
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

// Mock ToastAndroid
jest.mock('react-native/Libraries/Components/ToastAndroid/ToastAndroid', () => ({
  show: jest.fn(),
}));

describe('ProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(AxiosRoutes, 'toggleNotifications').mockResolvedValue(200);
  });

  it('renders profile data from AsyncStorage', async () => {
    const { getByText } = render(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText('Test User')).toBeTruthy();
      expect(getByText('test@example.com')).toBeTruthy();
      expect(getByText('user')).toBeTruthy();
      expect(getByText('Premium')).toBeTruthy();
    });
  });
});
