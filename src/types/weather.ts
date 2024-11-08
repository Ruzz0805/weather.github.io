export interface WeatherData {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'night' | 'rainy';
  location: string;
  timezone: string;
}