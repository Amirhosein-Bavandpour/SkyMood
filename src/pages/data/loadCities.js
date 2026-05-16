import Papa from "papaparse";
import { normalizeText } from "../../utils/textNormalize";

export async function loadIranCities() {
  const response = await fetch("/ir.csv");
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cities = results.data
          .filter((city) => city.city && city.lat && city.lng)
          .map((city) => ({
            name: normalizeText(city.city_ascii || city.city)
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            faName: city.city_fa,
            lat: Number(city.lat),
            lon: Number(city.lng),
            province: city.admin_name,
            population: city.population,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        resolve(cities);
      },
      error: reject,
    });
  });
}
