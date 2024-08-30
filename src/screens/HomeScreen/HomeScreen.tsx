import React, {useState, useCallback, useEffect, useMemo} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {getWeather} from '../../api/weatherApi';
import {Routes} from '../../navigation/Routes';
import {TextInputWithClearIcon} from '../../components/TextInputWithClearIcon';
import {FavoriteCitiesList} from '../../components/FavoriteCitiesList';
import {WeatherInfo} from '../../components/WeatherInfo';
import {CustomButton} from '../../components/CustomButton';
import {validateCityName} from './helpers/ValidateCityName';
import {BACKGROUND_COLOR, PRIMARY_TEXT_COLOR} from '../../constants/colors';
import {ErrorContainer} from '../../components/ErrorContainer';
import {
  deleteFavoriteCity,
  loadFavoriteCities,
  saveFavoriteCity,
} from './helpers/FavoriteCitiesService';

export const HomeScreen: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [message, setMessage] = useState<{
    text: string;
    type: 'error' | 'warning' | null;
  }>({text: '', type: null});
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [isCityNameValid, setIsCityNameValid] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<null | {
    temp: number;
    description: string;
    icon: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const isCustomButtonDisabled = loading || !isCityNameValid;

  const fetchFavoriteCities = useCallback(async () => {
    const cities = await loadFavoriteCities();
    setFavoriteCities(cities);
  }, []);

  useEffect(() => {
    fetchFavoriteCities();
  }, [fetchFavoriteCities]);

  const validateAndSetCityName = useCallback((text: string) => {
    const isValid = validateCityName(text);
    setIsCityNameValid(isValid);
    setMessage({
      text: isValid ? '' : 'Invalid city name. Please enter a valid city.',
      type: isValid ? null : 'error',
    });
    setInputText(text);
  }, []);

  const handleTextChange = useCallback(
    (text: string) => {
      setInputText(text);
      setMessage({text: '', type: null});

      if (text.length > 0) {
        validateAndSetCityName(text);
      }
    },
    [validateAndSetCityName],
  );

  const onCityNamePress = useCallback(() => {
    if (weatherData && selectedCity) {
      navigation.navigate(Routes.WeatherScreen, {
        weatherData,
        city: selectedCity,
      });
    }
  }, [selectedCity, navigation, weatherData]);

  const fetchWeather = useCallback(
    async (cityName: string, showLoading: boolean = true) => {
      if (!cityName.trim()) {
        return;
      }

      if (showLoading) {
        setLoading(true);
      }
      setMessage({text: '', type: null});

      try {
        const data = await getWeather(cityName);

        if (data.cod === '404') {
          setMessage({text: 'City not found', type: 'error'});
        } else if (data.cod !== 200) {
          setMessage({
            text: 'Something went wrong, try again later',
            type: 'error',
          });
        } else {
          setSelectedCity(cityName);
          setWeatherData({
            temp: Math.round(data.main.temp - 273.15),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          });
        }
      } catch (error) {
        setMessage({text: 'Failed to fetch weather data', type: 'error'});
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [],
  );

  const onPressGetWeather = useCallback(() => {
    fetchWeather(inputText, true); // showLoading is true
  }, [fetchWeather, inputText]);

  const onCitySelect = useCallback(
    (cityName: string) => {
      fetchWeather(cityName, false); // showLoading is false
    },
    [fetchWeather],
  );

  const isCityInFavorites = useMemo(() => {
    return favoriteCities.some(
      city => city.toLowerCase() === selectedCity.toLowerCase(),
    );
  }, [favoriteCities, selectedCity]);

  const handleSaveFavoriteCity = useCallback(async () => {
    if (isCityInFavorites) {
      setMessage({text: 'The city has already been added', type: 'warning'});
      return;
    }

    await saveFavoriteCity(selectedCity, favoriteCities);
    setFavoriteCities([...favoriteCities, selectedCity]);
  }, [favoriteCities, selectedCity, isCityInFavorites]);

  const handleDeleteFavoriteCity = useCallback(
    async (cityName: string) => {
      const updatedCities = await deleteFavoriteCity(cityName, favoriteCities);
      setFavoriteCities(updatedCities);
    },
    [favoriteCities],
  );

  return (
    <SafeAreaViewContainer>
      <Container>
        <Title>Enter City Name</Title>
        <TextInputWithClearIcon
          value={inputText}
          onChangeText={handleTextChange}
          placeholder="Type city name..."
        />
        <ErrorContainer
          message={message.type === 'error' ? message.text : ''}
        />
        <CustomButton
          onPress={onPressGetWeather}
          disabled={isCustomButtonDisabled}
          text={loading ? 'Loading...' : 'Get Weather'}
        />
        {weatherData && (
          <WeatherInfo
            cityName={selectedCity}
            weatherData={weatherData}
            isCityInFavorites={isCityInFavorites}
            onCityNamePress={onCityNamePress}
            onSaveFavoriteCity={handleSaveFavoriteCity}
            warningMessageText={message.type === 'warning' ? message.text : ''}
          />
        )}
        {favoriteCities.length > 0 && (
          <FavoriteCitiesList
            favoriteCities={favoriteCities}
            onDelete={handleDeleteFavoriteCity}
            onFavoriteCityPress={onCitySelect}
          />
        )}
      </Container>
    </SafeAreaViewContainer>
  );
};

const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  align-items: center;
  padding: 20px;
  background-color: ${BACKGROUND_COLOR};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${PRIMARY_TEXT_COLOR};
`;
