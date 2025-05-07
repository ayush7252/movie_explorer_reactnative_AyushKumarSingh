import React, { useState } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Card from '../../src/Components/Card'; // adjust the path of your Card component

// Mock data for the movie card
const movieData = {
  title: 'Test Movie',
  release_year: 2023,
  genre: 'Action',
  poster_url: 'https://via.placeholder.com/150',
  rating: 8.5,
  duration: 2.5,
  streaming_platform: 'Netflix',
  director: 'John Doe',
  description: 'A thrilling test movie.',
};

describe('Card Component', () => {
  it('shows modal with movie details when details button is pressed', async () => {
    const { getByTestId } = render(<Card item={movieData} />);

    // Find the details button and simulate a press
    const detailsButton = getByTestId('details_button');
    fireEvent.press(detailsButton);

    // Wait for modal to appear by checking for the modal's testID
    const modal = await waitFor(() => getByTestId('ModalContainer'));

    // Check if the modal is displayed
    expect(modal).toBeTruthy();

    // Optionally, check if the movie title is correctly displayed in the modal
    const modalTitle = getByTestId('modal_title');
    expect(modalTitle).toHaveTextContent('Test Movie');
  });

  it('renders movie title and genre correctly', () => {
    const { getByTestId } = render(<Card item={movieData} />);

    // Check if the movie title is rendered correctly
    const title = getByTestId('title');
    expect(title).toHaveTextContent('Test Movie');

    // Check if the genre is rendered correctly
    const genre = getByTestId('genre');
    expect(genre).toHaveTextContent('Action');
  });
});
