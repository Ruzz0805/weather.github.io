import { Sun, Moon, Cloud, CloudRain } from 'lucide-react';

interface WeatherIconProps {
  condition: 'sunny' | 'cloudy' | 'night' | 'rainy';
}

export default function WeatherIcon({ condition }: WeatherIconProps) {
  switch (condition) {
    case 'sunny':
      return <Sun className="h-24 w-24 text-yellow-400" />;
    case 'night':
      return <Moon className="h-24 w-24 text-blue-200" />;
    case 'rainy':
      return <CloudRain className="h-24 w-24 text-blue-500" />;
    default:
      return <Cloud className="h-24 w-24 text-gray-400" />;
  }
}