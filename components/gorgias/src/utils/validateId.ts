import { toInt } from "./toInt";

export const validateId = (valueBase: unknown) => {
  const value = toInt(valueBase);

  if (value === undefined) {
    return value;
  }

  if (value < 1) {
    throw new Error(
      `ID must be greater than or equal to 1. Received: ${value}`,
    );
  }

  return value;
};
