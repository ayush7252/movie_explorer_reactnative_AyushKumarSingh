import React from 'react';
import { render } from '@testing-library/react-native';
import Carousel from '../../src/Components/Carousel';
import { useSelector } from 'react-redux';
jest.mock('../../src/Components/CarouselCard', () => {
  const React = require('react');
  const { Text, View } = require('react-native');

  return ({ item }: { item: { title: string; id: number } }) => (
    <View testID={`carousel-card-${item.id}`}>
      <Text>{item.title}</Text>
    </View>
  );
});

// Mock useSelector
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Carousel Component', () => {
  const mockMovies = [
    { id: 1, title: 'High Rated 1', rating: 8.1 },
    { id: 2, title: 'High Rated 2', rating: 9.0 },
    { id: 3, title: 'Low Rated', rating: 6.5 }, // should be filtered out
  ];

  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockReturnValue({ movies: mockMovies });
  });

  it('renders the heading "Trending Movies"', () => {
    const { getByText, getByTestId } = render(<Carousel />);
    expect(getByText('Trending Movies')).toBeTruthy();
    expect(getByTestId('carousel-title').props.children).toBe('Trending Movies');
  });

  it('renders the FlatList container', () => {
    const { getByTestId } = render(<Carousel />);
    expect(getByTestId('carousel-flatlist')).toBeTruthy();
  });

  it('renders only movies with rating >= 8', () => {
    const { getByTestId, queryByTestId } = render(<Carousel />);
    expect(getByTestId('carousel-card-1')).toBeTruthy();
    expect(getByTestId('carousel-card-2')).toBeTruthy();
    expect(queryByTestId('carousel-card-3')).toBeNull(); // filtered out
  });

  it('does not render any card for empty movies', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({ movies: [] });
    const { queryByTestId } = render(<Carousel />);
    expect(queryByTestId('carousel-card-1')).toBeNull();
  });
});
