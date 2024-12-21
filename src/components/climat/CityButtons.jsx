import React from 'react';

const CityButtons = ({ 
  sortedCities, 
  selectedCities, 
  cityData, 
  toggleCity,
  hoveredCity,
  onCityHover
}) => {
  return (
    <div className="flex justify-center flex-wrap gap-2 mb-4">
      {sortedCities.map(city => {
        const isHovered = hoveredCity === city;
        return (
          <button 
            key={city}
            className={`px-3 py-1 rounded transition-all duration-200 ${
              selectedCities[city] ? 'text-white shadow-sm' : 'bg-gray-200'
            } ${isHovered ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
            style={{ 
              backgroundColor: selectedCities[city] ? cityData[city].color.main : undefined,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
            onClick={() => toggleCity(city)}
            onMouseEnter={() => onCityHover(city)}
            onMouseLeave={() => onCityHover(null)}
          >
            {city}
          </button>
        );
      })}
    </div>
  );
};

export default CityButtons;