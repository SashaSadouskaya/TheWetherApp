import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {WeatherInfo} from './WeatherInfo';

describe('WeatherInfo', () => {
  const mockOnCityNamePress = jest.fn();
  const mockOnSaveFavoriteCity = jest.fn();
  const defaultProps = {
    cityName: 'London',
    weatherData: {
      temp: 15,
      description: 'Clear sky',
    },
    isCityInFavorites: false,
    onCityNamePress: mockOnCityNamePress,
    onSaveFavoriteCity: mockOnSaveFavoriteCity,
    warningMessageText: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display the city name, temperature, and weather description', () => {
    const {getByText} = render(<WeatherInfo {...defaultProps} />);

    expect(getByText('London')).toBeTruthy();
    expect(getByText('Temperature: 15°C')).toBeTruthy();
    expect(getByText('Description: Clear sky')).toBeTruthy();
  });

  it('should call onCityNamePress when the city name is pressed', () => {
    const {getByText} = render(<WeatherInfo {...defaultProps} />);

    fireEvent.press(getByText('London'));

    expect(mockOnCityNamePress).toHaveBeenCalledTimes(1);
  });

  it('should display "Save as Favorite" button when city is not in favorites', () => {
    const {getByText} = render(<WeatherInfo {...defaultProps} />);

    const saveButton = getByText('Save as Favorite');
    expect(saveButton).toBeTruthy();
  });

  it('should call onSaveFavoriteCity when "Save as Favorite" button is pressed', () => {
    const {getByText} = render(<WeatherInfo {...defaultProps} />);

    fireEvent.press(getByText('Save as Favorite'));

    expect(mockOnSaveFavoriteCity).toHaveBeenCalledTimes(1);
  });

  it('should display "Already Added" button when city is in favorites', () => {
    const props = {
      ...defaultProps,
      isCityInFavorites: true,
    };
    const {getByText} = render(<WeatherInfo {...props} />);

    const alreadyAddedButton = getByText('Already Added');
    expect(alreadyAddedButton).toBeTruthy();
  });

  it('should not call onSaveFavoriteCity when "Already Added" button is pressed', () => {
    const props = {
      ...defaultProps,
      isCityInFavorites: true,
    };
    const {getByText} = render(<WeatherInfo {...props} />);

    fireEvent.press(getByText('Already Added'));

    expect(mockOnSaveFavoriteCity).not.toHaveBeenCalled();
  });

  it('should display a warning message if warningMessageText is provided', () => {
    const props = {
      ...defaultProps,
      warningMessageText: 'This city is already in your favorites.',
    };
    const {getByText} = render(<WeatherInfo {...props} />);

    expect(getByText('This city is already in your favorites.')).toBeTruthy();
  });
});
