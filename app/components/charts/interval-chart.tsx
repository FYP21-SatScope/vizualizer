import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function IntervalChart({ data }: any) {
  const formattedData = data.map((d: any) => ({
    ...d,
    range: [d.lower, d.upper],
  }));

  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer>
        <AreaChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />

          <Tooltip
            formatter={(value: any, name: string) => {
              if (name === "range") {
                return [`${value[0]} - ${value[1]}`, "Interval"];
              }
              return [value, name];
            }}
          />

          {/* Mid green interval band */}
          <Area
            type="monotone"
            dataKey="range"
            stroke="none"
            fill="#4ade80"   // mid green
            fillOpacity={0.5} // optional: makes it softer
          />

          <Line
            type="monotone"
            dataKey="prediction"
            stroke="#dc2626"
            dot={false}
            name="Prediction"
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#000000"
            dot={false}
            name="Actual"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}