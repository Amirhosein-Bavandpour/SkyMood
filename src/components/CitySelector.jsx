function CitySelector({ cities, selectedCity, onCityChange }) {
  return (
    <div className="city-selector">
      <label>Select Iran City</label>

      <select
        value={selectedCity.name}
        onChange={(e) => {
          const city = cities.find((item) => item.name === e.target.value);
          onCityChange(city);
        }}
      >
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name} - {city.faName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CitySelector;