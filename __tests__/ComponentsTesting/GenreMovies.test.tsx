import React from 'react';
import { render, screen } from '@testing-library/react-native';
import GenreMovies from '../../src/Components/GenreMovies';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('GenreMovies Component', () => {
  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
      return selector({
        movies: {
          movies: [
            { id: 1, title: 'Movie 1', genre: 'Action' },
            { id: 2, title: 'Movie 2', genre: 'Drama' },
            { id: 3, title: 'Movie 3', genre: 'Action' },
            { id: 4, title: 'Movie 4', genre: 'Action' },
          ],
        },
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders GenreMovies component and displays the correct genre title', () => {
    render(<GenreMovies data="Action" />);
    expect(screen.getByText('Action Movies')).toBeTruthy();
  });
  test('does not render anything if no genre is passed', () => {
    render(<GenreMovies data={null} />);
    expect(screen.queryByTestId('genre-movies-list-')).toBeNull();
  });

  test('FlatList renders correctly for given genre', () => {
    render(<GenreMovies data="Drama" />);
    expect(screen.getByTestId('genre-movies-list-Drama')).toBeTruthy();
  });
  
  test('shows "Load More" button', () => {
    render(<GenreMovies data="Action" />);
    expect(screen.getByText('Load More')).toBeTruthy();
  });
  
});
