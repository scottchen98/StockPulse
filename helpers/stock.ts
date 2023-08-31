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

export { formatListOfStockTimes };
