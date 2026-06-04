import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "./connections";
import { POLL_RESOURCE_CONFIG } from "./constants";
import type { Sage200Record } from "./types";

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
    throw new ConnectionError(connection, `Unsupported connection ${connection.key}.`);
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
    const createdDate = typeof rawCreated === "string" ? new Date(rawCreated) : null;
    const updatedDate = typeof rawUpdated === "string" ? new Date(rawUpdated) : null;

    
    
    const isNew = createdDate !== null && createdDate > lastPolledAtDate;
    const isUpdated = !isNew && updatedDate !== null && updatedDate > lastPolledAtDate;

    if (isNew && includeNew) {
      created.push(record);
    } else if (isUpdated && includeUpdated) {
      updated.push(record);
    }
  }

  return { created, updated };
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({
    label,
    value,
  }),
);
