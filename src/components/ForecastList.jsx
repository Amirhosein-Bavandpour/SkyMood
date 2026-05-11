import { getWeatherInfo } from "../utils/weatherCodes";

function ForecastList({ weather }) {
  const daily = weather.daily;

  return (
    <div className="forecast">
      <h3>7-Day Forecast</h3>

      <div className="forecast-list">
        {daily.time.map((day, index) => {
          const info = getWeatherInfo(daily.weather_code[index]);

          return (
            <div className="forecast-item" key={day}>
              <p>{new Date(day).toLocaleDateString("en-US", { weekday: "short" })}</p>
              <div className="forecast-icon">{info.icon}</div>
              <p>
                {Math.round(daily.temperature_2m_max[index])}° /{" "}
                {Math.round(daily.temperature_2m_min[index])}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastList;