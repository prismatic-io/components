import { type DataPayload, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type {
  Envelope,
  PollingChangesObject,
  PollingRecordChange,
} from "./interfaces";

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
  const limit = 100;
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

export const toYotiDate = (iso: string): string => iso.slice(0, 10);

export const filterEnvelopesCreatedAfter = (
  envelopes: Envelope[],
  lastPolledAt: string,
): Envelope[] => {
  const lastPolledAtMs = new Date(lastPolledAt).getTime();
  return envelopes.filter((envelope) => {
    const createdMs = envelope.created_at
      ? new Date(envelope.created_at).getTime()
      : Number.NaN;
    return !Number.isNaN(createdMs) && createdMs > lastPolledAtMs;
  });
};

export const resolvePollingRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): PollingRecordChange => ({ changeType: "created", record }),
    ),
  ];
};

export const lookBackDateClean = (value: unknown): string => {
  const raw = util.types.toString(value).trim();
  if (!raw) return "";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    throw new Error("Look-back Date must be in YYYY-MM-DD format.");
  }

  const [year, month, day] = raw.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    throw new Error("Look-back Date is not a valid calendar date.");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsed > today) {
    throw new Error("Look-back Date cannot be a future date.");
  }

  return raw;
};
