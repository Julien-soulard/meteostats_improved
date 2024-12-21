import React, { useState, useEffect } from 'react';
import { CitySelector } from './components/CitySelector';
import { PeriodSelector } from './components/PeriodSelector';
import { DataTypeSelector } from './components/DataTypeSelector';
import { SortSelector } from './components/SortSelector';
import { ClimateChart } from './components/ClimateChart';
import './App.css';

const DEFAULT_CITY_COLORS = {
  'Paris': '#FF6B6B',
  'Lyon': '#4ECDC4',
  'Marseille': '#45B7D1',
  'Toulouse': '#96CEB4',
  'Nice': '#FFEEAD',
  'Nantes': '#D4A5A5',
  'Strasbourg': '#9B59B6',
  'Montpellier': '#3498DB',
  'Bordeaux': '#E74C3C',
  'Lille': '#2ECC71',
  'Rennes': '#F1C40F',
  'Caen': '#1ABC9C',
  'Angers': '#E67E22',
  'Rouen': '#95A5A6',
  'Belle-Île': '#34495E',
  'Brest': '#8E44AD'
};

const App = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('yearly');
  const [selectedDataType, setSelectedDataType] = useState('precipitation');
  const [sortOrder, setSortOrder] = useState('name');

  // Initialiser toutes les villes au chargement
  useEffect(() => {
    setSelectedCities(Object.keys(DEFAULT_CITY_COLORS));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="w-full py-3">
        <div className="max-w-7xl mx-auto px-3">
          {/* Section supérieure avec sélecteur de villes et période */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-3">
            <div className="mb-3">
              <CitySelector
                selectedCities={selectedCities}
                onChange={setSelectedCities}
                cityColors={DEFAULT_CITY_COLORS}
              />
            </div>
            
            <div className="border-t pt-3 flex justify-between items-center">
              <PeriodSelector
                value={selectedPeriod}
                onChange={setSelectedPeriod}
              />
              <SortSelector 
                value={sortOrder}
                onChange={setSortOrder}
              />
            </div>
          </div>

          {/* Section inférieure avec le graphique et les contrôles */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex gap-4">
              {/* Sidebar gauche avec le sélecteur de type de données */}
              <div className="w-44">
                <DataTypeSelector 
                  value={selectedDataType}
                  onChange={setSelectedDataType}
                />
              </div>

              {/* Graphique principal */}
              <div className="flex-1">
                <ClimateChart
                  cities={selectedCities}
                  period={selectedPeriod}
                  dataType={selectedDataType}
                  cityColors={DEFAULT_CITY_COLORS}
                  sortOrder={sortOrder}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;