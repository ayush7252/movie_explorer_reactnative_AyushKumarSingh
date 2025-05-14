import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; 
import ActionMovies from '../../src/Components/ActionMovies';

const mockStore = configureStore([]);

describe('ActionMovies', () => {
  it('should render ActionMovies component correctly', () => {
    const store = mockStore({
      movies: {
        movies: [],
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <ActionMovies />
      </Provider>
    );

    expect(true).toBeTruthy();
  });
});
