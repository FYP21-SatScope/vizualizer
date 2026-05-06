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
import FilterPanel from '../components/filters/filter-panel';
import { districts } from '../options/district-options.json';
import { horizons } from '../options/horizon-options.json';

export default function DashboardClient() {
  const searchParams = useSearchParams();

  const [data, setData] = useState<ForecastRow[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    searchParams.get('district') ?? 'Colombo'
  );
  const [selectedHorizon, setSelectedHorizon] = useState<number>(4);
  const [startDate, setStartDate] = useState<string>('2014-06-21');
  const [endDate, setEndDate] = useState<string>('2025-05-10');

  useEffect(() => {
    loadForecastData('/data/dengue-results-full.csv').then(setData);
  }, []);

  const dateOptions = useMemo(() => {
    const uniqueDates = Array.from(new Set(data.map((row) => row.date)));
    return uniqueDates.sort((a, b) => {
      const ta = new Date(a).getTime();
      const tb = new Date(b).getTime();
      if (Number.isNaN(ta) || Number.isNaN(tb)) return a.localeCompare(b);
      return ta - tb;
    });
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const districtMatch = selectedDistrict === 'All' || row.district === selectedDistrict;
      const horizonMatch = selectedHorizon === 0 || row.horizon === selectedHorizon;
      const rowTime = new Date(row.date).getTime();
      const startTime = new Date(startDate).getTime();
      const endTime = new Date(endDate).getTime();

      const dateMatch = rowTime >= startTime && rowTime <= endTime;
      return districtMatch && horizonMatch && dateMatch;
    });
  }, [data, selectedDistrict, selectedHorizon, startDate, endDate]);

  const districtFilteredData = useMemo(() => {
    return data.filter((row) => selectedDistrict === 'All' || row.district === selectedDistrict);
  }, [data, selectedDistrict]);

  const maeData = useMemo(() => calculateMAE(districtFilteredData), [districtFilteredData]);
  const coverageData = useMemo(() => calculateCoverage(districtFilteredData), [districtFilteredData]);

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dengue Forecast Dashboard</h1>

      <FilterPanel
        districts={districts}
        horizons={horizons}
        selectedDistrict={selectedDistrict}
        selectedHorizon={selectedHorizon}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setSelectedDistrict={setSelectedDistrict}
        setSelectedHorizon={setSelectedHorizon}
      />

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
        <DashboardCard title="Prediction Intervals">
          <IntervalChart data={filteredData} />
        </DashboardCard>
        <DashboardCard title="Forecast vs Actual">
          <ForecastChart data={filteredData} />
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DashboardCard title="Horizon Error Curve">
          <HorizonErrorChart data={maeData} />
        </DashboardCard>
        <DashboardCard title="Coverage Probability">
          <CoverageChart data={coverageData} />
        </DashboardCard>
      </div>
    </div>
  );
}