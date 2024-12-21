const WindTab = ({ wind }) => (
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

export default WindTab;