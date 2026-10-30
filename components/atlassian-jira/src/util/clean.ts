import { type KeyValuePair, util } from "@prismatic-io/spectral";
import {
  ARRAY_ERROR_MESSAGE,
  EMPTY_ARRAY_ERROR_MESSAGE,
  EMPTY_INPUT_ERROR_MESSAGE,
  LOOK_BACK_DATE_PATTERN,
} from "../constants";
import type { Attachment } from "../types";

export const projectIdsClean = (
  rawValue: unknown,
): { projectId: string; projectName?: string }[] => {
  if (!Array.isArray(rawValue)) {
    return [{ projectId: util.types.toString(rawValue) }];
  }
  if (util.types.isObjectSelection(rawValue)) {
    return rawValue.map(({ object: { label, key } }) => ({
      projectId: key,
      projectName: label,
    }));
  }

  return rawValue.map((val) => ({ projectId: util.types.toString(val) }));
};

export const labelsClean = (rawLabels): string[] | undefined => {
  if (Array.isArray(rawLabels)) {
    const labelsArray = rawLabels.map((label) => util.types.toString(label));
    return labelsArray.length > 0 ? labelsArray : undefined;
  }
  return undefined;
};

export const recordsInputClean = (value: unknown) => {
  const NO_LENGTH = 0;
  const valueAsString = util.types.toString(value);
  const recordsString = valueAsString.trim();

  if (value) {
    if (recordsString.length === NO_LENGTH) {
      throw new Error(EMPTY_INPUT_ERROR_MESSAGE);
    }
    const records: Record<string, string>[] = JSON.parse(recordsString);

    if (!Array.isArray(records)) {
      throw new Error(ARRAY_ERROR_MESSAGE);
    }

    if (records.length === NO_LENGTH) {
      throw new Error(EMPTY_ARRAY_ERROR_MESSAGE);
    }

    return records;
  }

  return undefined;
};

export const dynamicFieldsClean = (value: unknown): KeyValuePair[] => {
  if (value) {
    const data = recordsInputClean(value);
    data.forEach((pair) => {
      if (!("key" in pair) || !("value" in pair)) {
        throw new TypeError(
          "Each item in dynamicValues should be a key-value pair",
        );
      }
    });

    return value as KeyValuePair[];
  }

  return undefined;
};

export const fieldValuesClean = (value: unknown) =>
  util.types.keyValPairListToObject(
    util.types.toObject(dynamicFieldsClean(value)) as KeyValuePair[],
  );

export const cleanCodeInput = (value: unknown) => {
  if (value) {
    const object = util.types.toObject(value);
    if (Array.isArray(object)) {
      return object as Attachment[];
    }
    throw new Error("The input must be an array of strings");
  }
  return undefined;
};

export const cleanAttachmentArray = (value: unknown) => {
  const attachmentArray = cleanCodeInput(value);
  attachmentArray?.forEach((attachment) => {
    if (!attachment.id || !attachment.mimeType) {
      throw new Error(
        "Each attachment object must have an 'id' and a 'mimeType' property",
      );
    }
  });
  return attachmentArray;
};

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const toTrimmedLowerCase = (value: unknown): string =>
  util.types.toString(value).toLowerCase().trim();

export const toAllowedValue = (
  value: unknown,
  allowed: string[],
  label: string,
): string => {
  const str = util.types.toString(value);
  if (!allowed.includes(str)) {
    throw new Error(`Invalid ${label} provided: ${str}`);
  }
  return str;
};

export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const toOptionalBool = (value: unknown): true | undefined =>
  util.types.toBool(value) ? true : undefined;

export const toPageSize = (value: unknown, fallback: number): number => {
  const size = util.types.toInt(value, fallback);
  return size > 0 ? size : fallback;
};

export const lookBackDateClean = (value: unknown): string => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "";
  }

  const raw = typeof value === "string" ? value.trim() : String(value);
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }

  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }

  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }

  return parsed.toISOString();
};
