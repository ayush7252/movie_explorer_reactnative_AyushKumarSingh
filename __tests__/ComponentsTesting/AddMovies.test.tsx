import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import AddMovies from '../../src/Components/AddMovies';
import * as AxiosRoutes from '../../src/AxiosRoutes/AxiosRoutes';


jest.spyOn(AxiosRoutes, 'createMovie').mockImplementation(jest.fn());

describe('AddMovies Component', () => {
  it('should render main component', () => {
    const { getByTestId } = render(<AddMovies />);
    expect(getByTestId('MainContainer')).toBeTruthy();
  });

  it('should open modal on add button click', async () => {
    const { getByTestId } = render(<AddMovies />);
    fireEvent.press(getByTestId('addButton'));
    await waitFor(() => {
      expect(getByTestId('addMovieModal')).toBeTruthy();
      expect(getByTestId('ModalContainer')).toBeTruthy();
    });
  });

  it('should close modal on cross button press', async () => {
    const { getByTestId, queryByTestId } = render(<AddMovies />);
    fireEvent.press(getByTestId('addButton'));
    await waitFor(() => expect(getByTestId('addMovieModal')).toBeTruthy());

    fireEvent.press(getByTestId('closeButton'));
    await waitFor(() => expect(queryByTestId('addMovieModal')).toBeNull());
  });
});
