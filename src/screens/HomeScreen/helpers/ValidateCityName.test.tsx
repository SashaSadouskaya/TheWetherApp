import {validateCityName} from './ValidateCityName';

describe('validateCityName', () => {
  test('should return true for valid Latin city names', () => {
    expect(validateCityName('New York')).toBe(true);
    expect(validateCityName('Los-Angeles')).toBe(true);
    expect(validateCityName('San Francisco')).toBe(true);
    expect(validateCityName('Washington')).toBe(true);
  });

  test('should return true for valid Cyrillic city names', () => {
    expect(validateCityName('Москва')).toBe(true);
    expect(validateCityName('Санкт-Петербург')).toBe(true);
    expect(validateCityName('Нижний Новгород')).toBe(true);
  });

  test('should return false for names with invalid characters', () => {
    expect(validateCityName('New@York')).toBe(false);
    expect(validateCityName('Los!Angeles')).toBe(false);
    expect(validateCityName('Paris#')).toBe(false);
    expect(validateCityName('Berlin$')).toBe(false);
  });

  test('should return false for names that start or end with a space or hyphen', () => {
    expect(validateCityName(' New York')).toBe(false);
    expect(validateCityName('New York ')).toBe(false);
    expect(validateCityName('-Los Angeles')).toBe(false);
    expect(validateCityName('Los Angeles-')).toBe(false);
  });

  test('should return false for empty or whitespace-only names', () => {
    expect(validateCityName('')).toBe(false);
    expect(validateCityName(' ')).toBe(false);
  });
});
