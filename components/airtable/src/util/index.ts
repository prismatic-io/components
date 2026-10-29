import {
  type Connection,
  type KeyValuePair,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { AirtableChangesObject, AirtableRecordChange } from "../types";

export const getBaseId = (airtableConnection: Connection, baseId: string) => {
  if (!airtableConnection && !baseId) {
    throw new Error("You must specify a base ID");
  }
  return baseId || airtableConnection.fields.base;
};

export const cleanDynamicValues = (
  values: unknown,
): Record<string, unknown> => {
  if (values) {
    const parsedJson = util.types.toObject(values) as KeyValuePair<unknown>[];
    if (!Array.isArray(parsedJson)) {
      throw new Error("Dynamic Fields should be an array");
    }

    for (const pair of parsedJson) {
      if (!("key" in pair) || !("value" in pair))
        throw new Error(
          "Each item in Dynamic Fields should be a key-value pair",
        );
    }

    return util.types.keyValPairListToObject(parsedJson);
  }
  return {};
};

export const paginateData = async <T>(
  client: HttpClient,
  url: string,
  recordArrayName: string,
  params: Record<string, unknown>,
  fetchAll: boolean,
) => {
  const records: T[] = [];
  let offset = "";

  do {
    const { data } = await client.get<{
      offset: string;
      [recordArrayName]: T[];
    }>(url, {
      params: {
        ...params,
        offset,
      },
    });
    records.push(...(data[recordArrayName] as T[]));
    offset = data.offset;
  } while (offset && fetchAll);

  return records;
};

export const needsRefresh = (expirationTime: string): boolean => {
  const expiration = new Date(expirationTime);
  const now = new Date();
  const daysUntilExpiration =
    (expiration.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  return daysUntilExpiration < 7;
};

export const toStringList = (value: unknown) => {
  if (value && Array.isArray(value)) {
    return value as string[];
  }
  return [];
};

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export function getBase64FromUrl(url: string): string {
  const lastPathSegmentMatch = url.match(/\/([^/]+)$/);
  return lastPathSegmentMatch ? lastPathSegmentMatch[1] : "";
}

export const resolvePollingRecordChanges = (
  data: AirtableChangesObject | undefined,
): AirtableRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): AirtableRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): AirtableRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};

const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

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
