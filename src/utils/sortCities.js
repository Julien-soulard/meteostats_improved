// Tri des villes pour la vue annuelle
export const sortCitiesByData = (
  cities,
  viewMode,
  sortType,
  dataType,
  showTemperature,
  selectedCities,
  annualData
) => {
  if (viewMode !== 'annual' || sortType === 'none') {
    return cities;
  }

  return [...cities].sort((a, b) => {
    // Gestion des villes non sélectionnées
    if (!selectedCities[a] && !selectedCities[b]) return 0;
    if (!selectedCities[a]) return 1;
    if (!selectedCities[b]) return -1;

    const valueA = getCityValue(a, dataType, showTemperature, annualData);
    const valueB = getCityValue(b, dataType, showTemperature, annualData);

    return sortType === 'desc' ? valueB - valueA : valueA - valueB;
  });
};

// Helper pour obtenir la valeur d'une ville selon le type de données
const getCityValue = (city, dataType, showTemperature, annualData) => {
  if (dataType === 'precipitation') return annualData[0][`p${city}`];
  if (dataType === 'sunshine') return annualData[0][`s${city}`];
  if (showTemperature) return annualData[0][`t${city}`];
  return 0;
};