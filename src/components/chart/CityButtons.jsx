const CityButtons = ({ cities, selectedCities, onCitySelect }) => (
  <div className="flex flex-wrap gap-2">
    {cities.map(city => (
      <button
        key={city}
        onClick={() => onCitySelect(city)}
        className={`px-3 py-1 rounded-full text-sm ${
          selectedCities.includes(city)
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        {city}
      </button>
    ))}
  </div>
);

export default CityButtons;