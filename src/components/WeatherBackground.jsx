function WeatherBackground({ mood }) {
  return (
    <div className={`weather-bg weather-bg-${mood || "default"}`}>
      {mood === "rainy" && (
        <div className="rain-layer">
          {Array.from({ length: 45 }).map((_, index) => (
            <span key={index} style={{ "--i": index }} />
          ))}
        </div>
      )}

      {mood === "snowy" && (
        <div className="snow-layer">
          {Array.from({ length: 35 }).map((_, index) => (
            <span key={index} style={{ "--i": index }} />
          ))}
        </div>
      )}

      {["cloudy", "partly-cloudy", "foggy"].includes(mood) && (
        <div className="cloud-layer">
          <span />
          <span />
          <span />
        </div>
      )}

      {mood === "sunny" && <div className="sun-layer" />}

      {mood === "stormy" && <div className="storm-layer" />}
    </div>
  );
}

export default WeatherBackground;
