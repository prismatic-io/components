import {
  type Connection,
  type KeyValuePair,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { pdqConnection } from "./connections";
import { API_URL, INVALID_CONNECTION } from "./constants";

export const cleanBoolean = (value: unknown) =>
  value ? util.types.toBool(value) : undefined;

export const cleanString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const cleanCode = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const cleanNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;

export const cleanKeyValueList = (value: unknown) =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair[])
    : undefined;

export const validateConnection = (connection: Connection) => {
  if (![pdqConnection.key].includes(connection.key)) {
    throw new Error(INVALID_CONNECTION);
  }
};

export const fetchAllData = async (
  client: HttpClient,
  path: string,
  params: Record<string, unknown>,
  fetchAll = false,
) => {
  if (!fetchAll) {
    return await fetchData(client, path, params);
  }
  const records: Record<string, unknown>[] = [];
  const keepFetching = true;
  let page = 1;
  let lastResponse: Record<string, unknown> = {};
  do {
    const response = await fetchData(client, path, {
      ...params,
      pageSize: 100,
      page,
    });
    const { data, ...rest } = response;
    lastResponse = rest;
    if (!data || data.length === 0) {
      break;
    }
    records.push(...data);
    page++;
  } while (keepFetching);
  return { data: records, ...lastResponse };
};

export const fetchData = async (
  client: HttpClient,
  path: string,
  params: Record<string, unknown>,
) => {
  const { data } = await client.get(path, { params });
  return data;
};

export const getBaseUrl = (version = "v1") => `${API_URL}/${version}/api`;

export const getAuthHeaders = (connection: Connection) => ({
  Authorization: `Bearer ${connection.fields.apiKey}`,
});

export const TComparator = <T extends { id: string }>(a: T, b: T) =>
  a.id < b.id ? -1 : 1;
