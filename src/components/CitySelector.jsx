import React from 'react';

export const CitySelector = ({ selectedCities, onChange, cityColors }) => {
  const handleCityClick = (city) => {
    if (selectedCities.includes(city)) {
      onChange(selectedCities.filter(c => c !== city));
    } else {
      onChange([...selectedCities, city]);
    }
  };

  const handleToggleAll = () => {
    if (selectedCities.length === Object.keys(cityColors).length) {
      // Tout est sélectionné -> on désélectionne tout
      onChange([]);
    } else {
      // Sinon -> on sélectionne tout
      onChange(Object.keys(cityColors));
    }
  };

  const allSelected = selectedCities.length === Object.keys(cityColors).length;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">Sélectionnez les villes à comparer</h3>
        <button
          onClick={handleToggleAll}
          className="px-3 py-1 rounded text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-all"
        >
          {allSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Object.keys(cityColors).map((city) => (
          <button
            key={city}
            onClick={() => handleCityClick(city)}
            className={`px-3 py-1 rounded text-sm font-medium transition-all
              ${selectedCities.includes(city)
                ? 'text-white shadow-sm scale-105'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
            style={{
              backgroundColor: selectedCities.includes(city) 
                ? cityColors[city] 
                : undefined
            }}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CitySelector;