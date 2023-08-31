export interface Meta {
  symbol: string;
  interval: string;
  currency: string;
  exchange_timezone: string;
  exchange: string;
  mic_code: string;
  type: string;
}

export interface StockTimeSeries {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface StockData {
  meta: Meta;
  values: StockTimeSeries[];
  status: string;
}
