// Imports
import { useEffect, useState } from 'react';
import { Toast } from './Toast';
import { WeatherDisplayMain } from './WeatherDisplayMain';
import { SearchBar } from './SearchBar';

export function Weather() {
  type WeatherData = {
    humidity: number;
    windSpeed: number;
    temperature: number;
    location: string;
    icon?: string;
  };

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Fetch Weather Data from OpenWeather API
  const search = async (city: string) => {
    // If input is empty, show alert
    if (city === '') {
      setToastMessage('Please enter a city name');
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      // If city is not found, show alert with error message from API
      if (!response.ok) {
        setToastMessage(data.message);
        return;
      }

      console.log(data);
      const icon = `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`;

      // Set the weather data in state
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(null);
      console.log('Error fetching weather data:', error);
    }
  };

  // Starts with London on page open
  useEffect(() => {
    const fetchWeather = async () => {
      await search('Leeds');
    };

    fetchWeather();
  }, []);

  return (
    <div className="place-self-center flex flex-col w-[75%] items-center gap-10 bg-center bg-cover bg-no-repeat">
      {/* Search Bar Section */}
      <SearchBar onSearch={search} />

      {/* Main Weather Display Section */}
      {weatherData && <WeatherDisplayMain data={weatherData} />}

      {/* Toast Message */}
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}
