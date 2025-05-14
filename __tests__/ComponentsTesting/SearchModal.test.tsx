import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SearchModal from '../../src/Components/SearchModal';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const mockStore = createStore((state = { movies: [] }) => state);

describe('SearchModal Component', () => {
  it('should render correctly when no search query is provided', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <SearchModal data={''} />
      </Provider>
    );

    expect(getByText('Enter movie title to search')).toBeTruthy();
  });


  it('should not display movie cards if the search input is empty', async () => {
    const { queryAllByTestId } = render(
      <Provider store={mockStore}>
        <SearchModal data={''} />
      </Provider>
    );

    const movieCards = queryAllByTestId('MovieCardContainer');
    expect(movieCards).toHaveLength(0);
  });

  it('should render the search modal with the correct text when no search is provided', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <SearchModal data={''} />
      </Provider>
    );
    expect(getByText('Enter movie title to search')).toBeTruthy();
  });

});
