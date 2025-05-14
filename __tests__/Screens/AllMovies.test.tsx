import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AllMovies from '../../src/Screens/AllMovies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetAllMovies } from '../../src/AxiosRoutes/AxiosRoutes';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { setMovies } from '../../src/redux/slices/movieSlice';
import { Alert } from 'react-native';

// Mock dependencies
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));
jest.mock('../../src/AxiosRoutes/AxiosRoutes', () => ({
  GetAllMovies: jest.fn(),
}));
jest.mock('../../src/Components/GenreMovies', () => () => <></>);
jest.mock('../../src/Components/AddMovies', () => () => <></>);

// Mock Redux store
const mockStore = configureStore([]);
const initialState = { movies: [] };
const store = mockStore(initialState);

describe('AllMovies Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockClear();
    (GetAllMovies as jest.Mock).mockClear();
    store.clearActions();
  });

  it('renders correctly with default genre "All"', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('user');
    const { getByText } = render(
      <Provider store={store}>
        <AllMovies />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText('All Movies')).toBeTruthy();
      expect(getByText('All')).toBeTruthy();
      expect(getByText('Si-Fi')).toBeTruthy();
      expect(getByText('Action')).toBeTruthy();
    });
  });

  it('does not display admin-specific elements for non-supervisor users', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('user');
    const { queryByTestId, queryByText } = render(
      <Provider store={store}>
        <AllMovies />
      </Provider>
    );

    await waitFor(() => {
      expect(queryByTestId('refresh-button')).toBeNull();
      expect(queryByText('AddMovies')).toBeNull();
    });
  });

  it('calls handleReload and dispatches setMovies action on refresh button press', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('supervisor');
    const mockMovies = [{ id: 1, title: 'Movie 1' }];
    (GetAllMovies as jest.Mock).mockResolvedValue(mockMovies);
    jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(
      <Provider store={store}>
        <AllMovies />
      </Provider>
    );

    await waitFor(() => {
      const refreshButton = getByTestId('refresh-button');
      fireEvent.press(refreshButton);
    });

    await waitFor(() => {
      expect(GetAllMovies).toHaveBeenCalledWith(1, 10);
      expect(store.getActions()).toContainEqual(setMovies(mockMovies));
      expect(Alert.alert).toHaveBeenCalledWith('Data updated successfully');
    });
  });

  it('shows error alert when handleReload fails', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('supervisor');
    (GetAllMovies as jest.Mock).mockRejectedValue(new Error('Network error'));
    jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(
      <Provider store={store}>
        <AllMovies />
      </Provider>
    );

    await waitFor(() => {
      const refreshButton = getByTestId('refresh-button');
      fireEvent.press(refreshButton);
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Failed to update data');
    });
  });

  it('fetches user role on mount and sets isAdmin state correctly', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('supervisor');
    const { getByTestId } = render(
      <Provider store={store}>
        <AllMovies />
      </Provider>
    );

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('userRole');
      expect(getByTestId('refresh-button')).toBeTruthy();
    });
  });
});