import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../../src/Screens/HomeScreen';
jest.mock('../../src/Components/Header', () => () => <></>);
jest.mock('../../src/Components/Carousel', () => () => <></>);
jest.mock('../../src/Components/LatestMovies', () => () => <></>);
jest.mock('../../src/Components/ActionMovies', () => () => <></>);
jest.mock('../../src/Components/ComedyMovies', () => () => <></>);

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('home-container')).toBeTruthy();
  });

  it('renders ScrollView and child components', () => {
    const { UNSAFE_queryByType } = render(<HomeScreen />);
    const ScrollView = UNSAFE_queryByType(require('react-native').ScrollView);
    expect(ScrollView).toBeTruthy();
  });
});
