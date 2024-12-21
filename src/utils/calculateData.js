// Constantes pour les saisons
export const SEASONS = {
  'Hiver': ['Déc', 'Jan', 'Fév'],
  'Printemps': ['Mar', 'Avr', 'Mai'],
  'Été': ['Juin', 'Juil', 'Août'],
  'Automne': ['Sep', 'Oct', 'Nov']
};

// Calcul des données saisonnières
export const calculateSeasonalData = (monthlyData, sortType, dataType, showTemperature, selectedCities, cityData) => {
  let data = Object.entries(SEASONS).map(([season, months]) => {
    const seasonData = { mois: season };
    
    Object.entries(cityData).forEach(([cityName, city]) => {
      const relevantData = city.monthlyData.filter(m => months.includes(m.month));
      seasonData[`t${cityName}`] = calculateAverage(relevantData, 'temp');
      seasonData[`p${cityName}`] = calculateSum(relevantData, 'precip');
      seasonData[`s${cityName}`] = calculateSum(relevantData, 'sun');
    });
    
    return seasonData;
  });

  return sortSeasonalData(data, sortType, dataType, showTemperature, selectedCities);
};

// Calcul des données annuelles
export const calculateAnnualData = (cityData) => {
  return [{
    mois: 'Année',
    ...Object.entries(cityData).reduce((acc, [cityName, city]) => ({
      ...acc,
      [`t${cityName}`]: calculateAverage(city.monthlyData, 'temp'),
      [`p${cityName}`]: calculateSum(city.monthlyData, 'precip'),
      [`s${cityName}`]: calculateSum(city.monthlyData, 'sun')
    }), {})
  }];
};

// Helpers
const calculateAverage = (data, key) => {
  return Number((data.reduce((sum, item) => sum + item[key], 0) / data.length).toFixed(1));
};

const calculateSum = (data, key) => {
  return Number(data.reduce((sum, item) => sum + item[key], 0).toFixed(1));
};

const sortSeasonalData = (data, sortType, dataType, showTemperature, selectedCities) => {
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