import {API_KEY, BASE_URL} from '../constants/constants';

export const getWeather = async (city: string) => {
  const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`);

  const data = await response.json();
  return data;
};
