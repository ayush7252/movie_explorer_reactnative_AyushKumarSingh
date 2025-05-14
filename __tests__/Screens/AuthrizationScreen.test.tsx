import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import AuthrizationScreen from '../../src/screens/AuthrizationScreen';
import { Alert, ToastAndroid } from 'react-native';

// Mocks
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('@react-native-firebase/messaging', () => () => ({
  getToken: jest.fn(() => Promise.resolve('dummy-fcm-token')),
}));

jest.mock('../../src/AxiosRoutes/AxiosRoutes', () => ({
  LoginRequest: jest.fn(),
  signUpRequest: jest.fn(),
  sendTokenToBackend: jest.fn(),
  GetCurrentUser: jest.fn(),
  getSubscriptionStatus: jest.fn(() => Promise.resolve({ plan_type: 'premium' })),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
  }),
}));

// Mock Alert and Toast
jest.spyOn(Alert, 'alert');
jest.spyOn(ToastAndroid, 'show');

import { TextMatch, TextMatchOptions } from '@testing-library/react-native/build/matches';
import { CommonQueryOptions } from '@testing-library/react-native/build/queries/options';
import { ReactTestInstance } from 'react-test-renderer';

describe('AuthrizationScreen - full test suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const fillLoginFields = (getByPlaceholderText: { (predicate: TextMatch, options?: (CommonQueryOptions & TextMatchOptions) | undefined): ReactTestInstance; (predicate: TextMatch, options?: (CommonQueryOptions & TextMatchOptions) | undefined): ReactTestInstance; (arg0: string): ReactTestInstance; }) => {
    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');
  };

  const fillSignupFields = (getByPlaceholderText: { (predicate: TextMatch, options?: (CommonQueryOptions & TextMatchOptions) | undefined): ReactTestInstance; (predicate: TextMatch, options?: (CommonQueryOptions & TextMatchOptions) | undefined): ReactTestInstance; (predicate: TextMatch, options?: (CommonQueryOptions & TextMatchOptions) | undefined): ReactTestInstance; (arg0: string): ReactTestInstance; }) => {
    fireEvent.changeText(getByPlaceholderText('Enter your name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm your password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Enter your Phone No.'), '1234567890');
  };

  test('renders login screen initially with email & password fields', () => {
    const { getByPlaceholderText } = render(<AuthrizationScreen navigation={undefined} />);
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
  });

  test('switches to Sign Up tab and renders fields', () => {
    const { getByText, getByPlaceholderText } = render(<AuthrizationScreen navigation={undefined} />);
    fireEvent.press(getByText('Sign Up'));
    expect(getByPlaceholderText('Enter your name')).toBeTruthy();
    expect(getByPlaceholderText('Enter your Phone No.')).toBeTruthy();
    expect(getByPlaceholderText('Confirm your password')).toBeTruthy();
  });

  test('toggles password visibility', () => {
    const { getByTestId, getByPlaceholderText } = render(<AuthrizationScreen navigation={undefined} />);
    const passwordInput = getByPlaceholderText('Enter your password');
    const eyeIcon = getByTestId('eye-icon');

    expect(passwordInput.props.secureTextEntry).toBe(true);
    fireEvent.press(eyeIcon);
    expect(passwordInput.props.secureTextEntry).toBe(false);
  });

  
});
