export interface StockErrorResponse {
  code: number;
  message: string;
  status: string;
  meta: {
    symbol: string;
    interval: string;
    exchange: string;
  };
}
