import { useQuery } from "@tanstack/react-query";

import { getStockQuote } from "@/services/apiStock";
import { StockQuote } from "@/Interface/IStockQuote";
import { StockErrorResponse } from "@/Interface/IStockError";

export function useStockQuote(symbol: string) {
  const {
    data: stockQuote,
    isLoading: isLoadingStockQuote,
    error,
  } = useQuery<StockQuote | StockErrorResponse>({
    queryKey: [`${symbol}-quote`],
    queryFn: () => getStockQuote({ symbol }),
    enabled: !!symbol,
    retry: false,
    staleTime: 60000, // 1 minute
  });
  return { stockQuote, isLoadingStockQuote, error };
}
