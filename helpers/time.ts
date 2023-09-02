import {
  subMonths,
  startOfYear,
  subYears,
  format,
  subBusinessDays,
  isWeekend,
} from "date-fns";

function formatDistanceDay(date: Date): string {
  const oneDay = 1000 * 3600 * 24;
  const distance = Date.now() - date.getTime();
  if (distance < oneDay && distance >= 0) {
    return "Today";
  }
  if (distance < 2 * oneDay && distance > 0) {
    return "Yesterday";
  }
  if (distance > -1 * oneDay && distance < 0) {
    return "Tomorrow";
  }
  const formattedDate = format(date, "LLL dd, yyyy");
  return formattedDate;
}

function getTodayDate() {
  const today = new Date();
  const formattedToday = format(today, "yyyy-MM-dd");
  return formattedToday;
}

function getBusinessDaysAgo(daysAgo: number) {
  const today = new Date();
  const day = subBusinessDays(today, isWeekend(today) ? daysAgo : daysAgo - 1);
  const formattedDay = format(day, "yyyy-MM-dd");
  return formattedDay;
}

function getMonthsAgo(monthsAgo: number) {
  const month = subMonths(new Date(), monthsAgo);
  const formattedMonth = format(month, "yyyy-MM-dd");
  return formattedMonth;
}

function getStartOfYear() {
  const startOfYearDate = startOfYear(new Date());
  const formattedStartOfYear = format(startOfYearDate, "yyyy-MM-dd");
  return formattedStartOfYear;
}

function getYearsAgo(yearsAgo: number) {
  const year = subYears(new Date(), yearsAgo);
  const formattedYear = format(year, "yyyy-MM-dd");
  return formattedYear;
}

function formatStockTime(date: string, rangeUnit: string) {
  if (rangeUnit.includes("day")) {
    const formattedDate = format(new Date(date), "LLL dd-h:mmaaa");
    return formattedDate;
  }
  if (rangeUnit.includes("month") || rangeUnit.includes("year")) {
    const formattedDate = format(new Date(date), "LLL dd, yyyy");
    return formattedDate;
  }
}

export {
  formatDistanceDay,
  getTodayDate,
  getBusinessDaysAgo,
  getMonthsAgo,
  getStartOfYear,
  getYearsAgo,
  formatStockTime,
};
