import React from 'react';

export const PeriodSelector = ({ value, onChange }) => {
  const periods = [
    { id: 'monthly', label: 'Mensuel' },
    { id: 'seasonal', label: 'Par saison' },
    { id: 'yearly', label: 'Annuel' }
  ];

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-3">Sélectionnez la période</h3>
      <div className="flex gap-3">
        {periods.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition-all
              ${value === id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeriodSelector;