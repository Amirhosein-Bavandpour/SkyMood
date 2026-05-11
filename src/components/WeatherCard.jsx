import { Droplets, Wind } from "lucide-react";
import { getWeatherInfo } from "../utils/weatherCodes";

function convertTemp(temp, unit) {
  if (unit === "fahrenheit") {
    return Math.round((temp * 9) / 5 + 32);
  }

  return Math.round(temp);
}

function WeatherCard({ city, weather, unit }) {
  const current = weather.current;
  const info = getWeatherInfo(current.weather_code);
  const unitSymbol = unit === "fahrenheit" ? "°F" : "°C";

  return (
    <div className="weather-card">
      <h2>{city.name}</h2>
      <p className="city-fa">{city.faName}</p>

      <div className="weather-icon">{info.icon}</div>

      <h1>
        {convertTemp(current.temperature_2m, unit)}
        {unitSymbol}
      </h1>

      <p>{info.label}</p>

      <div className="weather-details">
        <span>
          🌡️ Feels like {convertTemp(current.apparent_temperature, unit)}
          {unitSymbol}
        </span>

        <span>
          <Droplets size={18} />
          {current.relative_humidity_2m}%
        </span>

        <span>
          <Wind size={18} />
          {current.wind_speed_10m} km/h
        </span>
      </div>

      <div className="sun-times">
        <span>🌅 Sunrise: {weather.daily.sunrise[0].slice(11, 16)}</span>
        <span>🌇 Sunset: {weather.daily.sunset[0].slice(11, 16)}</span>
      </div>
    </div>
  );
}

export default WeatherCard;