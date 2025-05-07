import { render, screen } from '@testing-library/react-native';
import LatestMovies from '../../src/Components/LatestMovies';
import React from 'react';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

const mockMovies = [
  { id: 1, title: 'Movie 1', release_year: 2021 },
  { id: 2, title: 'Movie 2', release_year: 2020 },
  { id: 3, title: 'Movie 3', release_year: 2022 },
];

test('LatestMovies renders correctly', () => {
  jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue({ movies: mockMovies });

  render(<LatestMovies />);

  const heading = screen.getByText('Latest Release');
  expect(heading).toBeTruthy();

  mockMovies.forEach((movie) => {
    const movieCard = screen.getByText(movie.title);
    expect(movieCard).toBeTruthy();
  });
});

test('Only movies from 2020 or later are displayed', () => {
  jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue({ movies: mockMovies });

  render(<LatestMovies />);

  const movieCards = screen.getAllByTestId('movie-card');
  expect(movieCards).toHaveLength(3); 

  mockMovies.forEach((movie) => {
    if (movie.release_year < 2020) {
      expect(movieCards).not.toContainEqual(expect.objectContaining({ title: movie.title }));
    }
  });
});

test('Movies are rendered with correct styles', () => {
  jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue({ movies: mockMovies });

  render(<LatestMovies />);

  mockMovies.forEach((movie) => {
    const movieCard = screen.getByText(movie.title);

    expect(movieCard.parent).toHaveStyle({
      backgroundColor: 'rgba(255,255,255,0.1)', 
    });

    expect(movieCard.parent).toHaveStyle({
      borderRadius: 20,
    });

    expect(movieCard.parent).toHaveStyle({
      marginRight: 10,
    });
  });
});
