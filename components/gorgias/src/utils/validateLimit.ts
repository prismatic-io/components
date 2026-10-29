import { LIMIT_MAX, LIMIT_MIN } from "../constants";
import { toInt } from "./toInt";

export const validateLimit = (
  valueBase: unknown,
  minValue = LIMIT_MIN,
  maxValue = LIMIT_MAX,
) => {
  if (valueBase && !Number.isNaN(valueBase)) {
    const value = toInt(valueBase);

    if (value! < minValue || value! > maxValue) {
      throw new Error(
        `Limit must be between ${minValue} and ${maxValue}. Received: ${value}`,
      );
    }
    return value;
  }

  return undefined;
};
