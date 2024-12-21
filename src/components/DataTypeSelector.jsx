import React from 'react';
import { DATA_TYPES } from '../hooks/useClimateData';

export const DataTypeSelector = ({ value, onChange }) => {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-4">Type de données</h3>
      <div className="flex flex-col gap-1">
        {Object.entries(DATA_TYPES).map(([typeId, type]) => (
          <div key={typeId} className="flex items-center">
            <button
              onClick={() => onChange(typeId)}
              className={`text-xs font-medium py-1.5 px-3 rounded text-left transition-all flex-grow
                ${value === typeId
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {type.label}
            </button>
            {type.infoLink && value === typeId && (
              <a 
                href={type.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-500 hover:text-blue-600"
                title="Plus d'informations"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTypeSelector;