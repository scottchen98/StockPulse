import { useQuery } from "@tanstack/react-query";

import { searchStock as searchStockApi } from "@/services/apiStock";

import { StockData } from "@/Interface/IStockData";
import { StockErrorResponse } from "@/Interface/IStockError";

export function useSearchStock(
  symbol: string,
  interval: string,
  startDate: string
) {
  const {
    data: stockData,
    isLoading: isLoadingStock,
    error,
  } = useQuery<StockData | StockErrorResponse>({
    queryKey: [`${symbol}-${interval}-${startDate}`],
    queryFn: () => searchStockApi(symbol, interval, startDate),
    enabled: !!symbol && !!interval && !!startDate,
    retry: false,
    staleTime: 60000, // 1 minute
  });

  return { stockData, isLoadingStock, error };
}
