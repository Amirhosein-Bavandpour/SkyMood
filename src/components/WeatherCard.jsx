import { Droplets, Wind } from "lucide-react";
import { getWeatherInfo } from "../utils/weatherCodes";

function WeatherCard({ city, weather }) {
  const current = weather.current;
  const info = getWeatherInfo(current.weather_code);

  return (
    <div className="weather-card">
      <h2>{city.name}</h2>
      <p className="city-fa">{city.faName}</p>

      <div className="weather-icon">{info.icon}</div>

      <h1>{Math.round(current.temperature_2m)}°C</h1>
      <p>{info.label}</p>

      <div className="weather-details">
        <span>
          <Droplets size={18} />
          {current.relative_humidity_2m}%
        </span>

        <span>
          <Wind size={18} />
          {current.wind_speed_10m} km/h
        </span>
      </div>
    </div>
  );
}

export default WeatherCard;