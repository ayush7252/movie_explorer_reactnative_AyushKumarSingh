import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import Header from '../../src/Components/Header';
import React from 'react';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({
    movies: []
  }),
  useDispatch: jest.fn().mockReturnValue(() => {}),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  removeItem: jest.fn().mockResolvedValue(true),
  getItem: jest.fn().mockResolvedValue('user'),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    replace: jest.fn(),
  }),
}));

test('Logout functionality works correctly', async () => {
  render(<Header />);

  const logoutIcon = screen.getByTestId('login-icon');
  fireEvent.press(logoutIcon);

  await waitFor(() => {
    expect(require('@react-native-async-storage/async-storage').removeItem).toHaveBeenCalledWith('userEmail');
    expect(require('@react-native-async-storage/async-storage').removeItem).toHaveBeenCalledWith('userRole');
    expect(require('@react-native-async-storage/async-storage').removeItem).toHaveBeenCalledWith('userToken');
  });

  const { replace } = require('@react-navigation/native').useNavigation();
  expect(replace).toHaveBeenCalledWith('Auth');
});

test('Search modal visibility toggles correctly', async () => {
  render(<Header />);

  const searchIcon = screen.getByTestId('search-icon');
  fireEvent.press(searchIcon);

  await waitFor(() => {
    expect(screen.getByTestId('search-modal')).toBeTruthy();
  });

  const backButton = screen.getByTestId('back-button');
  fireEvent.press(backButton);

  await waitFor(() => {
    expect(screen.queryByTestId('search-modal')).toBeNull();
  });
});

test('Search input text updates correctly', async () => {
  render(<Header />);

  const searchIcon = screen.getByTestId('search-icon');
  fireEvent.press(searchIcon);

  const searchInput = screen.getByTestId('search-input');
  fireEvent.changeText(searchInput, 'New Movie');

  await waitFor(() => {
    expect(searchInput.props.value).toBe('New Movie');
  });
});

test('Logout icon switches based on guest status', async () => {
  jest.mock('@react-native-async-storage/async-storage', () => ({
    removeItem: jest.fn().mockResolvedValue(true),
    getItem: jest.fn().mockResolvedValue('user'),
  }));

  render(<Header />);

  const logoutIcon = screen.getByTestId('logout-icon');
  expect(logoutIcon).toBeTruthy();

  fireEvent.press(logoutIcon);
  
  await waitFor(() => {
    expect(require('@react-native-async-storage/async-storage').removeItem).toHaveBeenCalledWith('userEmail');
    expect(require('@react-native-async-storage/async-storage').removeItem).toHaveBeenCalledWith('userRole');
    expect(require('@react-native-async-storage/async-storage').removeItem).toHaveBeenCalledWith('userToken');
  });

  const { replace } = require('@react-navigation/native').useNavigation();
  expect(replace).toHaveBeenCalledWith('Auth');
});
