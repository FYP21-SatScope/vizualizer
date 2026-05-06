'use client';
import HorizonErrorChart from './components/charts/horizon-error-chart';
import ErrorHeatmap from './components/charts/error-heatmap';
import CoverageChart from './components/charts/coverage-chart';

import SriLankaForecastMap from './components/maps/dynamic-map';

import { loadForecastData } from '@/lib/load-forecast-data';
import { calculateMAE } from '@/lib/calculate-mae';
import { calculateCoverage } from '@/lib/calculate-coverage';

import { useEffect, useMemo, useState } from 'react';
import ForecastChart from './components/charts/forecast-chart';
import IntervalChart from './components/charts/interval-chart';
import DashboardCard from './components/ui/dashboard-card';
import { ForecastRow } from '@/types/forecasts';
import FilterPanel from './components/filters/filter-panel';

import { districts } from './options/district-options.json';
import { horizons } from './options/horizon-options.json';

export default function DashboardPage() {
  const [data, setData] = useState<ForecastRow[]>([]);
  const [geoData, setGeoData] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [selectedHorizon, setSelectedHorizon] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>("All");

  useEffect(() => {
    loadForecastData('/data/dengue-results.csv').then(
      setData
    );

    fetch("/maps/sri-lanka-districts.geojson")
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data);
      });

  }, []);

  const dateOptions = useMemo(() => {
    const uniqueDates = Array.from(new Set(data.map((row) => row.date)));
    return uniqueDates.sort((a, b) => {
      const ta = new Date(a).getTime();
      const tb = new Date(b).getTime();
      if (Number.isNaN(ta) || Number.isNaN(tb)) {
        return a.localeCompare(b);
      }
      return ta - tb;
    });
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const districtMatch =
        selectedDistrict === "All" || row.district === selectedDistrict;
      const horizonMatch =
        selectedHorizon === 0 || row.horizon === selectedHorizon;
      const dateMatch = selectedDate === "All" || row.date === selectedDate;

      return districtMatch && horizonMatch && dateMatch;
    });
  }, [data, selectedDistrict, selectedHorizon, selectedDate]);

  const maeData = useMemo(
    () => calculateMAE(filteredData),
    [filteredData]
  );

  const coverageData = useMemo(
    () => calculateCoverage(filteredData),
    [filteredData]
  );

  const districtMetrics = useMemo(() => {
    const grouped = new Map<string, number[]>();

    filteredData.forEach((row) => {
      if (!grouped.has(row.district)) {
        grouped.set(row.district, []);
      }

      grouped.get(row.district)?.push(
        row.prediction
      );
    });

    const result: Record<string, number> = {};

    grouped.forEach((values, district) => {
      result[district] =
        values.reduce((a, b) => a + b, 0) /
        values.length;
    });

    return result;
  }, [filteredData]);

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Dengue Forecast Dashboard
      </h1>

      <FilterPanel
        districts={districts}
        horizons={horizons}
        dateOptions={dateOptions}
        selectedDistrict={selectedDistrict}
        selectedHorizon={selectedHorizon}
        selectedDate={selectedDate}
        setSelectedDistrict={setSelectedDistrict}
        setSelectedHorizon={setSelectedHorizon}
        setSelectedDate={setSelectedDate}
      />

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
        <DashboardCard title="Forecast vs Actual">
          <ForecastChart data={filteredData} />
        </DashboardCard>

        <DashboardCard title="Prediction Intervals">
          <IntervalChart data={filteredData} />
        </DashboardCard>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <DashboardCard title="Horizon Error Curve">
          <HorizonErrorChart data={maeData} />
        </DashboardCard>

        <DashboardCard title="Coverage Probability">
          <CoverageChart data={coverageData} />
        </DashboardCard>

        <DashboardCard title="Forecast Error Heatmap">
          <ErrorHeatmap data={filteredData} />
        </DashboardCard>

        {/* I need to render this only if geoData is available */}
        {geoData && (
          <DashboardCard title="Sri Lanka Forecast Map">
            <SriLankaForecastMap geoData={geoData} districtMetrics={districtMetrics} />
          </DashboardCard>
        )}
      </div>
    </div>
  );
}