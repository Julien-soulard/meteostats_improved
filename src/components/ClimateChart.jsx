import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useClimateData, DATA_TYPES } from '../hooks/useClimateData';

const CustomTooltip = ({ active, payload, label, dataType, hoveredCity }) => {
  if (!active || !payload || !payload.length) return null;

  const entry = payload.find(p => p.dataKey === hoveredCity);
  if (!entry) return null;

  return (
    <div className="bg-white p-2 border rounded shadow-md">
      <div className="text-sm font-medium mb-1">{label}</div>
      <div className="text-sm" style={{ color: entry.color }}>
        {entry.name}: {entry.value.toFixed(1)} {DATA_TYPES[dataType].unit}
      </div>
    </div>
  );
};

export const ClimateChart = ({ cities, period, dataType, cityColors, sortOrder }) => {
  const { data: rawData, loading, error } = useClimateData(cities, period, dataType);
  const [hoveredCity, setHoveredCity] = useState(null);

  // Trier les villes selon le critère sélectionné
  const sortedCities = useMemo(() => {
    if (!rawData || !rawData.length) return cities;

    return [...cities].sort((a, b) => {
      if (sortOrder === 'name') {
        return a.localeCompare(b);
      }
      
      // Pour le tri par valeur, on utilise la première période (année ou mois selon le mode)
      const aValue = rawData[0][a] || 0;
      const bValue = rawData[0][b] || 0;
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [cities, rawData, sortOrder]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-8">
        Une erreur est survenue lors du chargement des données: {error}
      </div>
    );
  }

  if (!cities.length) {
    return (
      <div className="text-gray-500 text-center py-8">
        Sélectionnez une ou plusieurs villes pour voir les données
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-4">
        {DATA_TYPES[dataType].label} ({DATA_TYPES[dataType].unit})
      </h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rawData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barGap={0}
            barSize={period === 'seasonal' ? 30 : 20}
            onMouseLeave={() => setHoveredCity(null)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              interval={0}
              angle={period === 'seasonal' ? 0 : -45}
              textAnchor={period === 'seasonal' ? 'middle' : 'end'}
              height={period === 'seasonal' ? 30 : 60}
            />
            <YAxis />
            <Tooltip 
              content={<CustomTooltip dataType={dataType} hoveredCity={hoveredCity} />}
              cursor={false}
            />
            <Legend 
              onMouseEnter={e => setHoveredCity(e.dataKey)}
              onMouseLeave={() => setHoveredCity(null)}
            />
            {sortedCities.map((city) => (
              <Bar 
                key={city}
                dataKey={city}
                name={city}
                fill={cityColors[city]}
                fillOpacity={hoveredCity ? (hoveredCity === city ? 0.8 : 0.3) : 0.8}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClimateChart;