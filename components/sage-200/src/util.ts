import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "./connections";
import { LOOK_BACK_DATE_PATTERN, POLL_RESOURCE_CONFIG } from "./constants";
import type {
  PollingState,
  Sage200Changes,
  Sage200Record,
  Sage200RecordChange,
} from "./types";

export const cleanNumberInput = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanCodeInput = (value: unknown) => {
  if (value) {
    return util.types.toObject(value);
  }
  return undefined;
};

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};

export const filterDataChangedAfter = (
  data: { date_time_updated: string }[],
  dataChangedAfter: Date,
) =>
  data.filter((item) => {
    return new Date(item.date_time_updated) > dataChangedAfter;
  });

export const cleanDate = (value: unknown) => {
  if (value) {
    const date = new Date(util.types.toString(value));
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
    throw new Error("Invalid date format at 'Filter Data After Date' input.");
  }
  return undefined;
};

export const cleanOptionalBoolean = (value: unknown) => {
  if (value === "undefined") {
    return undefined;
  }
  return util.types.toBool(value);
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

export const filterByTimestamp = (
  records: Sage200Record[],
  lastPolledAt: string,
  includeNew: boolean,
  includeUpdated: boolean,
): { created: Sage200Record[]; updated: Sage200Record[] } => {
  const lastPolledAtDate = new Date(lastPolledAt);
  const created: Sage200Record[] = [];
  const updated: Sage200Record[] = [];

  for (const record of records) {
    const rawCreated = record.date_time_created;
    const rawUpdated = record.date_time_updated;
    const createdDate =
      typeof rawCreated === "string" ? new Date(rawCreated) : null;
    const updatedDate =
      typeof rawUpdated === "string" ? new Date(rawUpdated) : null;

    const isNew = createdDate !== null && createdDate > lastPolledAtDate;
    const isUpdated =
      !isNew && updatedDate !== null && updatedDate > lastPolledAtDate;

    if (isNew && includeNew) {
      created.push(record);
    } else if (isUpdated && includeUpdated) {
      updated.push(record);
    }
  }

  return { created, updated };
};

export const resolvePollWindow = (
  state: PollingState | undefined,
  params: {
    lookBackDate: string;
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
  },
  now: string,
): { lastPolledAt: string; includeNew: boolean; includeUpdated: boolean } => {
  const stored = state?.lastPolledAt;
  if (stored != null || !params.lookBackDate) {
    return {
      lastPolledAt: stored ?? now,
      includeNew: params.showNewRecords,
      includeUpdated: params.showUpdatedRecords,
    };
  }
  return {
    lastPolledAt: new Date(Date.parse(params.lookBackDate) - 1).toISOString(),
    includeNew: true,
    includeUpdated: true,
  };
};

export const resolveSage200RecordChanges = (
  data: Sage200Changes | undefined,
): Sage200RecordChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): Sage200RecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): Sage200RecordChange => ({ changeType: "updated", record }),
    ),
  ];
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({
    label,
    value,
  }),
);
