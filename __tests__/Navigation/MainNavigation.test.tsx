import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from '../../src/navigation/MainNavigation';

describe('Navigation', () => {
  const renderWithProviders = () =>
    render(
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>

    );

  it('should render SplashScreen as the initial screen', async () => {
    const { getByTestId } = renderWithProviders();
    await waitFor(() => {
      expect(getByTestId('splash-screen')).toBeTruthy();
    });
  });

  it('should render the LoginPage when navigating to Auth', async () => {
    const { getByTestId } = renderWithProviders();
    const loginButton = getByTestId('Auth');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByTestId('login-page')).toBeTruthy();
    });
  });

  it('should render HomePage when navigating to HomePage', async () => {
    const { getByTestId } = renderWithProviders();
    const homeButton = getByTestId('to-home-button');
    fireEvent.press(homeButton);

    await waitFor(() => {
      expect(getByTestId('home-page')).toBeTruthy();
    });
  });

  it('should render Footer component on HomePage', async () => {
    const { getByTestId } = renderWithProviders();
    const homeButton = getByTestId('to-home-button');
    fireEvent.press(homeButton);

    await waitFor(() => {
      expect(getByTestId('footer')).toBeTruthy();
    });
  });

  it('should render PaymentPage when navigating to PaymentPage', async () => {
    const { getByTestId } = renderWithProviders();
    const paymentButton = getByTestId('to-payment-button');
    fireEvent.press(paymentButton);

    await waitFor(() => {
      expect(getByTestId('payment-page')).toBeTruthy();
    });
  });
});
