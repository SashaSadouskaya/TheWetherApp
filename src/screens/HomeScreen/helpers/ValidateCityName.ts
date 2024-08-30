export const validateCityName = (cityName: string): boolean => {
  // Regular expression to validate city names
  const cityNamePattern =
    /^[a-zA-Z\u0400-\u04FF]+(?:[ -][a-zA-Z\u0400-\u04FF]+)*$/;

  return (
    cityNamePattern.test(cityName.trim()) && !/^[\s-]|[\s-]$/.test(cityName)
  );
};
