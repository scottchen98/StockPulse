export async function searchStock(
  symbol: string,
  interval: string,
  startDate: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TWELVEDATA_URL}/time_series?apikey=${process.env.NEXT_PUBLIC_TWELVEDATA_API_KEY}&interval=${interval}&start_date=${startDate}&dp=2&order=ASC&type=stock&symbol=${symbol}&format=JSON`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch stock data for ${symbol}`);
  }
  const data = await response.json();
  return data;
}

export async function getStockQuote({ symbol }: { symbol: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TWELVEDATA_URL}/quote?symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_TWELVEDATA_API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch stock quote for ${symbol}`);
  }
  const data = await response.json();
  return data;
}
