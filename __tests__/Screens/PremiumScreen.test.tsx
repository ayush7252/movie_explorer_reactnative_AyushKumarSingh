import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import PremiumScreen from '../../src/screens/PremiumScreen'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSubscription} from '../../src/AxiosRoutes/AxiosRoutes';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn<Promise<string | null>, [string]>(),
}));
jest.mock('../../src/AxiosRoutes/AxiosRoutes', () => ({
  createSubscription: jest.fn() as jest.Mock,
}));
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

const renderWithNav = () => {
  return render(
    <NavigationContainer>
      <PremiumScreen />
    </NavigationContainer>,
  );
};

describe('PremiumScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('shows toast if already a premium member', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('premium');
    const {getByText} = renderWithNav();

    const buyNow = getByText('Buy Now');
    fireEvent.press(buyNow);

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('SubscriptionStatus');
    });
  });

  it('shows toast when no plan is selected', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    const {getByText} = renderWithNav();

    fireEvent.press(getByText('Buy Now'));

    await waitFor(() => {
      expect(createSubscription).not.toHaveBeenCalled();
    });
  });

});
