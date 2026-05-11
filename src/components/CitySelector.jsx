import { useState } from "react";

function CitySelector({ cities, selectedCity, onCityChange }) {
  const [search, setSearch] = useState("");

  const filteredCities = cities.filter((city) => {
    const query = search.toLowerCase().trim();

    return (
      city.name.toLowerCase().includes(query) ||
      city.faName.includes(search.trim())
    );
  });

  return (
    <div className="city-selector">
      <label>Search Iran City</label>

      <input
        type="text"
        placeholder="Search Tehran, Shiraz, مشهد..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={selectedCity.name}
        onChange={(e) => {
          const city = cities.find((item) => item.name === e.target.value);
          onCityChange(city);
          setSearch("");
        }}
      >
        {filteredCities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name} - {city.faName}
          </option>
        ))}
      </select>

      {filteredCities.length === 0 && (
        <p className="empty-message">No city found</p>
      )}
    </div>
  );
}

export default CitySelector;