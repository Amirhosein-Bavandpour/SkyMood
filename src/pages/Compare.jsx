import { useEffect, useState } from "react";
import CityComparison from "../components/CityComparison";
import { loadIranCities } from "./data/loadCities";

function Compare() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function fetchCities() {
      const loadedCities = await loadIranCities();
      setCities(loadedCities);
    }

    fetchCities();
  }, []);

  return (
    <div className="page">
      <section className="container">
        <h1>Compare Iranian Cities</h1>
        <p className="subtitle">Compare current weather between two cities</p>

        <CityComparison cities={cities} unit="celsius" />
      </section>
    </div>
  );
}

export default Compare;
