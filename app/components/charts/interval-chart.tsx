import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

export default function IntervalChart({
  data,
}: any) {
  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="upper"
            stackId="1"
            stroke="none"
            fill="#fecaca"
          />

          <Area
            type="monotone"
            dataKey="lower"
            stackId="1"
            stroke="none"
            fill="#ffffff"
          />

          <Line
            type="monotone"
            dataKey="prediction"
            stroke="#dc2626"
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="actual"
            stroke="#000000"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}