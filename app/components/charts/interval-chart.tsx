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

export default function IntervalChart({ data }: Props) {
  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            interval={Math.max(0, Math.ceil(data.length / 10) - 1)}
            label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ value: 'Cases', angle: -90, position: 'insideLeft', offset: 10 }}
          />

          <Tooltip
            formatter={(value: any, name) => {
              return [value, name];
            }}
          />

          <Legend
            layout="vertical"
            verticalAlign="top"
            align="right"
          />

          {/* Upper bound */}
          <Area
            type="monotone"
            dataKey="upper"
            stroke="#6366f1"
            fill="#4ade80"
            fillOpacity={0.35}
            name="Upper Bound"
          />

          {/* Lower bound — white fill to cut out, but green stroke for legend/tooltip */}
          <Area
            type="monotone"
            dataKey="lower"
            stroke="#f59e0b"
            strokeWidth={1}
            fill="#ffffff"
            fillOpacity={1}
            name="Lower Bound"
            color="#4ade80"
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