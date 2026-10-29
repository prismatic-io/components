import { util } from "@prismatic-io/spectral";

export const cleanStringArray = (values: unknown): string[] =>
  Array.isArray(values) && values.length
    ? values.map((value) => util.types.toString(value))
    : [];

export const cleanSpaceDelimitedString = (
  values: unknown,
): string | undefined => {
  const cleaned = cleanStringArray(values);
  return cleaned.length ? cleaned.join(" ") : undefined;
};

export const cleanOptionalString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

export const cleanModelValue =
  (
    model: readonly { value: string }[],
    label: string,
    options: { allowEmpty?: boolean } = {},
  ) =>
  (value: unknown): string => {
    const strValue = util.types.toString(value);

    if (options.allowEmpty && !strValue) {
      return strValue;
    }

    if (!model.some((entry) => entry.value === strValue)) {
      throw new Error(`Invalid ${label} specified: ${value}`);
    }

    return strValue;
  };
