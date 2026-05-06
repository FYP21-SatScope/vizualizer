'use client';

import SriLankaForecastMap from '../components/maps/dynamic-map';
import { loadForecastData } from '@/lib/load-forecast-data';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ForecastRow } from '@/types/forecasts';

export default function MapClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedDistrict = searchParams.get('district') ?? 'All';

  const [data, setData] = useState<ForecastRow[]>([]);
  const [geoData, setGeoData] = useState<any>(null);

  const handleDistrictClick = (district: string) => {
    router.push(`/dashboard?district=${district}`);
  };

  useEffect(() => {
    loadForecastData('/data/dengue-results-full.csv').then(setData);

    fetch('/maps/sri-lanka-districts.geojson')
      .then((res) => res.json())
      .then(setGeoData);
  }, []);

  const districtMetrics = useMemo(() => {
    const filtered = data.filter(
      (row) =>
        row.horizon === 0 &&
        (selectedDistrict === 'All' || row.district === selectedDistrict)
    );

    const grouped = new Map<string, number[]>();

    filtered.forEach((row) => {
      if (!grouped.has(row.district)) grouped.set(row.district, []);
      grouped.get(row.district)?.push(row.prediction);
    });

    const result: Record<string, number> = {};

    grouped.forEach((values, district) => {
      result[district] =
        values.reduce((a, b) => a + b, 0) / values.length;
    });

    return result;
  }, [data, selectedDistrict]);

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Sri Lanka Forecast Map
      </h1>

      {geoData && (
        <SriLankaForecastMap
          geoData={geoData}
          districtMetrics={districtMetrics}
          onDistrictClick={handleDistrictClick}
        />
      )}
    </div>
  );
}