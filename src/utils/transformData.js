// Constantes pour les mois
export const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

// Transformation des données mensuelles
export const transformDataForChart = (cities, selectedCities, sortType, dataType, showTemperature, cityData) => {
  let data = MONTHS.map(month => {
    const monthData = { mois: month };
    
    Object.entries(cityData).forEach(([cityName, city]) => {
      if (selectedCities[cityName]) {
        const monthEntry = city.monthlyData.find(m => m.month === month);
        monthData[`t${cityName}`] = monthEntry.temp;
        monthData[`p${cityName}`] = monthEntry.precip;
        monthData[`s${cityName}`] = monthEntry.sun;
      }
    });
    
    return monthData;
  });

  return sortData(data, sortType, dataType, showTemperature, selectedCities);
};

// Helper pour le tri des données
const sortData = (data, sortType, dataType, showTemperature, selectedCities) => {
  if (sortType === 'none') return data;

  return data.sort((a, b) => {
    const getMaxValue = (item) => {
      let maxValue = -Infinity;
      Object.entries(selectedCities).forEach(([city, isSelected]) => {
        if (!isSelected) return;
        const value = dataType === 'precipitation' ? item[`p${city}`] :
                     dataType === 'sunshine' ? item[`s${city}`] :
                     showTemperature ? item[`t${city}`] : 0;
        if (value > maxValue) {
          maxValue = value;
        }
      });
      return maxValue;
    };

    const aValue = getMaxValue(a);
    const bValue = getMaxValue(b);
    return sortType === 'desc' ? bValue - aValue : aValue - bValue;
  });
};