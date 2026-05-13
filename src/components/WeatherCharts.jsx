import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function ChartBox({ children }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(320);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="chart-responsive-wrapper" ref={ref}>
      {children(Math.max(width, 280))}
    </div>
  );
}

function WeatherCharts({ weather, unit, t, language }) {
  const unitSymbol = unit === "fahrenheit" ? "°F" : "°C";

  function convertTemp(temp) {
    return unit === "fahrenheit"
      ? Math.round((temp * 9) / 5 + 32)
      : Math.round(temp);
  }

  const hourlyData = weather.hourly.time.slice(0, 24).map((time, index) => ({
    time: time.slice(11, 16),
    temperature: convertTemp(weather.hourly.temperature_2m[index]),
  }));

  const dailyData = weather.daily.time.map((day, index) => ({
    day: new Date(day).toLocaleDateString(
      language === "fa" ? "fa-IR" : "en-US",
      {
        weekday: "short",
      },
    ),
    max: convertTemp(weather.daily.temperature_2m_max[index]),
    min: convertTemp(weather.daily.temperature_2m_min[index]),
  }));

  return (
    <section className="charts">
      <h3>{t.weatherAnalytics}</h3>

      <div className="chart-card">
        <h4>{t.next24Hours}</h4>

        <ChartBox>
          {(width) => (
            <LineChart
              width={width}
              height={260}
              data={hourlyData}
              margin={{ top: 10, right: 8, left: -24, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis unit={unitSymbol} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                strokeWidth={3}
                dot={false}
                name="Temperature"
                isAnimationActive={false}
              />
            </LineChart>
          )}
        </ChartBox>
      </div>

      <div className="chart-card">
        <h4>{t.sevenDayMaxMin}</h4>

        <ChartBox>
          {(width) => (
            <LineChart
              width={width}
              height={260}
              data={dailyData}
              margin={{ top: 10, right: 8, left: -24, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis unit={unitSymbol} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="max"
                strokeWidth={3}
                name="Max Temp"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="min"
                strokeWidth={3}
                name="Min Temp"
                isAnimationActive={false}
              />
            </LineChart>
          )}
        </ChartBox>
      </div>
    </section>
  );
}

export default WeatherCharts;
