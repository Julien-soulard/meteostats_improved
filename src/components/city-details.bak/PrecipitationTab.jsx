const PrecipitationTab = ({ precipitation }) => (
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

export default PrecipitationTab;