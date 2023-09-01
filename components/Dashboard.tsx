import { useCallback, useMemo, useState } from "react";
import InputForm from "./InputForm";
import AreaChart from "./AreaChart";
import Alert from "./Alert";
import Loading from "./Loading";

import { RangeUnit, formatListOfStockTimes } from "@/helpers/stock";
import { useSearchStock } from "@/hooks/stock/useSearchStock";
import { useStockQuote } from "@/hooks/stock/useStockQuote";

import { StockData } from "@/Interface/IStockData";
import { StockQuote } from "@/Interface/IStockQuote";
import { StockErrorResponse } from "@/Interface/IStockError";

export default function Dashboard() {
  const [prevSymbol, setPrevSymbol] = useState<string>("");
  const [stockQueryValues, setStockQueryValues] = useState<
    Record<string, string>
  >({});
  const { symbol, interval, startDateValue, rangeUnit } = stockQueryValues;

  const {
    stockData,
    isLoadingStock,
    error: stockError,
  } = useSearchStock(symbol, interval, startDateValue);

  const {
    stockQuote,
    isLoadingStockQuote,
    error: stockQuoteError,
  } = useStockQuote(symbol);

  const memoStockData = useCallback(formatListOfStockTimes, [
    rangeUnit,
    stockData,
  ]);
  const memoStockMeta = useMemo<
    Pick<
      StockQuote,
      "symbol" | "name" | "exchange" | "currency" | "is_market_open"
    >
  >(() => {
    return {
      symbol: (stockQuote as StockQuote)?.symbol,
      name: (stockQuote as StockQuote)?.name,
      exchange: (stockQuote as StockQuote)?.exchange,
      currency: (stockQuote as StockQuote)?.currency,
      is_market_open: (stockQuote as StockQuote)?.is_market_open,
    };
  }, [stockQuote]);

  return (
    <div className="w-full space-y-5 pb-24">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <InputForm
          handleStockQueryValues={setStockQueryValues}
          handlePrevSymbol={setPrevSymbol}
        />
      </div>
      {!rangeUnit ? (
        <Alert
          variant="default"
          title="Hey There 👋"
          description="Search for a stock to get started 🚀"
        />
      ) : isLoadingStock || isLoadingStockQuote ? (
        <Loading />
      ) : stockData && stockData.status === "error" ? (
        <Alert
          variant="destructive"
          title="Error"
          description={(stockData as StockErrorResponse).message}
        />
      ) : stockQuote &&
        (stockQuote as StockErrorResponse)?.status === "error" ? (
        <Alert
          variant="destructive"
          title="Error"
          description={(stockQuote as StockErrorResponse)?.message}
        />
      ) : (
        <AreaChart
          stockData={memoStockData(stockData as StockData, rangeUnit).values}
          stockMeta={memoStockMeta}
          prevSymbol={prevSymbol}
          rangeUnit={rangeUnit as RangeUnit}
        />
      )}
    </div>
  );
}
