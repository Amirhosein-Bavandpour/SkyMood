import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function WeatherCharts({ weather, unit }) {
  const unitSymbol = unit === "fahrenheit" ? "°F" : "°C";

  function convertTemp(temp) {
    if (unit === "fahrenheit") {
      return Math.round((temp * 9) / 5 + 32);
    }

    return Math.round(temp);
  }

  const hourlyData = weather.hourly.time.slice(0, 24).map((time, index) => ({
    time: time.slice(11, 16),
    temperature: convertTemp(weather.hourly.temperature_2m[index]),
    humidity: weather.hourly.relative_humidity_2m[index],
  }));

  const dailyData = weather.daily.time.map((day, index) => ({
    day: new Date(day).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    max: convertTemp(weather.daily.temperature_2m_max[index]),
    min: convertTemp(weather.daily.temperature_2m_min[index]),
  }));

  return (
    <section className="charts">
      <h3>Weather Analytics</h3>

      <div className="chart-card">
        <h4>Next 24 Hours Temperature</h4>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit={unitSymbol} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temperature"
              strokeWidth={3}
              dot={false}
              name="Temperature"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h4>7-Day Max / Min Temperature</h4>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis unit={unitSymbol} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="max"
              strokeWidth={3}
              name="Max Temp"
            />
            <Line
              type="monotone"
              dataKey="min"
              strokeWidth={3}
              name="Min Temp"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default WeatherCharts;
