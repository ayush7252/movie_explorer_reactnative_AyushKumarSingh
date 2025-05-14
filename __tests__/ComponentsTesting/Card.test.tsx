import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Card from '../../src/Components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Sample movie data
const movieData = {
  title: 'Test Movie',
  release_year: 2023,
  genre: 'Action',
  poster_url: 'https://via.placeholder.com/150',
  rating: 8.5,
  duration: 2.5,
  streaming_platform: 'Netflix',
  director: 'John Doe',
  description: 'A thrilling test movie.',
};

describe('Card Component', () => {
  beforeEach(() => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('user');
  });

  it('renders movie title, year, and genre', () => {
    const { getByTestId } = render(<Card item={movieData} />);
    expect(getByTestId('title').props.children[0]).toBe('Test Movie');
    expect(getByTestId('release_year').props.children[1]).toBe('2023');
    expect(getByTestId('genre').props.children).toBe('Action');
  });

  it('opens modal when details button is pressed by a guest user', async () => {
    const { getByTestId, queryByTestId } = render(<Card item={movieData} />);

    const detailsButton = getByTestId('details_button');
    fireEvent.press(detailsButton);

    await waitFor(() => {
      expect(queryByTestId('modal_title')).toBeTruthy();
      expect(getByTestId('modal_title').props.children).toBe('Movie Details');
    });
  });

  it('displays movie description inside modal', async () => {
    const { getByTestId } = render(<Card item={movieData} />);

    const detailsButton = getByTestId('details_button');
    fireEvent.press(detailsButton);

    await waitFor(() => {
      const description = getByTestId('modal_description');
      expect(description).toBeTruthy();
      expect(description.props.children).toBe('A thrilling test movie.');
    });
  });

  it('closes the modal when close button is pressed', async () => {
    const { getByTestId, queryByTestId } = render(<Card item={movieData} />);

    const detailsButton = getByTestId('details_button');
    fireEvent.press(detailsButton);

    await waitFor(() => {
      expect(getByTestId('modal_title')).toBeTruthy();
    });

    const closeButton = getByTestId('modal_close_button');
    fireEvent.press(closeButton);

    await waitFor(() => {
      expect(queryByTestId('modal_title')).toBeNull();
    });
  });
});
