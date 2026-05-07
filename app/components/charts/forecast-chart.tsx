'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  data: any[];
}

export default function ForecastChart({
  data,
}: Props) {
  console.log('ForecastChart data:', data);
  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            interval={Math.max(0, Math.ceil(data.length / 10) - 1)}
            label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ value: 'Cases', angle: -90, position: 'insideLeft', offset: 10 }}
          />
          <Tooltip />
          <Legend
            layout="vertical"
            verticalAlign="top"
            align="right"
          />

          <Line
            type="monotone"
            dataKey="actual"
            stroke="#000000"
            strokeWidth={3}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="prediction"
            stroke="#dc2626"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}