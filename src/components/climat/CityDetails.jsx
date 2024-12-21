import React, { useState } from 'react';

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 ${
      active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
    } rounded-lg`}
  >
    {children}
  </button>
);

const TemperatureRecords = ({ records }) => (
  <div className="grid grid-cols-2 gap-4 p-4">
    <div className="bg-red-50 p-4 rounded-lg">
      <h4 className="font-semibold mb-2">Record de chaleur</h4>
      <p className="text-2xl text-red-600">{records.highest.value}°C</p>
      <p className="text-sm text-gray-600">{records.highest.date}</p>
    </div>
    <div className="bg-blue-50 p-4 rounded-lg">
      <h4 className="font-semibold mb-2">Record de froid</h4>
      <p className="text-2xl text-blue-600">{records.lowest.value}°C</p>
      <p className="text-sm text-gray-600">{records.lowest.date}</p>
    </div>
  </div>
);

const AnnualStatistics = ({ averages }) => (
  <div className="space-y-4 p-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="border rounded-lg p-4">
        <h4 className="font-semibold mb-2">Jours de chaleur annuels</h4>
        <ul className="space-y-2">
          <li>≥ 30°C: {averages.daysWithTemp.max30} jours</li>
          <li>≥ 25°C: {averages.daysWithTemp.max25} jours</li>
        </ul>
      </div>
      <div className="border rounded-lg p-4">
        <h4 className="font-semibold mb-2">Jours de gel annuels</h4>
        <ul className="space-y-2">
          <li>≤ 0°C: {averages.daysWithTemp.min0} jours</li>
          <li>≤ -5°C: {averages.daysWithTemp.min5} jours</li>
          <li>≤ -10°C: {averages.daysWithTemp.min10} jours</li>
        </ul>
      </div>
    </div>
  </div>
);

const PrecipitationStats = ({ precipitation }) => (
  <div className="p-4">
    <div className="mb-4">
      <h4 className="font-semibold">Précipitations annuelles</h4>
      <p className="text-2xl">{precipitation.total} mm</p>
    </div>
    <div className="border rounded-lg p-4">
      <h4 className="font-semibold mb-2">Nombre de jours avec précipitations</h4>
      <ul className="space-y-2">
        <li>≥ 1mm: {precipitation.daysWithRain.above1mm} jours</li>
        <li>≥ 5mm: {precipitation.daysWithRain.above5mm} jours</li>
        <li>≥ 10mm: {precipitation.daysWithRain.above10mm} jours</li>
      </ul>
    </div>
  </div>
);

const WindStats = ({ wind }) => (
  <div className="p-4">
    <div className="mb-4">
      <h4 className="font-semibold">Vitesse moyenne du vent</h4>
      <p className="text-2xl">{wind.averageSpeed} m/s</p>
    </div>
    <div className="border rounded-lg p-4">
      <h4 className="font-semibold mb-2">Jours avec rafales</h4>
      <ul className="space-y-2">
        <li>> 58 km/h: {wind.daysWithGusts.above16ms} jours</li>
        <li>> 100 km/h: {wind.daysWithGusts.above28ms} jours</li>
      </ul>
    </div>
  </div>
);

const CityDetails = ({ cityData }) => {
  const [activeTab, setActiveTab] = useState('temperature');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'temperature':
        return (
          <>
            <TemperatureRecords records={cityData.temperatureRecords} />
            <AnnualStatistics averages={cityData.annualAverages} />
          </>
        );
      case 'precipitation':
        return <PrecipitationStats precipitation={cityData.annualAverages.precipitation} />;
      case 'wind':
        return <WindStats wind={cityData.annualAverages.wind} />;
      case 'sun':
        return (
          <div className="p-4 space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Ensoleillement annuel</h4>
              <p>{cityData.annualAverages.sun.insolationHours} heures</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Rayonnement global</h4>
              <p>{cityData.annualAverages.sun.radiationGlobal} J/cm²</p>
            </div>
          </div>
        );
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