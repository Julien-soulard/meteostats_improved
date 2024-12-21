import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ClimateChart = ({ data, selectedCities, cityData }) => (
  <div className="h-96">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {selectedCities.map(city => (
          <Bar
            key={city}
            dataKey={city}
            name={city}
            fill={cityData[city].color.main}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default ClimateChart;