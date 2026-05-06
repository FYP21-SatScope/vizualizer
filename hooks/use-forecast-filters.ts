import { ForecastRow } from "@/types/forecasts";
import { useMemo } from "react";


interface FilterOptions {
  district?: string;
  horizons?: number[];
}

export function useForecastFilters(
    data: ForecastRow[],
    filters: FilterOptions
) {
    return useMemo(() => {
        return data.filter((row) => {
            const districtMatch =
                !filters.district ||
                row.district === filters.district;

            const horizonMatch =
                !filters.horizons ||
                filters.horizons.includes(row.horizon);

            return districtMatch && horizonMatch;
        });
    }, [data, filters]);
}