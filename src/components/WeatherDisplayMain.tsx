import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';

interface WeatherData {
  humidity: number;
  windSpeed: number;
  temperature: number;
  location: string;
  icon?: string;
}

interface WeatherDisplayProps {
  data: WeatherData;
}

export const WeatherDisplayMain: React.FC<WeatherDisplayProps> = ({ data }) => {
  return (
    <div className="w-full place-self-center p-10 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg flex flex-col items-center">
      {/* Weather Icon */}
      <img src={data.icon} alt="weather-icon" className="w-37.5 my-7.5 mx-0" />

      {/* Temperature */}
      <p className="text-white text-[80px] leading-none">
        {data.temperature}°C
      </p>

      {/* Location */}
      <p className="text-white text-[40px]">{data.location}</p>

      {/* Weather Data: Humidity & Wind */}
      <div className="w-full mt-10 text-white flex justify-between">
        {/* Humidity */}
        <div className="flex items-start gap-3 text-[22px]">
          <img
            src={humidity_icon}
            alt="humidity-icon"
            className="w-6.5 mt-2.5"
          />
          <div>
            <p>{data.humidity} %</p>
            <p className="block text-[16px]">Humidity</p>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="flex items-start gap-3 text-[22px]">
          <img src={wind_icon} alt="wind-icon" />
          <div>
            <p>{data.windSpeed} Km/h</p>
            <p className="block text-[16px]">Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
