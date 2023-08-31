const setDisableToIntervalsFromSpecificIndex = (
  options: { value: string; label: string }[],
  startIndexToDisable: number
) => {
  return options.map((option, index) => {
    if (index < startIndexToDisable) return option;
    return { ...option, disabled: true };
  });
};

const disableOneAndFiveMinuteIntervals = (
  options: { value: string; label: string }[]
) => {
  return options.map((option) => {
    if (["1min", "5min"].includes(option.value)) {
      return { ...option, disabled: true };
    }
    return option;
  });
};

export {
  setDisableToIntervalsFromSpecificIndex,
  disableOneAndFiveMinuteIntervals,
};
