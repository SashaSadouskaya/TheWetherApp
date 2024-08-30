import React from 'react';
import {useRoute} from '@react-navigation/native';
import styled from 'styled-components/native';
import {PRIMARY_TEXT_COLOR, WHITE_COLOR} from '../../constants/colors';

export const WeatherScreen: React.FC = () => {
  const route = useRoute();
  const {weatherData, city} = route.params as {
    weatherData: {temp: number; description: string; icon: string};
    city: string;
  };

  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  return (
    <Container>
      <CityName>{city}</CityName>
      <WeatherText>Temperature: {weatherData.temp}°C</WeatherText>
      <WeatherText>Description: {weatherData.description}</WeatherText>
      <WeatherIcon source={{uri: iconUrl}} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
  background-color: ${WHITE_COLOR};
`;

const CityName = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${PRIMARY_TEXT_COLOR};
  margin-bottom: 20px;
`;

const WeatherText = styled.Text`
  font-size: 18px;
  color: ${PRIMARY_TEXT_COLOR};
  margin-bottom: 10px;
`;

const WeatherIcon = styled.Image`
  width: 100px;
  height: 100px;
`;
