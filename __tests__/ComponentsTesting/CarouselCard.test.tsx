import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CarouselCard from '../../src/Components/CarouselCard'; 

describe('CarouselCard Component', () => {
  const mockItem = {
    id: '1',
    title: 'Test Movie',
    genre: 'Action',
    release_year: '2023',
    rating: '4.5',
    duration: '2',
    director: 'John Doe',
    description: 'A thrilling action movie.',
    poster_url: 'https://example.com/poster.jpg'
  };

  it('renders correctly', () => {
    const { getByTestId } = render(<CarouselCard item={mockItem} testID="carousel-card" />);

    expect(getByTestId('carousel-card')).toBeTruthy();
    expect(getByTestId(`movie-title-${mockItem.id}`)).toHaveTextContent('Test Movie');
    expect(getByTestId(`movie-genre-${mockItem.id}`)).toHaveTextContent('Action');
  });

  it('opens the modal when the icon is pressed', () => {
    const { getByTestId, queryByTestId } = render(<CarouselCard item={mockItem} testID="carousel-card" />);

    fireEvent.press(getByTestId(`toggle-modal-${mockItem.id}`));
    expect(queryByTestId(`modal-${mockItem.id}`)).toBeTruthy();
  });

  it('closes the modal when the close button is pressed', () => {
    const { getByTestId, queryByTestId } = render(<CarouselCard item={mockItem} testID="carousel-card" />);

    fireEvent.press(getByTestId(`toggle-modal-${mockItem.id}`)); 
    fireEvent.press(getByTestId(`close-modal-${mockItem.id}`)); 

    expect(queryByTestId(`modal-${mockItem.id}`)).toBeNull();
  });
});
