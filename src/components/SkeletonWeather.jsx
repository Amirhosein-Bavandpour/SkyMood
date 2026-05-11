function SkeletonWeather() {
  return (
    <>
      <div className="weather-card skeleton-card">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-subtitle"></div>
        <div className="skeleton skeleton-circle"></div>
        <div className="skeleton skeleton-temp"></div>
        <div className="skeleton skeleton-line"></div>
      </div>

      <div className="forecast skeleton-forecast">
        <div className="skeleton skeleton-heading"></div>

        <div className="forecast-list">
          {Array.from({ length: 7 }).map((_, index) => (
            <div className="forecast-item" key={index}>
              <div className="skeleton skeleton-small"></div>
              <div className="skeleton skeleton-icon"></div>
              <div className="skeleton skeleton-small"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SkeletonWeather;