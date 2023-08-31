import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  YAxis,
  XAxis,
} from "recharts";
import { useTheme } from "next-themes";

import { memo } from "react";
import { Badge } from "./ui/badge";
import { StockTimeSeries } from "@/Interface/IStockData";
import { StockQuote } from "@/Interface/IStockQuote";
import { useLiveStockPrice } from "@/hooks/stock/useLiveStockPrice";

type CustomTooltipProps = React.ComponentProps<typeof Tooltip>;

const CustomTooltip = ({
  payload,
  label,
  symbol,
}: CustomTooltipProps & { symbol: string }) => {
  if (!payload?.length) return null;

  const data = payload[0].payload;
  if (!data) return null;

  const { open, high, low, close, volume } = data;
  return (
    <div>
      <h1 className="text-md text-center font-medium">{label}</h1>

      <div className="flex flex-col space-y-2 rounded-lg border border-gray-500 bg-white p-3 dark:border-white dark:bg-black">
        <h2 className="text-xl font-bold text-[#8884d8]">{symbol}</h2>
        <p className="text-sm">
          open: <span className="font-semibold">{open}</span>
        </p>
        <p className="text-sm">
          high: <span className="font-semibold">{high}</span>
        </p>
        <p className="text-sm">
          low: <span className="font-semibold">{low}</span>
        </p>
        <p className="text-sm">
          close: <span className="font-semibold">{close}</span>
        </p>
        <p className="text-sm">
          volume: <span className="font-semibold">{volume}</span>
        </p>
      </div>
    </div>
  );
};

export default memo(function AreaChart({
  stockData,
  stockMeta,
  prevSymbol,
}: {
  stockData: StockTimeSeries[];
  stockMeta: Pick<
    StockQuote,
    "symbol" | "name" | "exchange" | "currency" | "is_market_open"
  >;
  prevSymbol: string;
}) {
  const { resolvedTheme } = useTheme();
  const {
    symbol,
    name,
    exchange,
    currency,
    is_market_open: isMarketOpen,
  } = stockMeta;

  const { price: livePrice } = useLiveStockPrice(
    symbol,
    prevSymbol,
    isMarketOpen
  );

  return (
    <Card className="mx-auto h-fit max-w-5xl shadow-2xl dark:shadow-[0_25px_50px_-12px_rgba(250,250,250,0.25);]">
      <CardHeader className="mx-auto">
        <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-end sm:space-y-0">
          <h1 className="ml-[60px] flex flex-col text-4xl font-extrabold text-[#8884d8] sm:block">
            {symbol}{" "}
            <span className="text-sm font-semibold tracking-wide text-[#374151] dark:text-[#e5e7eb] sm:ml-2">
              {`${name} - ${exchange}`}
            </span>
          </h1>
          <div className="item-start flex flex-col space-y-1 sm:items-end">
            <div className="relative ml-[60px] flex sm:mr-[30px]">
              <div
                className={`absolute inline-flex h-full w-full ${
                  isMarketOpen ? "animate-ping" : ""
                } rounded-full ${
                  isMarketOpen ? "bg-purple-400" : "bg-slate-400"
                } opacity-75`}
              ></div>
              <Badge
                className={`relative inline-flex h-fit w-fit ${
                  isMarketOpen
                    ? "bg-purple-500 hover:bg-purple-500"
                    : "bg-slate-500 hover:bg-slate-500"
                }  text-[10px] leading-3 hover:bg-slate-500 dark:text-[#e5e7eb]`}
              >
                {isMarketOpen ? "Market Open" : "Market Closed"}
              </Badge>
            </div>

            <p className="ml-[60px] text-2xl font-bold text-[#8884d8] sm:ml-0 sm:mr-[30px]">
              {/* if market is closed then show last closing price */}
              {isMarketOpen
                ? livePrice
                : stockData[stockData.length - 1].close}{" "}
              <span className="text-xs">{currency}</span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={370}>
          <RechartsAreaChart
            width={730}
            height={350}
            data={stockData}
            margin={{ top: 10, right: 30, left: 5, bottom: 40 }}
          >
            <defs>
              <linearGradient id={symbol} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              className="text-xs font-semibold"
              dataKey="datetime"
              tick={{
                fill: `${resolvedTheme === "dark" ? "#e5e7eb" : "#374151"}`,
              }}
              tickLine={{
                stroke: `${resolvedTheme === "dark" ? "#e5e7eb" : "#374151"}`,
              }}
              interval="preserveStartEnd"
              dx={-17}
              dy={13}
              angle={-35}
            />
            <YAxis
              domain={["dataMin - 1", "dataMax + 1"]}
              className="text-xs font-semibold"
              tick={{
                fill: `${resolvedTheme === "dark" ? "#e5e7eb" : "#374151"}`,
              }}
              tickLine={{
                stroke: `${resolvedTheme === "dark" ? "#e5e7eb" : "#374151"}`,
              }}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip symbol={symbol} />} />
            <Area
              type="monotone"
              dataKey="close"
              stroke="#8884d8"
              fillOpacity={1}
              fill={`url(#${symbol})`}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});
