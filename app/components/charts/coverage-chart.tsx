import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function CoverageChart({
  data,
}: any) {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="horizon" 
          label={{ value: 'Forecast Horizon', position: 'insideBottom', offset: -5 }}/>
          <YAxis label={{ value: 'Probability', angle: -90, position: 'insideLeft', offset: 10 }}/>
          <Tooltip />

          <Bar
            dataKey="coverage"
            fill="#16a34a"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}