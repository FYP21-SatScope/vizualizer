import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function HorizonErrorChart({
  data,
}: any) {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="horizon" 
          label={{ value: 'Forecast Horizon', position: 'insideBottom', offset: -5 }}/>
          <YAxis
            label={{ value: 'MAE', angle: -90, position: 'insideLeft', offset: 10 }}
          />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="mae"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}