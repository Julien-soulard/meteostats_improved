import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label, dataType, hoveredCity }) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="bg-white p-4 border rounded-lg shadow">
      <p className="font-bold mb-2">{label}</p>
      {payload.map((entry, index) => {
        const isTemperature = entry.dataKey.startsWith('t');
        const city = entry.dataKey.slice(1); // Enlève le préfixe 't' ou 'p'
        const value = entry.value;
        const unit = isTemperature ? '°C' : 
                    dataType === 'precipitation' ? 'mm' : 'h';
        
        // N'afficher que la ville survolée si elle existe
        if (hoveredCity && city !== hoveredCity) return null;

        return (
          <p key={index} 
             style={{ color: entry.color }} 
             className={`text-sm ${hoveredCity === city ? 'font-bold' : ''}`}>
            {city}: {value?.toFixed(1)} {unit}
          </p>
        );
      })}
    </div>
  );
};

const ClimateChart = ({ 
  data, 
  dataType, 
  showTemperature, 
  sortedCities, 
  selectedCities, 
  cityData,
  hoveredCity,
  onCityHover
}) => {
  const getBarDataKey = (city) => {
    const prefix = dataType === 'precipitation' ? 'p' : 's';
    return `${prefix}${city}`;
  };

  const getBarName = (city) => {
    const type = dataType === 'precipitation' ? 'Précipitations' : 'Ensoleillement';
    const unit = dataType === 'precipitation' ? '(mm)' : '(h)';
    return `${type} ${city} ${unit}`;
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            bottom: 20,
            left: 20,
          }}
          onMouseLeave={() => onCityHover(null)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="mois" 
            tick={{ fill: '#4A5568' }}
            tickLine={{ stroke: '#4A5568' }}
          />
          <YAxis 
            yAxisId="left" 
            orientation="left" 
            label={{ 
              value: 'Température (°C)', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: '#4A5568' }
            }}
            tick={{ fill: '#4A5568' }}
            tickLine={{ stroke: '#4A5568' }}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            label={{ 
              value: dataType === 'precipitation' ? 'Précipitations (mm)' : 'Ensoleillement (h)', 
              angle: 90, 
              position: 'insideRight',
              style: { fill: '#4A5568' }
            }}
            tick={{ fill: '#4A5568' }}
            tickLine={{ stroke: '#4A5568' }}
          />
          <Tooltip 
            content={<CustomTooltip dataType={dataType} hoveredCity={hoveredCity} />}
          />
          <Legend 
            wrapperStyle={{ paddingTop: "20px" }}
            onMouseEnter={(e) => onCityHover(e.dataKey.slice(1))} // Enlève le préfixe 't' ou 'p'
            onMouseLeave={() => onCityHover(null)}
          />
          {sortedCities.map(city => 
            selectedCities[city] && (
              <React.Fragment key={city}>
                <Bar 
                  yAxisId="right" 
                  dataKey={getBarDataKey(city)} 
                  name={getBarName(city)} 
                  fill={cityData[city].color.main}
                  opacity={hoveredCity ? (hoveredCity === city ? 0.8 : 0.3) : 0.8}
                  onMouseEnter={() => onCityHover(city)}
                  onMouseLeave={() => onCityHover(null)}
                />
                {showTemperature && (
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey={`t${city}`} 
                    name={`Température ${city} (°C)`} 
                    stroke={cityData[city].color.dark} 
                    strokeWidth={2} 
                    dot={false}
                    opacity={hoveredCity ? (hoveredCity === city ? 1 : 0.3) : 1}
                    onMouseEnter={() => onCityHover(city)}
                    onMouseLeave={() => onCityHover(null)}
                  />
                )}
              </React.Fragment>
            )
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClimateChart;