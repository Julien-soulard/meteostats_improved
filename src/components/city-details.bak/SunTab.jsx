const SunTab = ({ sun }) => (
  <div className="p-4 space-y-4">
    <div className="border rounded-lg p-4">
      <h4 className="font-semibold mb-2">Ensoleillement annuel</h4>
      <p>{sun.insolationHours} heures</p>
    </div>
    <div className="border rounded-lg p-4">
      <h4 className="font-semibold mb-2">Rayonnement global</h4>
      <p>{sun.radiationGlobal} J/cm²</p>
    </div>
  </div>
);

export default SunTab;