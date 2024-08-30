import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {FavoriteCitiesList} from './FavoriteCitiesList';

describe('FavoriteCitiesList', () => {
  const mockDelete = jest.fn();
  const mockCityPress = jest.fn();
  const favoriteCities = ['New York', 'Los Angeles', 'Chicago'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the list of favorite cities', () => {
    const {getByText} = render(
      <FavoriteCitiesList
        favoriteCities={favoriteCities}
        onDelete={mockDelete}
        onFavoriteCityPress={mockCityPress}
      />,
    );

    expect(getByText('Favorite Cities:')).toBeTruthy();

    favoriteCities.forEach(city => {
      expect(getByText(city)).toBeTruthy();
    });
  });

  it('should handle city press correctly', () => {
    const {getByText} = render(
      <FavoriteCitiesList
        favoriteCities={favoriteCities}
        onDelete={mockDelete}
        onFavoriteCityPress={mockCityPress}
      />,
    );

    fireEvent.press(getByText('New York'));

    expect(mockCityPress).toHaveBeenCalledWith('New York');
    expect(mockCityPress).toHaveBeenCalledTimes(1);
  });

  it('should handle delete press correctly', () => {
    const {getByTestId} = render(
      <FavoriteCitiesList
        favoriteCities={favoriteCities}
        onDelete={mockDelete}
        onFavoriteCityPress={mockCityPress}
      />,
    );

    fireEvent.press(getByTestId('delete-button-Chicago'));

    expect(mockDelete).toHaveBeenCalledWith('Chicago');
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  it('should render cities in reverse order', () => {
    const {getAllByText} = render(
      <FavoriteCitiesList
        favoriteCities={favoriteCities}
        onDelete={mockDelete}
        onFavoriteCityPress={mockCityPress}
      />,
    );

    const cityTexts = getAllByText(/New York|Los Angeles|Chicago/).map(
      node => node.props.children,
    );

    expect(cityTexts).toEqual(['Chicago', 'Los Angeles', 'New York']);
  });
});
