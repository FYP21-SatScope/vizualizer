export interface ForecastRow {
  district: string;
  horizon: number;
  date: string;
  actual: number;
  lower: number;
  prediction: number;
  upper: number;
  interval_width: number;
  within_interval: boolean;
}