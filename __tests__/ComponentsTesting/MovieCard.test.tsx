import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import MovieCard from '../../src/Components/MovieCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('MovieCard', () => {
  const mockData = {
    id: '123',
    title: 'Test Movie',
    genre: 'Action',
    release_year: '2023',
    rating: '8.5',
    director: 'John Doe',
    description: 'A test movie description',
    duration: '120 min',
    premium: false,
    main_lead: 'Jane Doe',
    streaming_platform: 'Netflix',
    poster_url: 'https://example.com/poster.jpg',
    banner_url: 'https://example.com/banner.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders movie card with poster, title, year and genre', () => {
    const { getByTestId, getByText } = render(<MovieCard data={mockData} />);

    expect(getByTestId('MovieCardContainer')).toBeTruthy();
    expect(getByTestId('PosterImage')).toBeTruthy();
    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByText('2023')).toBeTruthy();
    expect(getByText('Action')).toBeTruthy();
  });

  it('opens modal on card press and shows non-admin movie info', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('user');
    const { getByTestId, findByTestId } = render(<MovieCard data={mockData} />);

    await act(async () => {
      fireEvent.press(getByTestId('MovieCardContainer'));
    });

    expect(await findByTestId('ModalMainContainer')).toBeTruthy();
  });

  it('opens modal and shows editable fields for admin', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('supervisor');
    const { getByTestId, findByTestId } = render(<MovieCard data={mockData} />);

    fireEvent.press(getByTestId('MovieCardContainer'));

    expect(await findByTestId('ModalMainContainer')).toBeTruthy();
    expect(await findByTestId('TitleInput')).toBeTruthy();
    expect(await findByTestId('GenreInput')).toBeTruthy();
    expect(await findByTestId('YearInput')).toBeTruthy();
    expect(await findByTestId('RatingInput')).toBeTruthy();
  });

  it('closes modal when close button is pressed', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('user');
    const { getByTestId, queryByTestId } = render(<MovieCard data={mockData} />);
    fireEvent.press(getByTestId('MovieCardContainer'));
    await waitFor(() => expect(getByTestId('ModalMainContainer')).toBeTruthy());
    fireEvent.press(getByTestId('modal-close-button'));
    await waitFor(() => expect(queryByTestId('ModalMainContainer')).toBeNull());
  });
  
});
