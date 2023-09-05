import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Dispatch, SetStateAction, useState } from "react";
import FormSelectItems from "@/components/FormSelectItems";

import {
  getBusinessDaysAgo,
  getMonthsAgo,
  getStartOfYear,
  getTodayDate,
} from "@/helpers/time";
import {
  disableOneAndFiveMinuteIntervals,
  setDisableToIntervalsFromSpecificIndex,
} from "@/helpers/searchField";

const rangeOptions = [
  { value: `${getBusinessDaysAgo(1)} 09:30:00&1day`, label: "1 day" },
  { value: `${getBusinessDaysAgo(5)} 09:30:00&5days`, label: "5 days" },
  { value: `${getMonthsAgo(1)} 09:30:00&1month`, label: "1 month" },
  { value: `${getMonthsAgo(3)} 09:30:00&3months`, label: "3 months" },
  { value: `${getMonthsAgo(6)} 09:30:00&6months`, label: "6 months" },
  { value: `${getStartOfYear()} 09:30:00&year`, label: "Year to date" },
];
const intervalOptions = [
  { value: "1min", label: "1 minute" },
  { value: "5min", label: "5 minutes" },
  { value: "15min", label: "15 minutes" },
  { value: "1h", label: "1 hour" },
  { value: "2h", label: "2 hours" },
  { value: "1day", label: "1 day" },
  { value: "1week", label: "1 week" },
  { value: "1month", label: "1 month" },
];

const formSchema = z.object({
  symbol: z.string().regex(/^[A-Za-z]{1,4}$/, {
    message: "Symbols must be 1-4 characters",
  }),
  interval: z.enum([
    "readonly",
    ...intervalOptions.map((option) => option.value),
  ]),
  range: z.enum(["readonly", ...rangeOptions.map((option) => option.value)]),
});

type FormValues = z.infer<typeof formSchema>;

export default function InputForm({
  handleStockQueryValues,
  handlePrevSymbol,
}: {
  handleStockQueryValues: Dispatch<SetStateAction<Record<string, string>>>;
  handlePrevSymbol: Dispatch<SetStateAction<string>>;
}) {
  const [selectedRange, setSelectedRange] = useState<string>("day");
  const [intervalValue, setIntervalValue] = useState<string>("1min");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
      interval: "1min",
      range: `${rangeOptions[0].value}`,
    },
  });

  function onSubmit(values: FormValues) {
    const { symbol, interval, range: startDate } = values;
    const [startDateValue, rangeUnit] = startDate.split("&");

    handleStockQueryValues(({ symbol: prevSymbol }) => {
      handlePrevSymbol(prevSymbol);
      return { symbol, interval, startDateValue, rangeUnit };
    });
  }

  // Function to handle changes in the range selection
  function handleRangeChange(selectedValue: string) {
    setSelectedRange((prevValue) => {
      // If the user selects a month/year range and the previous range was a day range,
      // set the interval value to 15 minutes (1 and 5 minute intervals are disabled for month and year ranges)
      if (
        prevValue.includes("day") &&
        !selectedValue.includes("day") &&
        ["1min", "5min"].includes(intervalValue)
      ) {
        setIntervalValue("15min");

        // Three else if statements below ensure that the interval value
        // cannot be greater than the range value
      } else if (
        selectedValue.includes("1day") &&
        ["1day", "1week", "1month"].includes(intervalValue)
      ) {
        setIntervalValue("2h");
      } else if (
        selectedValue.includes("5days") &&
        ["1week", "1month"].includes(intervalValue)
      ) {
        setIntervalValue("1day");
      } else if (
        selectedValue.includes("1month") &&
        ["1month"].includes(intervalValue)
      ) {
        setIntervalValue("1week");
      }
      return selectedValue;
    });
  }

  // Define interval options based on the selected range
  const filteredIntervalOptions = selectedRange.includes("5days")
    ? setDisableToIntervalsFromSpecificIndex(intervalOptions, 6)
    : selectedRange.includes("day")
    ? setDisableToIntervalsFromSpecificIndex(intervalOptions, 5)
    : selectedRange.includes("1month")
    ? disableOneAndFiveMinuteIntervals(
        setDisableToIntervalsFromSpecificIndex(intervalOptions, 7)
      )
    : selectedRange.includes("month") || selectedRange.includes("year")
    ? disableOneAndFiveMinuteIntervals(intervalOptions)
    : intervalOptions;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-2 md:mx-auto md:w-fit md:flex-row md:items-end md:space-x-3 md:space-y-0"
      >
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock symbol</FormLabel>
              <FormControl>
                <Input
                  className="w-full md:w-[270px]"
                  type="text"
                  placeholder="e.g. AAPL"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Range</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleRangeChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <FormSelectItems options={rangeOptions} />
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interval</FormLabel>
              <Select
                value={intervalValue}
                onValueChange={(value) => {
                  field.onChange(value);
                  setIntervalValue(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Interval" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <FormSelectItems options={filteredIntervalOptions} />
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full md:w-fit" type="submit">
          Search
        </Button>
      </form>
    </Form>
  );
}
