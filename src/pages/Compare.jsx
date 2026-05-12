import { useEffect, useState } from "react";
import CityComparison from "../components/CityComparison";
import { loadIranCities } from "./data/loadCities";

function Compare({ t, language }) {
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
        <h1>{t.compareTitle}</h1>
        <p className="subtitle">{t.compareSubtitle}</p>
        <CityComparison
          cities={cities}
          unit="celsius"
          t={t}
          language={language}
        />
      </section>
    </div>
  );
}

export default Compare;
