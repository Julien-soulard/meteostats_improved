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

const TemperatureTab = ({ records, averages }) => (
  <>
    <TemperatureRecords records={records} />
    <AnnualStatistics averages={averages} />
  </>
);

export default TemperatureTab;