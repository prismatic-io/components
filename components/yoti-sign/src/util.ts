import { type DataPayload, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export const cleanArrayListFileInput = (input: unknown): DataPayload[] => {
  if (Array.isArray(input)) {
    return input.map((file) => {
      return util.types.toData(file);
    });
  }
  throw new Error("Input must have at least one file");
};

export const cleanStringArrayInput = (input: unknown): string[] | undefined => {
  if (Array.isArray(input)) {
    return input.map((file) => {
      return util.types.toString(file);
    });
  }
  return undefined;
};

export const cleanStringInput = (input: unknown) => {
  return input ? util.types.toString(input) : undefined;
};

export const cleanBooleanInput = (input: unknown) => {
  return input ? util.types.toBool(input) : undefined;
};

export const cleanNumberInput = (input: unknown) => {
  return input ? util.types.toNumber(input) : undefined;
};

export const cleanCodeInput = (input: unknown) => {
  return input ? util.types.toObject(input) : undefined;
};

export const cleanKeyValueListInput = (value: unknown) =>
  value
    ? util.types.keyValPairListToObject(
        value as Parameters<typeof util.types.keyValPairListToObject>[0],
      )
    : undefined;

export const addPropertyToPayload = (payload: Record<string, unknown>) => {
  const obj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value !== "undefined") {
      obj[key] = value;
    }
  }
  return obj;
};

export const addNotificationsToObject = (
  payload: Record<string, unknown>,
  destination: string | undefined,
  subscriptions: string[] | undefined,
) => {
  if (destination && subscriptions && subscriptions.length > 0) {
    payload.notifications = {
      destination,
      subscriptions,
    };
  }
};

export async function fetchAllRecords<T>(
  client: HttpClient,
  url: string,
  queryParams: Record<string, unknown>,
) {
  let records: T[] = [];
  let hasMore = false;
  let offset = 0;
  const limit = 500;
  do {
    const {
      data,
    }: {
      data: {
        envelopes: T[];
        total: number;
      };
    } = await client.get(url, {
      params: {
        ...queryParams,
        offset,
        limit,
      },
    });
    records = [...records, ...data.envelopes];
    hasMore = data.total > records.length;
    if (hasMore) {
      offset += limit;
    }
  } while (hasMore);

  return {
    data: records,
    total: records.length,
  };
}
