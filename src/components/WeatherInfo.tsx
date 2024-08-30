import React from 'react';
import styled from 'styled-components/native';

import {CustomButton} from './CustomButton';
import {
  BUTTON_ENABLED_COLOR,
  PRIMARY_BLUE_COLOR,
  PRIMARY_TEXT_COLOR,
} from '../constants/colors';
import {ErrorContainer} from './ErrorContainer';

type WeatherInfoProps = {
  cityName: string;
  weatherData: {
    temp: number;
    description: string;
  };
  isCityInFavorites: boolean;
  onCityNamePress: () => void;
  onSaveFavoriteCity: () => void;
  warningMessageText: string;
};

export const WeatherInfo: React.FC<WeatherInfoProps> = ({
  cityName,
  weatherData,
  isCityInFavorites,
  onCityNamePress,
  onSaveFavoriteCity,
  warningMessageText,
}) => {
  return (
    <WeatherInfoContainer>
      <CityNameContainer onPress={onCityNamePress}>
        <CityNameText>{cityName}</CityNameText>
        <ArrowIcon>→</ArrowIcon>
      </CityNameContainer>
      <WeatherTextContainer>
        <WeatherText>Temperature: {weatherData.temp}°C</WeatherText>
        <WeatherText>Description: {weatherData.description}</WeatherText>
        <CustomButton
          onPress={onSaveFavoriteCity}
          disabled={isCityInFavorites}
          text={isCityInFavorites ? 'Already Added' : 'Save as Favorite'}
          backgroundColor={isCityInFavorites ? 'grey' : BUTTON_ENABLED_COLOR}
        />
        <ErrorContainer message={warningMessageText} />
      </WeatherTextContainer>
    </WeatherInfoContainer>
  );
};

const WeatherInfoContainer = styled.View`
  margin-top: 30px;
  width: 100%;
`;

const CityNameContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 10px;
`;

const CityNameText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${PRIMARY_BLUE_COLOR};
`;

const ArrowIcon = styled.Text`
  font-size: 24px;
  margin-left: 5px;
  color: ${PRIMARY_BLUE_COLOR};
`;

const WeatherTextContainer = styled.View`
  align-items: flex-start;
`;

const WeatherText = styled.Text`
  font-size: 18px;
  color: ${PRIMARY_TEXT_COLOR};
`;
