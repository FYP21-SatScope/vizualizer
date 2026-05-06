export function calculateCoverage(data: any[]) {
  const grouped = new Map<number, any[]>();

  data.forEach((row) => {
    if (!grouped.has(row.horizon)) {
      grouped.set(row.horizon, []);
    }

    grouped.get(row.horizon)?.push(row);
  });

  return Array.from(grouped.entries()).map(
    ([horizon, rows]) => {
      const coverage =
        rows.filter((r) => r.within_interval)
          .length / rows.length;

      return {
        horizon,
        coverage,
      };
    }
  );
}