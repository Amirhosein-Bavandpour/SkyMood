import { getWeatherInfo } from "../utils/weatherCodes";

function convertTemp(temp, unit) {
  if (unit === "fahrenheit") {
    return Math.round((temp * 9) / 5 + 32);
  }

  return Math.round(temp);
}

function ForecastList({ weather, unit }) {
  const daily = weather.daily;
  const unitSymbol = unit === "fahrenheit" ? "°F" : "°C";

  return (
    <div className="forecast">
      <h3>7-Day Forecast</h3>

      <div className="forecast-list">
        {daily.time.map((day, index) => {
          const info = getWeatherInfo(daily.weather_code[index]);

          return (
            <div className="forecast-item" key={day}>
              <p>
                {new Date(day).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>

              <div className="forecast-icon">{info.icon}</div>

              <p>
                {convertTemp(daily.temperature_2m_max[index], unit)}
                {unitSymbol} / {convertTemp(daily.temperature_2m_min[index], unit)}
                {unitSymbol}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastList;