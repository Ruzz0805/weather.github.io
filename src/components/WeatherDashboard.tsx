import { useState, useEffect } from 'react';
import { Thermometer, Search, Clock } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WeatherIcon from './WeatherIcon';
import WeatherAnimation from './WeatherAnimation';
import { WeatherData } from '@/types/weather';

const initialWeatherData: WeatherData = {
  temperature: 94,
  condition: 'sunny',
  location: 'Manila, Philippines',
  timezone: 'Asia/Manila'
};

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData>(initialWeatherData);
  const [isCelsius, setIsCelsius] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTemperature = () => {
    if (isCelsius) {
      return Math.round((weatherData.temperature - 32) * 5 / 9);
    }
    return weatherData.temperature;
  };

  const getBackgroundClass = () => {
    switch (weatherData.condition) {
      case 'sunny':
        return 'bg-gradient-to-br from-yellow-300 to-blue-500';
      case 'night':
        return 'bg-gradient-to-br from-blue-900 to-gray-900';
      case 'rainy':
        return 'bg-gradient-to-br from-gray-700 to-blue-800';
      default:
        return 'bg-gradient-to-br from-gray-300 to-blue-400';
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocation(e.target.value);
  };

  const updateLocation = () => {
    if (newLocation.trim() !== '') {
      const conditions = ['sunny', 'cloudy', 'night', 'rainy'];
      const newCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const newTemperature = Math.floor(Math.random() * (90 - 50 + 1)) + 50;
      const timezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
      const newTimezone = timezones[Math.floor(Math.random() * timezones.length)];

      setWeatherData({
        temperature: newTemperature,
        condition: newCondition as 'sunny' | 'cloudy' | 'night' | 'rainy',
        location: newLocation,
        timezone: newTimezone
      });
      setNewLocation('');
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: weatherData.timezone
    }).format(date);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${getBackgroundClass()}`}>
      <div className="bg-white bg-opacity-80 p-8 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">{weatherData.location}</h1>
        <div className="flex items-center justify-center mb-6 text-gray-600">
          <Clock className="h-5 w-5 mr-2" />
          <span>{formatTime(currentTime)}</span>
        </div>
        <div className="text-center text-sm text-gray-500 mb-6">
          Timezone: {weatherData.timezone}
        </div>
        <div className="flex justify-center mb-6">
          <WeatherIcon condition={weatherData.condition} />
        </div>
        <div className="text-center mb-6">
          <span className="text-6xl font-bold text-gray-800">{getTemperature()}</span>
          <span className="text-4xl text-gray-600">°{isCelsius ? 'C' : 'F'}</span>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Thermometer className="h-6 w-6 text-red-500" />
          <Label htmlFor="temp-toggle" className="text-sm text-gray-600">
            Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
          </Label>
          <Switch
            id="temp-toggle"
            checked={isCelsius}
            onCheckedChange={setIsCelsius}
          />
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Enter new location"
            value={newLocation}
            onChange={handleLocationChange}
            className="flex-grow"
          />
          <Button onClick={updateLocation}>
            <Search className="h-4 w-4 mr-2" />
            Update
          </Button>
        </div>
        <WeatherAnimation condition={weatherData.condition} />
      </div>
    </div>
  );
}