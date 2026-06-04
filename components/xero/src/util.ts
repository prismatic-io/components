import {
  Connection,
  ConnectionError,
  util,
} from "@prismatic-io/spectral/dist/";
import { getTenant } from "./getTenant";
import connections from "./connections";
import { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { type XeroResponse } from "./interfaces/XeroResponse";
import { MAX_PAGE_SIZE } from "./constants";
import type { XeroRecord } from "./types";

const validConnectionKeys = connections.map((connection) => connection.key);

export const validateConnection = (connection: Connection): void => {
  if (!validConnectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection: ${connection?.key}.`,
    );
  }

  if (connection?.token?.access_token === undefined) {
    throw new ConnectionError(
      connection,
      "No token was found in your connection",
    );
  }
};

export const getHeaders = async (
  connection: Connection,
  debug: boolean,
): Promise<Record<string, string>> => {
  validateConnection(connection);
  const tenantId = await getTenant(connection, debug);
  const headers: Record<string, string> = {
    Authorization: `Bearer ${util.types.toString(
      connection?.token?.access_token,
    )}`,
    Accepts: "application/json",
    "Xero-Tenant-Id": tenantId,
  };

  return headers;
};

export const cleanObject = (value: unknown): object | undefined =>
  value ? util.types.toObject(value) : undefined;

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (error) {
      throwCodeInputError(inputLabel);
    }
  }
  return undefined;
};

export const fetchAllData = async <T, K extends string>({
  client,
  path,
  key,
  queryParams,
  headers,
  fetchAll,
}: {
  client: HttpClient;
  path: string;
  key: K;
  queryParams: Record<string, unknown>;
  headers: Record<string, string>;
  fetchAll: boolean;
}) => {
  if (fetchAll) {
    queryParams.page = 1;
    queryParams.pageSize = MAX_PAGE_SIZE;
  }

  const { data } = await client.get<XeroResponse<T, K>>(path, {
    headers,
    params: { ...queryParams },
  });

  if (!fetchAll) return data;

  const allData: T[] = [...data[key]];
  let page = 2;
  let hasMore =
    data.pagination && data.pagination.page < data.pagination.pageCount;

  while (hasMore) {
    const { data } = await client.get<XeroResponse<T, K>>(path, {
      headers,
      params: {
        ...queryParams,
        page,
      },
    });

    allData.push(...data[key]);
    page++;

    hasMore =
      data.pagination && data.pagination.page < data.pagination.pageCount;
  }

  return {
    Id: data.Id,
    Status: data.Status,
    ProviderName: data.ProviderName,
    DateTimeUTC: data.DateTimeUTC,
    [key]: allData,
  } as XeroResponse<T, K>;
};

export const fetchAllRecords = async (
  client: HttpClient,
  endpoint: string,
  responseKey: string,
  paginated: boolean,
  modifiedSince: string,
): Promise<XeroRecord[]> => {
  const headers: Record<string, string> = {};
  if (modifiedSince) {
    headers["If-Modified-Since"] = modifiedSince;
  }

  if (!paginated) {
    const { data } = await client.get(endpoint, { headers });
    return (data?.[responseKey] ?? []) as XeroRecord[];
  }

  const allRecords: XeroRecord[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await client.get(endpoint, {
      headers,
      params: { page },
    });

    const records = (data?.[responseKey] ?? []) as XeroRecord[];
    allRecords.push(...records);

    hasMore =
      data?.pagination != null &&
      data.pagination.page < data.pagination.pageCount;
    page++;
  }

  return allRecords;
};
