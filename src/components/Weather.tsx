// Imports
import { useEffect, useRef, useState } from 'react';
import search_icon from '../assets/search.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';

export function Weather() {
  type WeatherData = {
    humidity: number;
    windSpeed: number;
    temperature: number;
    location: string;
    icon?: string;
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // Fetch Weather Data from OpenWeather API
  const search = async (city: string) => {
    // If input is empty, show alert
    if (city === '') {
      alert('Please enter a city name');
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      // If city is not found, show alert with error message from API
      if (!response.ok) {
        alert(data.message);
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
      <div className="flex justify-between items-center gap-12 w-full bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="flex-1 h-12.5 border-none outline-none pl-6.25 text-white text-lg"
        />
        <img
          src={search_icon}
          alt="search-icon"
          className="w-12.5 h-12.5 p-3.75 cursor-pointer"
          onClick={() => {
            search(inputRef.current?.value || '');
          }}
        />
      </div>

      <div className="w-full place-self-center p-10 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg flex flex-col items-center">
        {weatherData ? (
          <>
            {/* Weather Info */}
            <img
              src={weatherData?.icon}
              alt="weather-icon"
              className="w-37.5 my-7.5 mx-0"
            />
            <p className="text-white text-[80px] leading-none">
              {weatherData?.temperature}°C
            </p>
            <p className="text-white text-[40px]">{weatherData?.location}</p>

            {/* Weather Data */}
            <div className="w-full mt-10 text-white flex justify-between">
              {/* Humidity */}
              <div className="flex items-start gap-3 text-[22px]">
                <img
                  src={humidity_icon}
                  alt="humidity-icon"
                  className="w-6.5 mt-2.5"
                />
                <div>
                  <p>{weatherData?.humidity} %</p>
                  <p className="block text-[16px]">Humidity</p>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="flex items-start gap-3 text-[22px]">
                <img src={wind_icon} alt="humidity-icon" />
                <div>
                  <p>{weatherData?.windSpeed} Km/h</p>
                  <p className="block text-[16px]">Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
