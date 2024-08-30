import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadFavoriteCities = async (): Promise<string[]> => {
  try {
    const savedCities = await AsyncStorage.getItem('favoriteCities');
    return savedCities ? JSON.parse(savedCities) : [];
  } catch (error) {
    console.error('Failed to load favorite cities:', error);
    return [];
  }
};

export const saveFavoriteCity = async (
  cityName: string,
  favoriteCities: string[],
): Promise<void> => {
  try {
    const updatedCities = [...favoriteCities, cityName];
    await AsyncStorage.setItem('favoriteCities', JSON.stringify(updatedCities));
  } catch (error) {
    console.error('Failed to save the city:', error);
  }
};

export const deleteFavoriteCity = async (
  cityName: string,
  favoriteCities: string[],
): Promise<string[]> => {
  try {
    const updatedCities = favoriteCities.filter(city => city !== cityName);
    await AsyncStorage.setItem('favoriteCities', JSON.stringify(updatedCities));
    return updatedCities;
  } catch (error) {
    console.error('Failed to delete the city:', error);
    return favoriteCities;
  }
};
