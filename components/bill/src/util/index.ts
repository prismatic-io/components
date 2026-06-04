import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "../connections";
import type { ApiResponse } from "../interfaces/ApiResponse";
import { ApiUrls } from "../enums/ApiUrls";
import { stringify } from "qs";
import type { getClient } from "../client";
import type { BillFilter, BillRecord } from "../types";
import { PAGE_SIZE, RESOURCE_CONFIG } from "../constants";


export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const toOptionalObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
  }
  return undefined;
};

export const cleanArrayCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    let object: unknown;
    try {
      object = util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
    if (Array.isArray(object)) {
      return object;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
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

export const cleanDate = (value: unknown, inputLabel: string) => {
  if (value) {
    const date = new Date(util.types.toString(value));
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
    throw new Error(`Invalid date for ${inputLabel} input.`);
  }
  return undefined;
};

export const getIdObject = (value: string | undefined) =>
  value
    ? {
        id: value,
      }
    : undefined;

export const cleanBooleanInput = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;

const isErrorResponse = (
  data: ApiResponse["response_data"],
): data is { error_message: string } => {
  return typeof data === "object" && data !== null && "error_message" in data;
};

export const cleanReturnData = (
  data: ApiResponse,
): ApiResponse["response_data"] => {
  const { response_status, response_data } = data;
  if (response_status === 0) {
    return response_data;
  }
  if (isErrorResponse(response_data)) {
    throw new Error(response_data.error_message);
  }
  throw new Error("Unexpected response format");
};

export const getBaseUrl = (connection: Connection): string => {
  const useProductionUrl = util.types.toBool(
    connection.fields.useProductionUrl,
  );
  return useProductionUrl ? ApiUrls.Production : ApiUrls.Sandbox;
};




export function filterByTimestamp(
  records: BillRecord[],
  lastPolledAt: string,
  createdField: keyof BillRecord,
  updatedField: keyof BillRecord,
  showNew: boolean,
  showUpdated: boolean,
): { created: BillRecord[]; updated: BillRecord[] } {
  const lastPolledAtDate = new Date(lastPolledAt);
  const created: BillRecord[] = [];
  const updated: BillRecord[] = [];

  for (const record of records) {
    const createdValue = record[createdField];
    const updatedValue = record[updatedField];
    const createdAtDate =
      typeof createdValue === "string" ? new Date(createdValue) : null;
    const updatedAtDate =
      typeof updatedValue === "string" ? new Date(updatedValue) : null;

    const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
    const isUpdated =
      !isNew && updatedAtDate !== null && updatedAtDate > lastPolledAtDate;

    if (isNew && showNew) created.push(record);
    else if (isUpdated && showUpdated) updated.push(record);
  }

  return { created, updated };
}

export const pollResourceModel = Object.entries(RESOURCE_CONFIG).map(
  ([value, _config]) => ({
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value,
  }),
);

export const fetchAllRecords = async (
  client: Awaited<ReturnType<typeof getClient>>["client"],
  loginData: Awaited<ReturnType<typeof getClient>>["loginData"],
  endpoint: string,
  filters: BillFilter[] = [],
): Promise<BillRecord[]> => {
  const allRecords: BillRecord[] = [];
  let start = 0;
  let hasMore = true;

  while (hasMore) {
    const sendData = {
      start,
      max: PAGE_SIZE,
      filters,
      sort: [],
      nested: false,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(endpoint, stringifiedData);
    const records = cleanReturnData(data) as BillRecord[];

    allRecords.push(...records);
    hasMore = records.length === PAGE_SIZE;
    start += PAGE_SIZE;
  }

  return allRecords;
};
