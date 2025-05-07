import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import MovieCard from '../../src/Components/MovieCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('MovieCard', () => {
  const mockData = {
    _id: '123',
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
    (AsyncStorage.getItem as jest.Mock).mockClear();
  });

  it('renders the MainContainer when admin and modal is open', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('supervisor');

    const { getByTestId, findByTestId } = render(<MovieCard data={mockData} />);
    await act(async () => {
        const toggleButton = getByTestId('movie-card-toggle');
        fireEvent.press(toggleButton);
      });
    const mainContainer = await findByTestId('MainContainer');
    expect(mainContainer).toBeTruthy();
  });
  it('Checks if image exist or not', ()=>{
    const {getByTestId} = render(<MovieCard data={mockData} />)
    expect(getByTestId('SubContainer')).toBeTruthy();
  });
  it('Checks if image exist or not', ()=>{
    const {getByTestId} = render(<MovieCard data={mockData} />)
    expect(getByTestId('PosterImage')).toBeTruthy();
  });
  it('Checks for card content ', ()=>{
    const {getByTestId} = render(<MovieCard data={mockData} />)
    expect(getByTestId('CardContent')).toBeTruthy();
  });
  it('Checks for Movie title ', ()=>{
    const {getByTestId} = render(<MovieCard data={mockData} />)
    expect(getByTestId('MovieTitle')).toBeTruthy();
  });
  it('Checks for Movie release year ', ()=>{
    const {getByTestId} = render(<MovieCard data={mockData} />)
    expect(getByTestId('MovieReleaseYear')).toBeTruthy();
  });
//   it('Checks for Modal', ()=>{
//     const {getByTestId} = render(<MovieCard data={mockData} />)
//     expect(getByTestId('ModalMainContainer')).toBeTruthy();
//   });

test('renders modal with movie details for non-admin user when selected is true', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('user');
    const { getByTestId, findByText } = render(<MovieCard data={mockData} />);
  
    fireEvent.press(getByTestId('movie-card-toggle'));
    const modalContainer = await waitFor(() => getByTestId('ModalMainContainer'));
    expect(modalContainer).toBeTruthy();
    expect(await findByText('Test Movie')).toBeTruthy();
    expect(await findByText('( 2023 )')).toBeTruthy();
    expect(await findByText('A test movie description')).toBeTruthy();
  });

  test('renders editable form in modal for admin user', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('supervisor');
    const { getByTestId, findByPlaceholderText } = render(<MovieCard data={mockData} />);
    fireEvent.press(getByTestId('movie-card-toggle'));
    const modalContainer = await waitFor(() => getByTestId('ModalMainContainer'));
    expect(modalContainer).toBeTruthy();
    expect(await findByPlaceholderText('Title')).toHaveProp('value', 'Test Movie');
    expect(await findByPlaceholderText('Genre')).toHaveProp('value', 'Action');
    expect(await findByPlaceholderText('Year')).toHaveProp('value', '2023');
    expect(await findByPlaceholderText('Rating')).toHaveProp('value', '8.5');
  });

  test('closes modal when close button is pressed', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('user'); 
    const { getByTestId, queryByTestId } = render(<MovieCard data={mockData} />);
    fireEvent.press(getByTestId('movie-card-toggle'));
    await waitFor(() => expect(getByTestId('ModalMainContainer')).toBeTruthy());
    const closeButton = getByTestId('modal-close-button');
    fireEvent.press(closeButton);
    await waitFor(() => expect(queryByTestId('ModalMainContainer')).toBeNull());
  });
});