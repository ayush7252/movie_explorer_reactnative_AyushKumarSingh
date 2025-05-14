import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import GenreMovies from '../../src/Components/GenreMovies';
import { useSelector, useDispatch } from 'react-redux';
import * as AxiosRoutes from '../../src/AxiosRoutes/AxiosRoutes';
import { Alert } from 'react-native';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../../src/AxiosRoutes/AxiosRoutes', () => ({
  GetAllMovies: jest.fn(),
}));

const mockDispatch = jest.fn();

const mockMovies = [
  { id: 1, title: 'Movie 1', genre: 'Action' },
  { id: 2, title: 'Movie 2', genre: 'Drama' },
  { id: 3, title: 'Movie 3', genre: 'Action' },
  { id: 4, title: 'Movie 4', genre: 'Action' },
];

describe('GenreMovies Component', () => {
  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockImplementation(selector =>
      selector({
        movies: {
          movies: mockMovies,
        },
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders genre title correctly', () => {
    const { getByText } = render(<GenreMovies data="Action" page={2} setPage={jest.fn()} />);
    expect(getByText('Action Movies')).toBeTruthy();
  });

  it('renders all movies when genre is "All"', () => {
    const { getByTestId } = render(<GenreMovies data="All" page={2} setPage={jest.fn()} />);
    expect(getByTestId('genre-movies-list-All').props.data.length).toBe(mockMovies.length);
  });

  it('filters and renders only "Drama" movies', () => {
    const { getByTestId } = render(<GenreMovies data="Drama" page={2} setPage={jest.fn()} />);
    expect(getByTestId('genre-movies-list-Drama').props.data.length).toBe(1);
  });

  it('does not break if no genre is passed', () => {
    const { queryByTestId } = render(<GenreMovies data={null} page={2} setPage={jest.fn()} />);
    expect(queryByTestId('genre-movies-list-')).toBeNull();
  });

  it('shows "Load More" button', () => {
    const { getByText } = render(<GenreMovies data="Action" page={2} setPage={jest.fn()} />);
    expect(getByText('Load More')).toBeTruthy();
  });

  it('shows alert on API error', async () => {
    jest.spyOn(Alert, 'alert');
    (AxiosRoutes.GetAllMovies as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    const { getByText } = render(<GenreMovies data="Action" page={2} setPage={jest.fn()} />);
    fireEvent.press(getByText('Load More'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to load more movies');
    });
  });

  it('shows loading spinner when loading is true', async () => {
    let resolveFetch: () => void;
    (AxiosRoutes.GetAllMovies as jest.Mock).mockImplementation(
      () =>
        new Promise(resolve => {
          resolveFetch = () => resolve([]);
        }),
    );

    const { getByText, getByTestId, queryByText } = render(
      <GenreMovies data="Action" page={2} setPage={jest.fn()} />,
    );

    fireEvent.press(getByText('Load More'));

    await waitFor(() => {
      expect(queryByText('Load More')).toBeNull();
    });
    resolveFetch!();
  });
});
