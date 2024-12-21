const dataTypes = [
  { id: 'temp', name: 'Température (°C)', color: '#FF0000' },
  { id: 'precip', name: 'Précipitations (mm)', color: '#0000FF' },
  { id: 'sun', name: "Heures d'ensoleillement", color: '#FFD700' }
];

const DataTypeSelect = ({ value, onChange }) => (
  <select 
    value={value} 
    onChange={(e) => onChange(e.target.value)}
    className="px-4 py-2 border rounded-md"
  >
    {dataTypes.map(type => (
      <option key={type.id} value={type.id}>
        {type.name}
      </option>
    ))}
  </select>
);

export { dataTypes };
export default DataTypeSelect;