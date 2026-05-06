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
          <XAxis dataKey="horizon" />
          <YAxis />
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