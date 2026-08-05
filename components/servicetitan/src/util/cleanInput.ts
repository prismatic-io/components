import { type KeyValuePair, util } from "@prismatic-io/spectral";
export const cleanCodeInput = (value: unknown) => {
  if (value) {
    return util.types.toObject(value);
  }
  return undefined;
};
export const cleanBooleanInput = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;
export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const cleanKeyValueListInput = (value: unknown) =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair[])
    : undefined;
export const cleanNumberValueListInput = (value: unknown) => {
  if (value) {
    if (Array.isArray(value)) {
      return value.map((val) => util.types.toNumber(val));
    }
  }
  return undefined;
};
export const cleanStringValueListInput = (value: unknown) => {
  if (value) {
    if (Array.isArray(value)) {
      return value.map((val) => util.types.toString(val));
    }
  }
  return undefined;
};
export const mapModelValues = (values: string[], addEmptyValue = false) => {
  if (addEmptyValue) {
    return [
      {
        value: "",
        label: "Empty",
      },
      ...values.map((value) => {
        return {
          value,
          label: value,
        };
      }),
    ];
  }
  return values.map((value) => {
    return {
      value,
      label: value,
    };
  });
};
export const mapBooleanModelInput = mapModelValues(["true", "false"], true);
export const mapStatusModelInput = mapModelValues(
  ["Pending", "Posted", "Exported"],
  true,
);
