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

export default function IntervalChart({ data }: any) {
  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          {/* Fill from 0 up to upper — gives full red band */}
          <Area
            type="monotone"
            dataKey="upper"
            stroke="none"
            fill="#fecaca"
            legendType="none"
          />

          {/* Fill from 0 up to lower — masks the bottom in white */}
          <Area
            type="monotone"
            dataKey="lower"
            stroke="none"
            fill="#ffffff"
            fillOpacity={1}
            legendType="none"
          />

          <Line type="monotone" dataKey="prediction" stroke="#dc2626" dot={false} />
          <Line type="monotone" dataKey="actual" stroke="#000000" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}