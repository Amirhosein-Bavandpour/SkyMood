import { Droplets, Wind, Activity, Sun } from "lucide-react";
import { getWeatherInfo } from "../utils/weatherCodes";
import { getAqiInfo } from "../utils/airQuality";
import { motion } from "framer-motion";
import { cardAnimation } from "../utils/animations";

function convertTemp(temp, unit) {
  if (unit === "fahrenheit") {
    return Math.round((temp * 9) / 5 + 32);
  }

  return Math.round(temp);
}

function WeatherCard({ city, weather, airQuality, unit, t, language }) {
  const current = weather.current;
  const info = getWeatherInfo(current.weather_code);
  const unitSymbol = unit === "fahrenheit" ? "°F" : "°C";
  const aq = airQuality?.current;
  const aqiInfo = aq ? getAqiInfo(aq.us_aqi) : null;

  return (
    <motion.div
      className="weather-card"
      variants={cardAnimation}
      initial="hidden"
      animate="visible"
    >
      <h2>{language === "fa" ? city.faName || city.name : city.name}</h2>
      <p className="city-fa">{city.faName}</p>

      <div className="weather-icon">{info.icon}</div>

      <h1>
        {convertTemp(current.temperature_2m, unit)}
        {unitSymbol}
      </h1>

      <p>{info.label}</p>

      <div className="weather-details">
        <span>
          🌡️ {t.feelsLike} {convertTemp(current.apparent_temperature, unit)}
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
        <span>
          🌅 {t.sunrise}: {weather.daily.sunrise[0].slice(11, 16)}
        </span>
        <span>
          🌇 {t.sunset}: {weather.daily.sunset[0].slice(11, 16)}
        </span>
      </div>

      {aq && (
        <div className="air-quality">
          <h2>{t.airQuality}</h2>
          <br />
          <div className="aqi-status">
            <strong
              style={{
                color: aqiInfo.color,
              }}
            >
              ● {aqiInfo.label}
            </strong>
            <span>US AQI: {aq.us_aqi}</span>
          </div>

          <div className="air-quality-grid">
            <span>🌫️ AQI: {aq.us_aqi}</span>

            <span>
              <Activity size={18} />
              PM2.5: {aq.pm2_5}
            </span>

            <span>🏙️ PM10: {aq.pm10}</span>

            <span>
              <Sun size={18} />
              UV: {aq.uv_index}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default WeatherCard;
