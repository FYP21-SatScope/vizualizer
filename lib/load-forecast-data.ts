import Papa from 'papaparse';
import { ForecastRow } from '@/types/forecasts';

export async function loadForecastData(
  path: string
): Promise<ForecastRow[]> {
  const response = await fetch(path);
  const csvText = await response.text();

  return new Promise((resolve) => {
    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        resolve(results.data as ForecastRow[]);
      },
    });
  });
}