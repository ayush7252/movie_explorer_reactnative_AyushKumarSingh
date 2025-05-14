import { store } from '../../src/redux/store';

describe('Redux Store', () => {
  it('should have the movieReducer under "movies" in the store', () => {
    const state = store.getState();
    expect(state.movies).toBeDefined();
  });
});
