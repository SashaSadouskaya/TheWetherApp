import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loadFavoriteCities,
  saveFavoriteCity,
  deleteFavoriteCity,
} from './FavoriteCitiesService';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('favoriteCitiesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadFavoriteCities', () => {
    it('should return an array of favorite cities when data is stored', async () => {
      const mockCities = ['New York', 'London'];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(mockCities),
      );

      const cities = await loadFavoriteCities();
      expect(cities).toEqual(mockCities);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('favoriteCities');
    });

    it('should return an empty array if no data is stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const cities = await loadFavoriteCities();
      expect(cities).toEqual([]);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('favoriteCities');
    });
  });

  describe('saveFavoriteCity', () => {
    it('should save a new city to the favorite cities list', async () => {
      const mockCities = ['New York'];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(mockCities),
      );

      await saveFavoriteCity('London', mockCities);

      const updatedCities = ['New York', 'London'];
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'favoriteCities',
        JSON.stringify(updatedCities),
      );
    });
  });

  describe('deleteFavoriteCity', () => {
    it('should delete a city from the favorite cities list', async () => {
      const mockCities = ['New York', 'London'];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(mockCities),
      );

      const updatedCities = await deleteFavoriteCity('London', mockCities);

      expect(updatedCities).toEqual(['New York']);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'favoriteCities',
        JSON.stringify(['New York']),
      );
    });
  });
});
