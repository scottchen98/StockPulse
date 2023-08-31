interface TradeEvent {
  c: string[]; // Trade condition codes
  p: number; // Price of the trade
  s: string; // Stock symbol
  t: number; // Timestamp of the trade (in milliseconds since epoch)
  v: number; // Volume of shares traded
}
export interface TradeData {
  type: string; // Type of data (e.g., "trade")
  data: TradeEvent[]; // Array of trade event objects
}
