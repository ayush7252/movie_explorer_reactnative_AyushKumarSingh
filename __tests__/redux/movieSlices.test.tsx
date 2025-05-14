import reducer, { setMovies, setLoading, setError } from '../../src/redux/slices/movieSlice';

describe('movieSlice reducer', () => {
  const initialState = {
    movies: [],
    loading: false,
    error: null,
  };

  it('should return the initial state when passed an empty action', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle setMovies', () => {
    const mockMovies = [{ id: 1, title: 'Inception' }];
    const result = reducer(initialState, setMovies(mockMovies));
    expect(result.movies).toEqual(mockMovies);
  });

  it('should handle setLoading', () => {
    const result = reducer(initialState, setLoading(true));
    expect(result.loading).toBe(true);
  });

  it('should handle setError', () => {
    const errorMsg = 'Failed to fetch movies';
    const result = reducer(initialState, setError(errorMsg));
    expect(result.error).toBe(errorMsg);
  });

  it('should not change state for unknown action type', () => {
    const result = reducer(initialState, { type: 'unknown/action' });
    expect(result).toEqual(initialState);
  });
});