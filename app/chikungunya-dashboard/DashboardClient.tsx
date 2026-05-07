'use client';

import HorizonErrorChart from '../components/charts/horizon-error-chart';
import CoverageChart from '../components/charts/coverage-chart';
import { loadForecastData } from '@/lib/load-forecast-data';
import { calculateMAE } from '@/lib/calculate-mae';
import { calculateCoverage } from '@/lib/calculate-coverage';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ForecastChart from '../components/charts/forecast-chart';
import IntervalChart from '../components/charts/interval-chart';
import DashboardCard from '../components/ui/dashboard-card';
import { ForecastRow } from '@/types/forecasts';
import FilterPanel from '../components/filters/filter-panel-chikungunya';
import { districts } from '../options/district-options-chikungunya.json';
import { horizons } from '../options/horizon-options-chikungunya.json';

export default function DashboardClient() {
  const searchParams = useSearchParams();

  const [data, setData] = useState<ForecastRow[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    searchParams.get('district') ?? 'Colombo'
  );
  const [selectedHorizon, setSelectedHorizon] = useState<number>(3);

  useEffect(() => {
    loadForecastData('/data/chikungunya_forecasts.csv').then(setData);
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const districtMatch = selectedDistrict === 'All' || row.district === selectedDistrict;
      const horizonMatch = selectedHorizon === 0 || row.horizon === selectedHorizon;

      return districtMatch && horizonMatch;
    });
  }, [data, selectedDistrict, selectedHorizon]);

  const districtFilteredData = useMemo(() => {
    return data.filter((row) => selectedDistrict === 'All' || row.district === selectedDistrict);
  }, [data, selectedDistrict]);

  const maeData = useMemo(() => calculateMAE(districtFilteredData), [districtFilteredData]);
  const coverageData = useMemo(() => calculateCoverage(districtFilteredData), [districtFilteredData]);

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Chikungunya Forecast Dashboard</h1>

      <FilterPanel
        districts={districts}
        horizons={horizons}
        selectedDistrict={selectedDistrict}
        selectedHorizon={selectedHorizon}
        setSelectedDistrict={setSelectedDistrict}
        setSelectedHorizon={setSelectedHorizon}
      />

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
        <DashboardCard title="Forecasted vs Actual Case Counts with Prediction Intervals">
          <IntervalChart data={filteredData} />
        </DashboardCard>
        <DashboardCard title="Forecasted Case Counts vs Actual Case Counts">
          <ForecastChart data={filteredData} />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DashboardCard title="Mean Absolute Error(MAE) Across Forecast Horizons">
          <HorizonErrorChart data={maeData} />
        </DashboardCard>
        <DashboardCard title="Prediction Interval Coverage Across Forecast Horizons">
          <CoverageChart data={coverageData} />
        </DashboardCard>
      </div>
    </div>
  );
}