'use client';

import { ForecastRow } from '@/types/forecasts';
import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

interface Props {
  data: ForecastRow[];
}

export default function IntervalChart({
  data,
}: Props) {
  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />
          <YAxis />

          <Tooltip
            formatter={(value: any, name) => {
              return [value, name];
            }}
          />

          <Legend />

          {/* Upper bound */}
          <Area
            type="monotone"
            dataKey="upper"
            stroke="none"
            fill="#4ade80"
            fillOpacity={0.35}
            name="Upper Bound"
          />

          {/* Lower bound cutout */}
          <Area
            type="monotone"
            dataKey="lower"
            stroke="none"
            fill="#ffffff"
            fillOpacity={1}
            name="Lower Bound"
          />

          {/* Prediction line */}
          <Line
            type="monotone"
            dataKey="prediction"
            stroke="#dc2626"
            strokeWidth={2}
            dot={false}
            name="Prediction"
          />

          {/* Actual line */}
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#000000"
            strokeWidth={2}
            dot={false}
            name="Actual"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}