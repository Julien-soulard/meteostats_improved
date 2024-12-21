import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';

export const DATA_TYPES = {
  // Température
  temperature: {
    id: 'temperature',
    label: 'Température moyenne',
    unit: '°C',
    dataKey: 'temp_moyenne',
    yearlyAggregation: 'mean'
  },
  jours_max30: {
    id: 'jours_max30',
    label: 'Nb jours T° max ≥ 30°C',
    unit: 'jours',
    dataKey: 'jours_max30',
    yearlyAggregation: 'sum'
  },
  jours_max25: {
    id: 'jours_max25',
    label: 'Nb jours T° max ≥ 25°C',
    unit: 'jours',
    dataKey: 'jours_max25',
    yearlyAggregation: 'sum'
  },
  jours_min0: {
    id: 'jours_min0',
    label: 'Nb jours T° min ≤ 0°C',
    unit: 'jours',
    dataKey: 'jours_min0',
    yearlyAggregation: 'sum'
  },
  // Précipitations
  precipitation: {
    id: 'precipitation',
    label: 'Précipitations',
    unit: 'mm',
    dataKey: 'precipitation_moyenne',
    yearlyAggregation: 'sum'
  },
  jours_pluie_1mm: {
    id: 'jours_pluie_1mm',
    label: 'Nb jours pluie ≥ 1mm',
    unit: 'jours',
    dataKey: 'jours_pluie_1mm',
    yearlyAggregation: 'sum'
  },
  jours_pluie_5mm: {
    id: 'jours_pluie_5mm',
    label: 'Nb jours pluie ≥ 5mm',
    unit: 'jours',
    dataKey: 'jours_pluie_5mm',
    yearlyAggregation: 'sum'
  },
  jours_pluie_10mm: {
    id: 'jours_pluie_10mm',
    label: 'Nb jours pluie ≥ 10mm',
    unit: 'jours',
    dataKey: 'jours_pluie_10mm',
    yearlyAggregation: 'sum'
  },
  // Ensoleillement
  sunshine: {
    id: 'sunshine',
    label: "Durée d'ensoleillement",
    unit: 'h',
    dataKey: 'insolation_heures',
    yearlyAggregation: 'sum'
  },
  // Vent
  jours_rafales_28ms: {
    id: 'jours_rafales_28ms',
    label: 'Nb jours rafales ≥ 100 km/h',
    unit: 'jours',
    dataKey: 'jours_rafales_28ms',
    yearlyAggregation: 'sum'
  },
  // Autres
  degres_jours_unifies: {
    id: 'degres_jours_unifies',
    label: 'Degrés jours unifiés',
    unit: '°C',
    infoLink: 'https://fr.wikipedia.org/wiki/Degr%C3%A9_jour_unifi%C3%A9',
    dataKey: 'degres_jours_unifies',
    yearlyAggregation: 'sum'
  }
};

const SEASONS = {
  winter: { label: 'Hiver', months: ['Décembre', 'Janvier', 'Février'] },
  spring: { label: 'Printemps', months: ['Mars', 'Avril', 'Mai'] },
  summer: { label: 'Été', months: ['Juin', 'Juillet', 'Août'] },
  autumn: { label: 'Automne', months: ['Septembre', 'Octobre', 'Novembre'] }
};

const aggregateValues = (values, method) => {
  if (!values.length) return 0;
  if (method === 'sum') {
    return values.reduce((sum, val) => sum + val, 0);
  }
  return values.reduce((sum, val) => sum + val, 0) / values.length;
};

export const useClimateData = (cities, period, dataType) => {
  const [rawData, setRawData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!cities.length) {
        setRawData({});
        return;
      }

      const citiesToFetch = cities.filter(city => !rawData[city]);
      if (citiesToFetch.length === 0) return;

      setLoading(true);
      try {
        const results = await Promise.all(
          citiesToFetch.map(async (city) => {
            const response = await fetch(`/data/csv/${city.toLowerCase()}.csv`);
            if (!response.ok) {
              throw new Error(`Erreur lors du chargement des données pour ${city}`);
            }
            const text = await response.text();
            
            return new Promise((resolve, reject) => {
              Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                comments: '#',
                delimiter: ',',  // On force l'utilisation de la virgule comme délimiteur
                complete: (results) => {
                  if (results.errors.length > 0) {
                    reject(new Error(`Erreur de parsing pour ${city}: ${results.errors[0].message}`));
                    return;
                  }
                  resolve({
                    city,
                    data: results.data
                  });
                },
                error: (error) => {
                  reject(new Error(`Erreur de parsing pour ${city}: ${error}`));
                }
              });
            });
          })
        );

        setRawData(prev => ({
          ...prev,
          ...Object.fromEntries(results.map(({ city, data }) => [city, data]))
        }));
        setError(null);
      } catch (e) {
        console.error('Erreur lors du chargement des données:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [cities]);

  const data = useMemo(() => {
    if (!cities.length || Object.keys(rawData).length === 0) return [];
    if (cities.some(city => !rawData[city])) return [];

    try {
      if (period === 'yearly') {
        return [{
          name: 'Année',
          ...cities.reduce((acc, city) => {
            const values = rawData[city].map(row => row[DATA_TYPES[dataType].dataKey]);
            acc[city] = aggregateValues(values, DATA_TYPES[dataType].yearlyAggregation);
            return acc;
          }, {})
        }];
      }

      if (period === 'seasonal') {
        return Object.entries(SEASONS).map(([season, { label, months }]) => {
          const seasonData = { name: label };
          
          cities.forEach(city => {
            const seasonValues = rawData[city]
              .filter(row => months.includes(row.mois))
              .map(row => row[DATA_TYPES[dataType].dataKey]);
            
            if (seasonValues.length > 0) {
              seasonData[city] = aggregateValues(seasonValues, DATA_TYPES[dataType].yearlyAggregation);
            }
          });
          
          return seasonData;
        });
      }

      return rawData[cities[0]].map((_, index) => {
        const monthData = {
          name: rawData[cities[0]][index].mois
        };
        cities.forEach(city => {
          monthData[city] = rawData[city][index][DATA_TYPES[dataType].dataKey];
        });
        return monthData;
      });
    } catch (e) {
      console.error('Erreur lors de la transformation des données:', e);
      return [];
    }
  }, [cities, period, dataType, rawData]);

  return { data, loading, error };
};

export default useClimateData;