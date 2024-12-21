export const transformDataForChart = (cities, selectedCities, sortType, dataType, showTemperature, cityData) => {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  
  let data = months.map(month => {
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

  if (sortType !== 'none') {
    data = data.sort((a, b) => {
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
  }

  return data;
};

export const calculateSeasonalData = (monthlyData, sortType, dataType, showTemperature, selectedCities, cityData) => {
  const seasons = {
    'Hiver': ['Déc', 'Jan', 'Fév'],
    'Printemps': ['Mar', 'Avr', 'Mai'],
    'Été': ['Juin', 'Juil', 'Août'],
    'Automne': ['Sep', 'Oct', 'Nov']
  };

  let data = Object.entries(seasons).map(([season, months]) => {
    const seasonData = { mois: season };
    
    Object.entries(cityData).forEach(([cityName, city]) => {
      const relevantData = city.monthlyData.filter(m => months.includes(m.month));
      seasonData[`t${cityName}`] = Number((relevantData.reduce((acc, m) => acc + m.temp, 0) / 3).toFixed(1));
      seasonData[`p${cityName}`] = Number(relevantData.reduce((acc, m) => acc + m.precip, 0).toFixed(1));
      seasonData[`s${cityName}`] = Number(relevantData.reduce((acc, m) => acc + m.sun, 0).toFixed(1));
    });
    
    return seasonData;
  });

  if (sortType !== 'none') {
    data = data.sort((a, b) => {
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
  }

  return data;
};

export const calculateAnnualData = (cityData) => {
  return [{
    mois: 'Année',
    ...Object.entries(cityData).reduce((acc, [cityName, city]) => ({
      ...acc,
      [`t${cityName}`]: Number((city.monthlyData.reduce((sum, m) => sum + m.temp, 0) / 12).toFixed(1)),
      [`p${cityName}`]: Number(city.monthlyData.reduce((sum, m) => sum + m.precip, 0).toFixed(1)),
      [`s${cityName}`]: Number(city.monthlyData.reduce((sum, m) => sum + m.sun, 0).toFixed(1))
    }), {})
  }];
};