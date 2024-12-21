import { useState } from 'react';
import TabButton from './TabButton';
import TemperatureTab from './TemperatureTab';
import PrecipitationTab from './PrecipitationTab';
import WindTab from './WindTab';
import SunTab from './SunTab';

const CityDetails = ({ cityData }) => {
  const [activeTab, setActiveTab] = useState('temperature');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'temperature':
        return (
          <TemperatureTab 
            records={cityData.temperatureRecords} 
            averages={cityData.annualAverages} 
          />
        );
      case 'precipitation':
        return <PrecipitationTab precipitation={cityData.annualAverages.precipitation} />;
      case 'wind':
        return <WindTab wind={cityData.annualAverages.wind} />;
      case 'sun':
        return <SunTab sun={cityData.annualAverages.sun} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{cityData.name}</h2>
        <p className="text-sm text-gray-500">
          {cityData.stationInfo.altitude}m - {cityData.stationInfo.latitude}, {cityData.stationInfo.longitude}
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        <TabButton
          active={activeTab === 'temperature'}
          onClick={() => setActiveTab('temperature')}
        >
          Température
        </TabButton>
        <TabButton
          active={activeTab === 'precipitation'}
          onClick={() => setActiveTab('precipitation')}
        >
          Précipitations
        </TabButton>
        <TabButton
          active={activeTab === 'wind'}
          onClick={() => setActiveTab('wind')}
        >
          Vent
        </TabButton>
        <TabButton
          active={activeTab === 'sun'}
          onClick={() => setActiveTab('sun')}
        >
          Ensoleillement
        </TabButton>
      </div>

      <div className="bg-gray-50 rounded-lg">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CityDetails;