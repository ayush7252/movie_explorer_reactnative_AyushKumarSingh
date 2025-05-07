import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import AddMovies from '../../src/Components/AddMovies';

describe('AddMovie Component', () => {

  it('should render main Component', () => {
    const { getByTestId } = render(<AddMovies />);
    expect(getByTestId('MainContainer')).toBeTruthy();
  });

  it('should render Add Movies modal when add button is clicked', async () => {
    const { getByTestId } = render(<AddMovies />);
    fireEvent.press(getByTestId('addButton'));
    await waitFor(() => expect(getByTestId('addMovieModal')).toBeTruthy());
  });

  it('should update form fields correctly', () => {
    const { getByTestId } = render(<AddMovies />);
    fireEvent.press(getByTestId('addButton'));
    fireEvent.changeText(getByTestId('titleInput'), 'Test Movie');
    fireEvent.changeText(getByTestId('genreInput'), 'Action');
    fireEvent.changeText(getByTestId('releaseYearInput'), '2025');
    fireEvent.changeText(getByTestId('ratingInput'), '8.5');
    fireEvent.changeText(getByTestId('directorInput'), 'John Doe');
    fireEvent.changeText(getByTestId('descriptionInput'), 'A thrilling action movie');
    fireEvent.changeText(getByTestId('durationInput'), '120');
    fireEvent.changeText(getByTestId('isPremiumInput'), 'true');
    fireEvent.changeText(getByTestId('mainLeadInput'), 'Jane Doe');
    fireEvent.changeText(getByTestId('streamingPlatformInput'), 'Netflix');
    fireEvent.changeText(getByTestId('posterInput'), 'poster_url');
    fireEvent.changeText(getByTestId('bannerInput'), 'banner_url');
    expect(getByTestId('titleInput').props.value).toBe('Test Movie');
    expect(getByTestId('genreInput').props.value).toBe('Action');
    expect(getByTestId('releaseYearInput').props.value).toBe('2025');
  });

  test('should save the movie and close modal when save button is clicked', async () => {
    const { getByTestId } = render(<AddMovies />);
    fireEvent.press(getByTestId('addButton'));
    fireEvent.changeText(getByTestId('titleInput'), 'Test Movie');
    fireEvent.changeText(getByTestId('genreInput'), 'Action');
    fireEvent.changeText(getByTestId('releaseYearInput'), '2025');
    fireEvent.changeText(getByTestId('ratingInput'), '5');
  
    fireEvent.press(getByTestId('saveButton'));
  });
  test('Is Modal Container exist', async () => {
    const { getByTestId } = render(<AddMovies />);
    fireEvent.press(getByTestId('addButton'));
    await waitFor(() => expect(getByTestId('ModalContainer')).toBeTruthy());
  });
});
