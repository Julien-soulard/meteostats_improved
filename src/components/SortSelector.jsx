import React from 'react';

export const SORT_OPTIONS = {
  name: { label: 'Par nom', value: 'name' },
  asc: { label: 'Valeurs croissantes', value: 'asc' },
  desc: { label: 'Valeurs décroissantes', value: 'desc' }
};

export const SortSelector = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium text-gray-600">Trier</span>
      <div className="min-w-[160px]">
        <select
          className="w-full border rounded px-2 py-1 bg-white"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {Object.entries(SORT_OPTIONS).map(([key, option]) => (
            <option key={key} value={key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortSelector;