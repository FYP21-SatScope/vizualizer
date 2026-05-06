import { ForecastRow } from "@/types/forecasts";

export function calculateMAE(data: ForecastRow[]) {
  const grouped = new Map<number, ForecastRow[]>();

  data.forEach((row) => {
    if (!grouped.has(row.horizon)) {
      grouped.set(row.horizon, []);
    }

    grouped.get(row.horizon)?.push(row);
  });

  return Array.from(grouped.entries()).map(
    ([horizon, rows]) => {
      const mae =
        rows.reduce(
          (sum, r) =>
            sum +
            Math.abs(r.actual - r.prediction),
          0
        ) / rows.length;

      return {
        horizon,
        mae,
      };
    }
  );
}