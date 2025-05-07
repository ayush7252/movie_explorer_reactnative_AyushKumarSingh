import { render, screen } from '@testing-library/react-native';
import HorizontalSlider from '../../src/Components/HorizontalSlider';
import React from 'react';

test('HorizontalSlider renders correctly', () => {
  render(<HorizontalSlider />);

  const scrollView = screen.getByTestId('category-scroll');
  expect(scrollView).toBeTruthy();

  const mockCategories = [
    { id: 1, title: 'Action' },
    { id: 2, title: 'Comedy' },
    { id: 3, title: 'Drama' },
    { id: 4, title: 'Horror' },
  ];

  mockCategories.forEach((category) => {
    const categoryCard = screen.getByText(category.title);
    expect(categoryCard).toBeTruthy();
  });

  mockCategories.forEach((category) => {
    const touchable = screen.getByText(category.title).parent;
    expect(touchable).toBeTruthy();
  });
});

test('Categories are rendered with correct styles', () => {
  render(<HorizontalSlider />);

  const mockCategories = [
    { id: 1, title: 'Action' },
    { id: 2, title: 'Comedy' },
    { id: 3, title: 'Drama' },
    { id: 4, title: 'Horror' },
  ];

  mockCategories.forEach((category) => {
    const categoryCard = screen.getByText(category.title);

    expect(categoryCard.parent).toHaveStyle({
      backgroundColor: 'rgba(255,255,255,0.1)',
    });

    expect(categoryCard.parent).toHaveStyle({
      borderRadius: 20,
    });

    expect(categoryCard.parent).toHaveStyle({
      marginRight: 10,
    });
  });
});
