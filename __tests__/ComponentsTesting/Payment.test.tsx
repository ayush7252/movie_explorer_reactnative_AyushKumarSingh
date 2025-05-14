import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Payment from '../../src/Components/Payment'; 
import Toast from 'react-native-toast-message';

const mockReplace = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    dispatch: jest.fn(),
    replace: mockReplace,
    navigate: jest.fn(),
  }),
}));
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

describe('Payment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the WebView with the correct URL', () => {
    const { getByTestId } = render(<Payment />);
    const webview = getByTestId('payment-webview');
    expect(webview.props.source.uri).toContain('payment');
  });

  it('navigates to Splash and shows success toast on success URL', async () => {
    const { getByTestId } = render(<Payment />);
    const webview = getByTestId('payment-webview');

    fireEvent(webview, 'NavigationStateChange', {
      url: 'https://example.com/payment/success',
    });

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('Splash');
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: 'Payment Successful',
      });
    });
  });

  it('navigates to Footer and shows error toast on failure URL', async () => {
    const { getByTestId } = render(<Payment />);
    const webview = getByTestId('payment-webview');

    fireEvent(webview, 'NavigationStateChange', {
      url: 'https://example.com/payment/failure',
    });

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('Footer');
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Payment Failed',
      });
    });
  });

  it('does nothing on irrelevant URL', () => {
    const { getByTestId } = render(<Payment />);
    const webview = getByTestId('payment-webview');

    fireEvent(webview, 'NavigationStateChange', {
      url: 'https://example.com/payment/pending',
    });
    expect(mockReplace).not.toHaveBeenCalled();
    expect(Toast.show).not.toHaveBeenCalled();
  });
});
