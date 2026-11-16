import { type KeyValuePair, util } from "@prismatic-io/spectral";
import { EMPLOYEE_FIELDS } from "../constants";

const validateFields = (
  fieldValues: KeyValuePair<unknown>[],
  fieldList: string[],
): Record<string, unknown> => {
  const values = util.types.keyValPairListToObject(fieldValues);
  const invalid = Object.keys(values).filter((key) => !fieldList.includes(key));
  if (invalid.length > 0) {
    throw new Error(`Invalid fields specified: ${invalid.join(", ")}`);
  }
  return values;
};

export const validateEmployeeFields = (
  fieldValues: KeyValuePair<unknown>[],
): Record<string, unknown> => {
  return validateFields(fieldValues, EMPLOYEE_FIELDS);
};

const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
export const validateDate = (val: unknown): string => {
  const dateString = util.types.toString(val);
  if (dateRegex.test(dateString)) {
    return dateString;
  }
  throw new Error(`Date value "${dateString}" must follow YYYY-MM-DD format.`);
};

export const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str !== "" ? str : undefined;
};

export const toYesNo = (value: unknown): "yes" | "no" =>
  util.types.toBool(value) ? "yes" : "no";

export const toStringList = (values: unknown): string[] =>
  Array.isArray(values)
    ? values.map((value) => util.types.toString(value))
    : [];
