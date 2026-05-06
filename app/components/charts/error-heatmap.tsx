'use client';

import { ForecastRow } from '@/types/forecasts';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

export default function ErrorHeatmap({
  data,
}: { data: ForecastRow[] }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);

    svg.selectAll('*').remove();

    const width = 700;
    const height = 400;

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const horizons = [...new Set(data.map((d: ForecastRow) => d.horizon))];

    const dates = [...new Set(data.map((d: ForecastRow) => d.date))];

    const x = d3
      .scaleBand()
      .domain(dates)
      .range([50, width - 20]);

    const y = d3
      .scaleBand()
      .domain(horizons.map(String))
      .range([20, height - 50]);

    const color = d3
      .scaleSequential(d3.interpolateReds)
      .domain([0, 100]);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: ForecastRow) => x(d.date) || 0)
      .attr('y', (d: ForecastRow) => y(String(d.horizon)) || 0)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr(
        'fill',
        (d: ForecastRow) =>
          color(
            Math.abs(d.actual - d.prediction)
          )
      );
  }, [data]);

  return (
    <svg
      ref={ref}
      className="w-full h-[500px]"
    />
  );
}