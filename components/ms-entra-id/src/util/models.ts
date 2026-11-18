export const getOptionalBooleanModel = (): { label: string; value: string }[] =>
  ["True", "False"].map((choice) => ({
    label: choice,
    value: choice.toLowerCase(),
  }));
