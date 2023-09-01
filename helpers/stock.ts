import { formatStockTime } from "./time";

import { StockData, StockTimeSeries } from "@/Interface/IStockData";

const formatListOfStockTimes = (stocks: StockData, rangeUnit: string) => {
  const values = stocks.values;

  let formattedTimes: StockTimeSeries[] = [];
  if (rangeUnit === "1day") {
    formattedTimes = values.map((value) => {
      const formattedTime = formatStockTime(value.datetime, rangeUnit);
      if (!formattedTime) return value;
      const time = formattedTime.split("-")[1];
      return {
        ...value,
        datetime: time,
      };
    });
  } else if (rangeUnit === "5days") {
    formattedTimes = values.map((value) => {
      const formattedTime = formatStockTime(value.datetime, rangeUnit);
      if (!formattedTime) return value;
      const [date, time] = formattedTime.split("-");
      return {
        ...value,
        datetime: time.includes("9:30am") ? date : time,
      };
    });
  } else if (rangeUnit.includes("month") || rangeUnit === "year") {
    formattedTimes = values.map((value, index) => {
      const formattedTime = formatStockTime(value.datetime, rangeUnit);
      if (!formattedTime) return value;
      if (index - 1 < 0)
        return { ...value, datetime: formattedTime.split(",")[0] };

      const prevFormattedTime = formatStockTime(
        values[index - 1].datetime,
        rangeUnit
      );
      if (!prevFormattedTime) return value;
      const [date, year] = formattedTime.split(",");
      const prevValueYear = prevFormattedTime.split(",")[1];
      return {
        ...value,
        datetime: year === prevValueYear ? date : year,
      };
    });
  }
  return { ...stocks, values: formattedTimes };
};

const calculatePriceChange = (stock: StockTimeSeries[]) => {
  const firstValue = stock[0].close;
  const lastValue = stock[stock.length - 1].close;
  const change = +lastValue - +firstValue;
  const changePercent = (change / +firstValue) * 100;
  return {
    priceChange: change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2),
    changePercent:
      changePercent > 0
        ? `+${changePercent.toFixed(2)}%`
        : `${changePercent.toFixed(2)}%`,
  };
};

const calculateLivePriceChange = (
  stock: StockTimeSeries,
  livePrice: number
) => {
  const value = +stock.close;
  const change = livePrice - value;
  const changePercent = (change / value) * 100;
  return {
    priceChange: change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2),
    changePercent:
      changePercent > 0
        ? `+${changePercent.toFixed(2)}%`
        : `${changePercent.toFixed(2)}%`,
  };
};

export type RangeUnit =
  | "1day"
  | "5days"
  | "1month"
  | "3months"
  | "6months"
  | "year";
const formatRange = (rangeUnit: RangeUnit) => {
  const rangeOptions = {
    "1day": "Today",
    "5days": "Last 1W",
    "1month": "Last 1M",
    "3months": "Last 3M",
    "6months": "Last 6M",
    year: "YTD",
  };
  return rangeOptions[rangeUnit];
};

export {
  formatListOfStockTimes,
  calculatePriceChange,
  calculateLivePriceChange,
  formatRange,
};
