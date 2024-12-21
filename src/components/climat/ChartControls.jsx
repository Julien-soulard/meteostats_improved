import React from 'react';

const ChartControls = ({ 
  viewMode,
  setViewMode,
  dataType,
  setDataType,
  showTemperature,
  setShowTemperature,
  sortType,
  toggleSort
}) => {
  const getSortIcon = () => {
    if (sortType === 'none') return '⇅';
    if (sortType === 'desc') return '↓';
    return '↑';
  };

  return (
    <>
      <div className="flex justify-center space-x-4 mb-4">
        {['monthly', 'seasonal', 'annual'].map(mode => (
          <button 
            key={mode}
            className={`px-3 py-1 rounded ${viewMode === mode ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            onClick={() => setViewMode(mode)}
          >
            Vue {mode === 'monthly' ? 'mensuelle' : mode === 'seasonal' ? 'saisonnière' : 'annuelle'}
          </button>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        <button 
          className={`px-3 py-1 rounded ${dataType === 'precipitation' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          onClick={() => setDataType('precipitation')}
        >
          Pluviométrie
        </button>
        <button 
          className={`px-3 py-1 rounded ${dataType === 'sunshine' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          onClick={() => setDataType('sunshine')}
        >
          Ensoleillement
        </button>
        <button 
          className={`px-3 py-1 rounded ${showTemperature ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          onClick={() => setShowTemperature(!showTemperature)}
        >
          {showTemperature ? 'Masquer Température' : 'Afficher Température'}
        </button>
        <button 
          className="px-3 py-1 rounded bg-gray-800 text-white"
          onClick={toggleSort}
        >
          Trier {getSortIcon()}
        </button>
      </div>
    </>
  );
};

export default ChartControls;