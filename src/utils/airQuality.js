export function getAqiInfo(aqi) {
  if (aqi <= 50) {
    return {
      label: "Good",
      color: "#22c55e",
    };
  }

  if (aqi <= 100) {
    return {
      label: "Moderate",
      color: "#eab308",
    };
  }

  if (aqi <= 150) {
    return {
      label: "Sensitive",
      color: "#f97316",
    };
  }

  if (aqi <= 200) {
    return {
      label: "Unhealthy",
      color: "#ef4444",
    };
  }

  if (aqi <= 300) {
    return {
      label: "Very Unhealthy",
      color: "#a855f7",
    };
  }

  return {
    label: "Hazardous",
    color: "#7c2d12",
  };
}